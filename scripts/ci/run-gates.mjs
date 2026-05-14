#!/usr/bin/env node

const BASE_URL = (process.env.BASE_URL ?? "https://vyrion.earth").replace(/\/$/, "");
const ORIGIN = new URL(BASE_URL).origin;

const ROUTES = [
  "/",
  "/conscience",
  "/nexan",
  "/atlas",
  "/shield",
  "/record/",
  "/about",
  "/root",
  "/archive/",
  "/conscience-data.html"
];

const COHERENCE_ROUTES = ["/", "/conscience", "/conscience-data.html"];
const ALLOWED_STATUSES = new Set([200, 301, 302, 307, 308]);
const failures = [];

const log = (msg) => console.log(msg);
const fail = (msg) => {
  failures.push(msg);
  console.error(`❌ ${msg}`);
};

const section = (name) => {
  console.log(`\n=== ${name} ===`);
};

const abs = (pathOrUrl) => new URL(pathOrUrl, `${BASE_URL}/`).toString();

async function request(url, method = "GET", redirect = "manual") {
  return fetch(url, {
    method,
    redirect,
    headers: { "user-agent": "vyrion-ci-gates/1.0" }
  });
}

async function getHtml(route) {
  const url = abs(route);
  const res = await request(url, "GET", "follow");
  if (!res.ok) throw new Error(`${route} returned ${res.status}`);
  return await res.text();
}

function extractHrefs(html) {
  const out = [];
  const re = /href\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
}

function toInternalUrl(href, pageUrl) {
  if (!href) return null;
  if (/^(mailto:|tel:|javascript:)/i.test(href)) return null;
  if (href.startsWith("#")) return null;
  if (href.includes("/cdn-cgi/l/email-protection")) return null;

  let u;
  try {
    u = new URL(href, pageUrl);
  } catch {
    return null;
  }
  if (u.origin !== ORIGIN) return null;
  u.hash = "";
  return u.toString();
}

function canonicalFromHtml(html) {
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  return m?.[1] ?? null;
}

function normalizePathForCompare(path) {
  if (path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

async function checkLinks() {
  section("Link Checker");
  const discovered = new Set();

  for (const route of ROUTES) {
    const pageUrl = abs(route);
    discovered.add(pageUrl);

    const html = await getHtml(route);
    for (const href of extractHrefs(html)) {
      const u = toInternalUrl(href, pageUrl);
      if (u) discovered.add(u);
    }
  }

  for (const url of discovered) {
    let res = await request(url, "HEAD", "manual");
    if (res.status === 405) res = await request(url, "GET", "manual");

    if (!ALLOWED_STATUSES.has(res.status)) {
      fail(`Broken internal link: ${url} -> ${res.status}`);
    }
  }

  log(`Checked ${discovered.size} internal links`);
}

async function checkCanonicals() {
  section("Canonical Checker");

  for (const route of ROUTES.filter((r) => r !== "/conscience-data.html")) {
    const html = await getHtml(route);
    const canonical = canonicalFromHtml(html);
    const routeUrl = abs(route);

    if (!canonical) {
      fail(`${route} missing canonical tag`);
      continue;
    }

    if (!canonical.startsWith(BASE_URL)) {
      fail(`${route} canonical is off-domain: ${canonical}`);
      continue;
    }

    if (canonical.includes(".html")) {
      fail(`${route} canonical uses .html alias: ${canonical}`);
    }

    const expectedPath = normalizePathForCompare(new URL(routeUrl).pathname);
    const actualPath = normalizePathForCompare(new URL(canonical).pathname);
    if (expectedPath !== actualPath) {
      fail(`${route} canonical mismatch (expected ${expectedPath}, got ${actualPath})`);
    }

    // Optional anti-duplication gate: clean route should be canonical endpoint.
    if (!route.endsWith("/") && !route.endsWith(".html")) {
      const alias = `${BASE_URL}${route}.html`;
      const aliasHead = await request(alias, "HEAD", "manual");
      if (aliasHead.status === 200) {
        fail(`${route} has duplicate .html alias serving 200 (${alias})`);
      }
    }
  }
}

async function checkDataCoherence() {
  section("Data Coherence Checker");

  const dataRes = await request(abs("/conscience-data.json"), "GET", "follow");
  if (!dataRes.ok) {
    fail(`/conscience-data.json unavailable: ${dataRes.status}`);
    return;
  }

  const data = await dataRes.json();

  const topRequired = ["meta", "vyrion_index", "companies"];
  for (const k of topRequired) {
    if (!(k in data)) fail(`conscience-data.json missing top-level key: ${k}`);
  }

  if (typeof data?.vyrion_index?.score !== "number") {
    fail(`vyrion_index.score must be numeric`);
  }

  if (
    data?.vyrion_index?.dayNumber !== undefined &&
    !(Number.isInteger(data.vyrion_index.dayNumber) && data.vyrion_index.dayNumber > 0)
  ) {
    fail(`vyrion_index.dayNumber must be a positive integer when present`);
  }

  const companyCount = Object.keys(data?.companies ?? {}).length;
  if (companyCount !== 11) {
    fail(`companies count expected 11, got ${companyCount}`);
  }

  for (const route of COHERENCE_ROUTES) {
    const html = await getHtml(route);

    if (!/conscience-data\.json/i.test(html)) {
      fail(`${route} does not reference conscience-data.json`);
    }

    if (/dablerfrost\.github\.io\/Vyrion\/conscience-data\.json/i.test(html)) {
      fail(`${route} uses old github.io JSON source instead of ${BASE_URL}/conscience-data.json`);
    }
  }
}

async function checkHeaders() {
  section("Header Checker");

  const mustHave = [
    "strict-transport-security",
    "content-security-policy",
    "x-content-type-options"
  ];

  for (const route of ["/", "/conscience", "/nexan", "/atlas", "/shield", "/record/"]) {
    const res = await request(abs(route), "HEAD", "follow");
    const h = res.headers;

    for (const name of mustHave) {
      if (!h.get(name)) fail(`${route} missing header: ${name}`);
    }

    const xcto = h.get("x-content-type-options");
    if (xcto && xcto.toLowerCase() !== "nosniff") {
      fail(`${route} x-content-type-options should be 'nosniff', got '${xcto}'`);
    }

    const csp = h.get("content-security-policy") ?? "";
    const xfo = h.get("x-frame-options") ?? "";
    if (!csp.includes("frame-ancestors") && !xfo) {
      fail(`${route} should set either frame-ancestors (CSP) or X-Frame-Options`);
    }
  }
}

(async function main() {
  try {
    await checkLinks();
    await checkCanonicals();
    await checkDataCoherence();
    await checkHeaders();

    if (failures.length) {
      console.error(`\n❌ CI gates failed (${failures.length} issues)`);
      process.exit(1);
    }

    console.log("\n✅ All CI gates passed");
  } catch (err) {
    console.error(`\n❌ CI gates crashed: ${err.message}`);
    process.exit(1);
  }
})();
