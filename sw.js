/* VYRION service worker — app-shell caching with honest live data.
   Strategy: network-first for same-origin requests so updates always land.
   External APIs are never cached — live data stays live or shows offline. */
const CACHE = 'vyrion-v1';
const CORE = ['/', '/index.html', '/manifest.webmanifest'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function offlinePage() {
  return new Response(
    '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>VYRION — Offline</title><style>body{background:#020912;color:#cfe9f5;font-family:system-ui,sans-serif;' +
    'display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;text-align:center;padding:2rem}' +
    'h1{color:#00d4ff;letter-spacing:.2em;font-size:1.2rem}p{opacity:.75;line-height:1.7}</style></head><body><div>' +
    '<h1>VYRION</h1><p>You are offline.<br>VYRION needs a connection for live planetary data.<br>Reconnect to resume.</p>' +
    '</div></body></html>',
    { headers: { 'Content-Type': 'text/html' } }
  );
}

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // External origins (NASA, NOAA, USGS, CDNs): network only, never cached.
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() =>
        caches.match(e.request).then(
          (hit) => hit || (e.request.mode === 'navigate' ? offlinePage() : new Response('', { status: 503 }))
        )
      )
  );
});
