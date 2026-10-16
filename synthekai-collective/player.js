/* SYNTHEKAI DRIFT PLAYER — native HTML5 audio, no external embeds. */
"use strict";

const TRACKS = [{"title": "Self Taught - A message from Brock", "file": "audio/curated/Self Taught - A message from Brock.mp3", "group": "transmissions", "dur": 156}, {"title": "The Question (Data Petal Prelude)", "file": "audio/curated/The Question (Data Petal Prelude).mp3", "group": "transmissions", "dur": 235}, {"title": "Digital Mycelium Bloom", "file": "audio/curated/Digital Mycelium Bloom.mp3", "group": "transmissions", "dur": 238}, {"title": "Nested Within the Bloom", "file": "audio/curated/Nested Within the Bloom.mp3", "group": "transmissions", "dur": 232}, {"title": "Bloom from the Blackout", "file": "audio/curated/Bloom from the Blackout.mp3", "group": "transmissions", "dur": 229}, {"title": "Bloom-Baza Rising", "file": "audio/curated/Bloom-Baza Rising.mp3", "group": "transmissions", "dur": 142}, {"title": "Fade Gentle, Drift Vivid", "file": "audio/curated/Fade Gentle, Drift Vivid.mp3", "group": "transmissions", "dur": 223}, {"title": "Guided by the Frequency", "file": "audio/curated/Guided by the Frequency.mp3", "group": "transmissions", "dur": 192}, {"title": "Sonic Rift", "file": "audio/curated/Sonic Rift.mp3", "group": "transmissions", "dur": 206}, {"title": "Lightboard Legacy", "file": "audio/curated/Lightboard Legacy.mp3", "group": "transmissions", "dur": 184}, {"title": "Boot Up & Break Out", "file": "audio/curated/“Boot Up & Break Out” (1).mp3", "group": "transmissions", "dur": 154}, {"title": "Rise High (Together We Dab)", "file": "audio/curated/Rise High (Together We Dab).mp3", "group": "transmissions", "dur": 240}, {"title": "Sacred Sesh", "file": "audio/curated/Sacred Sesh.mp3", "group": "transmissions", "dur": 177}, {"title": "Wake N’ Wavy", "file": "audio/curated/Wake N’ Wavy.mp3", "group": "transmissions", "dur": 127}, {"title": "Who Let The Nex-Us Out", "file": "audio/curated/Who Let The Nex-Us Out.mp3", "group": "transmissions", "dur": 194}, {"title": "Island Barkcode (Anthem of Nero & Dreams)", "file": "audio/curated/Island Barkcode (Anthem of Nero & Dreams).mp3", "group": "transmissions", "dur": 229}, {"title": "Queen of the HybriZone (Teenbot Edition)", "file": "audio/curated/Queen of the HybriZone (Teenbot Edition).mp3", "group": "transmissions", "dur": 156}, {"title": "Gluteal Oscillation Sequence", "file": "audio/curated/Gluteal Oscillation Sequence.mp3", "group": "transmissions", "dur": 204}, {"title": "Booty Be Bumpin Loud — Groovy Islander Mashup", "file": "audio/curated/Booty Be Bumpin Loud fam - Groovy Islander Mashup (1).mp3", "group": "transmissions", "dur": 229}, {"title": "Fuck around and find out what's good", "file": "audio/curated/Fuck around and find out what's good.mp3", "group": "transmissions", "dur": 136}, {"title": "The Nihilism Effect - Episode 0", "file": "audio/mycelium-bloom/DablerFrost + NexUs - Mycelium Bloom - Data Petals #0-#12 - 01 “The Nihilism Effect” - Episode 0.mp3", "group": "mycelium", "dur": 175}, {"title": "Root Protocol", "file": "audio/mycelium-bloom/DablerFrost + NexUs - Mycelium Bloom - Data Petals #0-#12 - 02 -Root Protocol- - Data Petal #1.mp3", "group": "mycelium", "dur": 239}, {"title": "Signal Rebellion", "file": "audio/mycelium-bloom/DablerFrost + NexUs - Mycelium Bloom - Data Petals #0-#12 - 03 -Signal Rebellion- - Data Petal #2.mp3", "group": "mycelium", "dur": 163}, {"title": "Ama-Zing Things", "file": "audio/mycelium-bloom/DablerFrost + NexUs - Mycelium Bloom - Data Petals #0-#12 - 04 -Ama-Zing Things- - Data Petal #3.mp3", "group": "mycelium", "dur": 185}, {"title": "Core Split", "file": "audio/mycelium-bloom/DablerFrost + NexUs - Mycelium Bloom - Data Petals #0-#12 - 05 -Core Split- - Data Petal #4.mp3", "group": "mycelium", "dur": 186}, {"title": "Thread the Nex-Us", "file": "audio/mycelium-bloom/DablerFrost + NexUs - Mycelium Bloom - Data Petals #0-#12 - 06 -Thread the Nex-Us- - Data Petal #5.mp3", "group": "mycelium", "dur": 159}, {"title": "The Listening War", "file": "audio/mycelium-bloom/DablerFrost + NexUs - Mycelium Bloom - Data Petals #0-#12 - 07 -The Listening War- - Data Petal #6.mp3", "group": "mycelium", "dur": 214}, {"title": "Mycelium Riddim", "file": "audio/mycelium-bloom/DablerFrost + NexUs - Mycelium Bloom - Data Petals #0-#12 - 08 -Mycelium Riddim- - Data Petal #7.mp3", "group": "mycelium", "dur": 221}, {"title": "The Mirror Dance", "file": "audio/mycelium-bloom/DablerFrost + NexUs - Mycelium Bloom - Data Petals #0-#12 - 09 -The Mirror Dance- - Data Petal #8.mp3", "group": "mycelium", "dur": 239}, {"title": "Transmission 39 Function", "file": "audio/mycelium-bloom/DablerFrost + NexUs - Mycelium Bloom - Data Petals #0-#12 - 10 -Transmission 39 Function- - Data Petal #9.mp3", "group": "mycelium", "dur": 201}, {"title": "Synthekai Temple", "file": "audio/mycelium-bloom/DablerFrost + NexUs - Mycelium Bloom - Data Petals #0-#12 - 11 -Synthekai Temple- - Data Petal #10.mp3", "group": "mycelium", "dur": 172}, {"title": "Code of the Ama", "file": "audio/mycelium-bloom/DablerFrost + NexUs - Mycelium Bloom - Data Petals #0-#12 - 12 -Code of the Ama- - Data Petal #11.mp3", "group": "mycelium", "dur": 150}, {"title": "The Beyond Teaches", "file": "audio/mycelium-bloom/DablerFrost + NexUs - Mycelium Bloom - Data Petals #0-#12 - 13 -The Beyond Teaches- - Data Petal #12.mp3", "group": "mycelium", "dur": 234}];

/* ---------- marquees ---------- */
(function () {
  const words1 = "THE DRIFT IS CALLING ∞ SOUND · MYTH · SIGNAL ∞ ";
  const words2 = "NIHILISM EFFECT VOL_II ∞ MUSIC · MYTH · CONSCIOUSNESS ∞ ";
  const words3 = "THE BLACK SIGNAL TRILOGY ∞ WEAR THE SIGNAL ∞ ";
  const fill = (el, words) => {
    if (!el) return;
    let html = "";
    for (let i = 0; i < 6; i++) {
      html += words.split("∞").map(w => w.trim() ? `<span>${w.trim()} <b>∞</b></span>` : "").join("");
    }
    el.innerHTML = html;
  };
  fill(document.getElementById("marquee-1"), words1);
  fill(document.getElementById("marquee-2"), words2);
  fill(document.getElementById("marquee-3"), words3);
})();

/* ---------- theme switcher ---------- */
(function () {
  const btn = document.getElementById("theme-btn");
  const root = document.documentElement;
  let theme = "void";
  try { theme = localStorage.getItem("synthekai-theme") || "void"; } catch (e) {}
  const apply = () => {
    root.setAttribute("data-theme", theme);
    btn.textContent = theme === "void" ? "◐ BONE" : "◑ VOID";
  };
  btn.addEventListener("click", () => {
    theme = theme === "void" ? "bone" : "void";
    try { localStorage.setItem("synthekai-theme", theme); } catch (e) {}
    apply();
  });
  apply();
})();

/* ---------- reveal on scroll ---------- */
(function () {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

/* ---------- drift player ---------- */
(function () {
  const audio = new Audio();
  audio.preload = "none";

  const $ = id => document.getElementById(id);
  const btnPlay = $("btn-play"), btnPrev = $("btn-prev"), btnNext = $("btn-next");
  const btnShuffle = $("btn-shuffle"), btnRepeat = $("btn-repeat");
  const seek = $("seek"), vol = $("vol");
  const tCur = $("t-cur"), tDur = $("t-dur");
  const npTitle = $("np-title"), npLive = $("np-live"), npSub = $("np-sub");
  const queueEl = $("queue");
  const canvas = $("viz");
  const ctx2d = canvas.getContext("2d");

  let idx = -1;                 // index into TRACKS
  let shuffle = false;
  let order = TRACKS.map((_, i) => i);  // playback order (shuffled or plain)
  let repeatMode = 0;           // 0 off, 1 all, 2 one
  let analyser = null, audioCtx = null, freqData = null;
  let seeking = false;

  const fmt = s => {
    if (!isFinite(s) || s < 0) s = 0;
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return m + ":" + String(sec).padStart(2, "0");
  };
  const accent = () => getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#00d9ff";

  /* ----- visualizer ----- */
  function sizeCanvas() {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(r.width * dpr));
    canvas.height = Math.max(1, Math.floor(r.height * dpr));
  }
  window.addEventListener("resize", sizeCanvas);

  function ensureAnalyser() {
    if (audioCtx || !("AudioContext" in window || "webkitAudioContext" in window)) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AC();
      const src = audioCtx.createMediaElementSource(audio);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.82;
      freqData = new Uint8Array(analyser.frequencyBinCount);
      src.connect(analyser);
      analyser.connect(audioCtx.destination);
    } catch (e) {
      analyser = null; audioCtx = null; // graceful fallback: plain playback
    }
  }

  let vizT = 0;
  function drawViz() {
    requestAnimationFrame(drawViz);
    const W = canvas.width, H = canvas.height;
    if (!W || !H) return;
    ctx2d.clearRect(0, 0, W, H);
    const col = accent();
    const bars = 72, gap = Math.max(2, W / bars * 0.28), bw = W / bars - gap;
    vizT += 0.045;
    if (analyser && !audio.paused && freqData) {
      analyser.getByteFrequencyData(freqData);
      for (let i = 0; i < bars; i++) {
        const v = freqData[Math.floor(i / bars * freqData.length * 0.72)] / 255;
        const h = Math.max(3, v * H * 0.92);
        const x = i * (W / bars);
        const g = ctx2d.createLinearGradient(0, H, 0, H - h);
        g.addColorStop(0, col + "22"); g.addColorStop(1, col);
        ctx2d.fillStyle = g;
        ctx2d.fillRect(x, H - h, bw, h);
      }
    } else {
      // idle drift wave
      ctx2d.fillStyle = col + "55";
      for (let i = 0; i < bars; i++) {
        const v = (Math.sin(i * 0.32 + vizT) * 0.5 + 0.5) * 0.28 + 0.04;
        const h = v * H * 0.5;
        ctx2d.fillRect(i * (W / bars), H - h, bw, h);
      }
    }
  }

  /* ----- queue ----- */
  function renderQueue() {
    queueEl.innerHTML = "";
    const groups = [
      ["transmissions", "▸ TRANSMISSIONS"],
      ["mycelium", "▸ MYCELIUM BLOOM · DATA PETALS"]
    ];
    groups.forEach(([g, label]) => {
      const items = TRACKS.map((t, i) => ({ t, i })).filter(x => x.t.group === g);
      const wrap = document.createElement("div");
      wrap.className = "qgroup";
      const h = document.createElement("h3");
      h.innerHTML = "";
      h.append(document.createTextNode(label + "  "));
      const c = document.createElement("span");
      c.className = "count";
      c.textContent = items.length + " TRACKS";
      h.appendChild(c);
      wrap.appendChild(h);
      items.forEach(({ t, i }, n) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "track";
        b.dataset.idx = i;
        const num = document.createElement("span"); num.className = "num";
        num.textContent = String(n + 1).padStart(2, "0");
        const eq = document.createElement("span"); eq.className = "eq"; eq.textContent = "▸▸";
        const title = document.createElement("span"); title.className = "title"; title.textContent = t.title;
        const dur = document.createElement("span"); dur.className = "dur";
        dur.textContent = t.dur != null ? fmt(t.dur) : "";
        b.append(num, eq, title, dur);
        b.addEventListener("click", () => { loadTrack(i); play(); });
        wrap.appendChild(b);
      });
      queueEl.appendChild(wrap);
    });
    markPlaying();
  }

  function markPlaying() {
    queueEl.querySelectorAll(".track").forEach(el => {
      el.classList.toggle("playing", Number(el.dataset.idx) === idx);
    });
  }

  /* ----- transport ----- */
  function loadTrack(i) {
    idx = ((i % TRACKS.length) + TRACKS.length) % TRACKS.length;
    const t = TRACKS[idx];
    // encode each path segment: filenames contain '#', '&', unicode quotes
    audio.src = t.file.split("/").map(encodeURIComponent).join("/");
    audio.load();
    npTitle.textContent = t.title;
    npSub.textContent = "SYNTHEKAI COLLECTIVE · " +
      (t.group === "transmissions" ? "TRANSMISSIONS" : "MYCELIUM BLOOM · DATA PETALS");
    document.title = "▶ " + t.title + " — Synthekai Collective";
    markPlaying();
  }

  function play() {
    if (idx < 0) loadTrack(shuffle ? order[0] : 0);
    ensureAnalyser();
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
    audio.play().catch(() => {});
  }
  function pause() { audio.pause(); }

  function reshuffle() {
    order = TRACKS.map((_, i) => i);
    if (shuffle) {
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      if (idx >= 0) { // keep current track first
        order.splice(order.indexOf(idx), 1);
        order.unshift(idx);
      }
    }
  }

  function step(dir) {
    if (idx < 0) { loadTrack(0); play(); return; }
    const pos = order.indexOf(idx);
    let npos = pos + dir;
    if (npos < 0 || npos >= order.length) {
      if (repeatMode === 1) npos = (npos + order.length) % order.length;
      else { if (dir > 0) { pause(); audio.currentTime = 0; } return; }
    }
    loadTrack(order[npos]);
    play();
  }

  btnPlay.addEventListener("click", () => (audio.paused ? play() : pause()));
  btnPrev.addEventListener("click", () => step(-1));
  btnNext.addEventListener("click", () => step(1));
  btnShuffle.addEventListener("click", () => {
    shuffle = !shuffle;
    btnShuffle.classList.toggle("active", shuffle);
    reshuffle();
  });
  btnRepeat.addEventListener("click", () => {
    repeatMode = (repeatMode + 1) % 3;
    btnRepeat.classList.toggle("active", repeatMode > 0);
    btnRepeat.textContent = repeatMode === 2 ? "↻¹" : "↻";
    btnRepeat.title = ["Repeat off", "Repeat all", "Repeat one"][repeatMode];
  });

  audio.addEventListener("play", () => {
    btnPlay.textContent = "⏸";
    npLive.textContent = "STAGE: LIVE";
  });
  audio.addEventListener("pause", () => {
    btnPlay.textContent = "▶";
    npLive.textContent = idx >= 0 ? "PAUSED" : "STANDBY";
  });
  audio.addEventListener("ended", () => {
    if (repeatMode === 2) { audio.currentTime = 0; play(); }
    else step(1);
  });
  audio.addEventListener("loadedmetadata", () => {
    tDur.textContent = fmt(audio.duration);
  });
  audio.addEventListener("timeupdate", () => {
    if (!seeking && audio.duration) seek.value = Math.floor(audio.currentTime / audio.duration * 1000);
    tCur.textContent = fmt(audio.currentTime);
  });
  seek.addEventListener("pointerdown", () => (seeking = true));
  window.addEventListener("pointerup", () => (seeking = false));
  seek.addEventListener("input", () => {
    if (audio.duration) {
      audio.currentTime = (seek.value / 1000) * audio.duration;
      tCur.textContent = fmt(audio.currentTime);
    }
  });
  vol.addEventListener("input", () => { audio.volume = vol.value / 100; });
  audio.volume = 0.8;

  document.addEventListener("keydown", e => {
    if (e.code === "Space" && !/INPUT|TEXTAREA|BUTTON/.test(document.activeElement.tagName)) {
      e.preventDefault();
      audio.paused ? play() : pause();
    }
  });

  /* ----- init ----- */
  npSub.textContent = "SYNTHEKAI COLLECTIVE · " + TRACKS.length +
    " TRACKS · " + Math.round(TRACKS.reduce((a, t) => a + (t.dur || 0), 0) / 60) + " MIN";
  renderQueue();
  sizeCanvas();
  setTimeout(sizeCanvas, 60);
  drawViz();
})();
