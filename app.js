/* ============================================================
   helpers
   ============================================================ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const store = {
  get(k, d) { try { const v = localStorage.getItem('oneui.' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('oneui.' + k, JSON.stringify(v)); } catch {} }
};

const P = {
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  msg: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  gallery: '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="M4 18l5-5 4 4 3-3 4 4"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  weather: '<circle cx="9" cy="9" r="3.5"/><path d="M17 18H8a4 4 0 1 1 1-7.9A5 5 0 0 1 18 11a3.5 3.5 0 0 1-1 7z"/>',
  notes: '<path d="M6 3h12v18H6z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  music: '<path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2.5"/><circle cx="17" cy="16" r="2.5"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="3"/><path d="M8.500 7.500h7M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.500v3M12 18.500v3M2.500 12h3M18.500 12h3M5.300 5.300l2.100 2.100M16.600 16.600l2.100 2.100M5.300 18.700l2.100-2.100M16.600 7.400l2.100-2.100"/>',
  store: '<path d="M5 8h14l-1 12H6zM9 8a3 3 0 0 1 6 0"/>',
  map: '<path d="M12 21s7-6.200 7-11.500a7 7 0 1 0-14 0C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  heart: '<path d="M12 20s-7.500-4.600-7.500-10A4.300 4.300 0 0 1 12 7.500 4.300 4.300 0 0 1 19.500 10C19.500 15.400 12 20 12 20z"/>',
  wallet: '<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M16 12.500h2M3 9.500h14"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c1-4 4-6 8-6s7 2 8 6"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  brush: '<path d="M4 20c3 0 5-1 5-3.500L18 6a2 2 0 0 0-3-3L8 11c-1 1-4 1-4 4z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="3"/><path d="M16 10l5-3v10l-5-3"/>',
  check: '<path d="M5 12.500l4.500 4.500L19 7"/>',
  bell: '<path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4"/>',
  play: '<path d="M8 5.500v13a1 1 0 0 0 1.500.9l10-6.500a1 1 0 0 0 0-1.600l-10-6.500A1 1 0 0 0 8 5.500z"/>',
  pause: '<rect x="6" y="5" width="4.500" height="14" rx="1.500"/><rect x="13.500" y="5" width="4.500" height="14" rx="1.500"/>',
  next: '<path d="M5 6v12l9-6z"/><rect x="16" y="6" width="3" height="12" rx="1"/>',
  prev: '<path d="M19 6v12l-9-6z"/><rect x="5" y="6" width="3" height="12" rx="1"/>',
  chev: '<path d="M15 5l-7 7 7 7"/>',
  chevr: '<path d="M9 5l7 7-7 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  wifi: '<path d="M3 9a14 14 0 0 1 18 0M6 12.500a9.500 9.500 0 0 1 12 0M9 16a5 5 0 0 1 6 0"/><circle cx="12" cy="19" r="1" fill="currentColor"/>',
  bt: '<path d="M7 7l10 10-5 4V3l5 4L7 17"/>',
  moon: '<path d="M20 14.500A8.500 8.500 0 0 1 9.500 4a8.500 8.500 0 1 0 10.500 10.500z"/>',
  torch: '<path d="M13 2L5 14h6l-1 8 9-12h-6z"/>',
  rotate: '<path d="M20 12a8 8 0 1 1-2.500-5.800M20 4v4h-4"/>',
  plane: '<path d="M21 15l-8-4V5a1 1 0 0 0-2 0v6l-8 4v2l8-2v4l-2 1.500V22l3-1 3 1v-1.500L13 19v-4l8 2z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.500 1.500M17.500 17.500L19 19M5 19l1.500-1.500M17.500 6.500L19 5"/>',
  batt: '<rect x="3" y="8" width="16" height="9" rx="2.500"/><path d="M21 11v3"/>',
  power: '<path d="M12 3v8M6.500 6.500a8 8 0 1 0 11 0"/>',
  send: '<path d="M4 12l16-8-6 16-3-7z"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2.500"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  rain: '<path d="M17 14H8a4 4 0 1 1 1-7.900A5 5 0 0 1 18 7a3.500 3.500 0 0 1-1 7zM8 18l-1 3M12 18l-1 3M16 18l-1 3"/>',
  wifi2: '<path d="M3 9a14 14 0 0 1 18 0M6 12.500a9.500 9.500 0 0 1 12 0M9 16a5 5 0 0 1 6 0"/>',
  vol: '<path d="M4 9v6h4l5 4V5L8 9zM16.500 8.500a5 5 0 0 1 0 7"/>',
  disp: '<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.500h.01"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>'
};
const ico = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${(P[n] || '').replace(/(\d)\.(\d)00\b/g, '$1.$2')}</svg>`;
const fillIco = n => ico(n).replace('fill="none"', 'fill="currentColor"').replace('stroke="currentColor"', 'stroke="none"');

/* ============================================================
   spring engine — critically damped / under-damped, velocity aware
   ============================================================ */
const springs = new Set();
let rafId = 0, lastT = 0;
class Spring {
  constructor(v = 0, { k = 240, z = 1, eps = .0006 } = {}) { this.v = v; this.t = v; this.x = 0; this.k = k; this.c = 2 * Math.sqrt(k) * z; this.eps = eps; this.done = null; }
  set(v) { this.v = this.t = v; this.x = 0; springs.delete(this); layout(); }
  to(t, vel, opts) {
    if (opts) { if (opts.k) { this.k = opts.k; } if (opts.z != null || opts.k) { this.c = 2 * Math.sqrt(this.k) * (opts.z ?? 1); } }
    this.t = t; if (vel != null) this.x = vel;   // no velocity given: keep the current one, so retargeting mid-flight stays fluid
    springs.add(this); kick();
  }
}
function kick() { if (!rafId) { lastT = performance.now(); rafId = requestAnimationFrame(frame); } }
function frame(now) {
  rafId = 0;
  const dt = Math.min(0.032, (now - lastT) / 1000 || 0.016); lastT = now;
  const fin = [];
  springs.forEach(s => {
    const n = Math.max(1, Math.ceil(dt / 0.004)), h = dt / n;
    for (let i = 0; i < n; i++) { const a = -s.k * (s.v - s.t) - s.c * s.x; s.x += a * h; s.v += s.x * h; }
    if (Math.abs(s.x) < s.eps * 16 && Math.abs(s.v - s.t) < s.eps) { s.v = s.t; s.x = 0; fin.push(s); }
  });
  fin.forEach(s => springs.delete(s));
  layout();
  fin.forEach(s => s.done && s.done());
  if (springs.size) kick();
}

/* ============================================================
   core elements & state
   ============================================================ */
const panelBg = $('#panelBg');
const screen = $('#screen'), homeEl = $('#home'), lockEl = $('#lock'), panelEl = $('#panel'), pinEl = $('.pin', panelEl),
  appLayer = $('#appLayer'), isl = $('#isl'), pagesEl = $('#pages');
const S = { app: new Spring(0, { k: 230 }), pan: new Spring(0, { k: 210, z: .92 }), lock: new Spring(0, { k: 190, z: .95 }) };
let current = null;

const bdim = document.createElement('div');
bdim.style.cssText = 'position:absolute;inset:0;background:#000;opacity:0;pointer-events:none;z-index:95';
screen.append(bdim);

function layout() {
  const a = clamp(S.app.v, 0, 1.0), pn = clamp(S.pan.v, 0, 1), l = clamp(S.lock.v, 0, 1);
  homeEl.style.transform = `scale(${1 - .06 * (1 - l) - .08 * a - .035 * pn})`;
  homeEl.style.visibility = (l <= .02 || a >= .999) ? "hidden" : "";
  homeEl.style.pointerEvents = (a > .02 || l < .9) ? 'none' : '';
  if (current) applyWin(a);
  lockEl.style.transform = `translate3d(0,${-104 * l}%,0)`;
  // no opacity on lock/home/panel: opacity makes a backdrop root, which would hide the wallpaper from the glass inside
  lockEl.style.pointerEvents = l > .95 ? 'none' : '';
  lockEl.style.visibility = l >= 1 ? 'hidden' : '';
  panelBg.style.opacity = pn; panelBg.style.visibility = pn > .002 ? "visible" : "hidden";
  panelEl.style.visibility = pn > .002 ? 'visible' : 'hidden';
  panelEl.style.setProperty('--pp', clamp((pn - .05) / .8, 0, 1).toFixed(3));
  pinEl.style.transform = `translate3d(0,${-46 * (1 - pn)}px,0) scale(${.97 + .03 * pn})`;
  appLayer.style.transform = `scale(${1 - .035 * pn})`;
  islApply();
  screen.classList.toggle('panel-open', pn > .5);
  screen.toggleAttribute('data-cam', !!current && current.id === 'camera' && a > .5);
  const scene = l < .5 ? 'lock' : (current && a > .5 ? 'app' : 'home');
  if (screen.dataset.scene !== scene) screen.dataset.scene = scene;
}

/* drag helper with velocity */
function drag(el, cb) {
  el.addEventListener('pointerdown', e => {
    if (e.button || (cb.filter && !cb.filter(e))) return;
    const x0 = e.clientX, y0 = e.clientY; let moved = false, pts = [[performance.now(), e.clientX, e.clientY]];
    const mv = ev => {
      const dx = ev.clientX - x0, dy = ev.clientY - y0;
      if (!moved && Math.hypot(dx, dy) > 5) { moved = true; cb.begin && cb.begin(e); }
      pts.push([performance.now(), ev.clientX, ev.clientY]); if (pts.length > 6) pts.shift();
      if (moved) cb.move && cb.move(dx, dy, ev);
    };
    const up = ev => {
      removeEventListener('pointermove', mv); removeEventListener('pointerup', up); removeEventListener('pointercancel', up);
      const a = pts[0], b = pts[pts.length - 1], dt = Math.max(1, b[0] - a[0]);
      const vx = (b[1] - a[1]) / dt * 1000, vy = (b[2] - a[2]) / dt * 1000;
      cb.end && cb.end(ev.clientX - x0, ev.clientY - y0, moved, vx, vy);
    };
    addEventListener('pointermove', mv); addEventListener('pointerup', up); addEventListener('pointercancel', up);
  });
}

/* ============================================================
   data
   ============================================================ */
const APPS = {
  phone: ['Phone', '#4ade80', '#16a34a', 'phone'], messages: ['Messages', '#5eb0ff', '#2f6bff', 'msg'], camera: ['Camera', '#ff7a7a', '#e11d48', 'camera'],
  browser: ['Internet', '#8b6cff', '#4f46e5', 'globe'], gallery: ['Gallery', '#ffa35a', '#ff5e62', 'gallery'], calendar: ['Calendar', '#4f9dff', '#2d6bff', 'calendar'],
  clock: ['Clock', '#3b4252', '#12141a', 'clock'], weather: ['Weather', '#62ccff', '#2f80ed', 'weather'], notes: ['Notes', '#ffd84a', '#ff9f1c', 'notes'],
  music: ['Music', '#ff6b9d', '#d6246e', 'music'], calc: ['Calculator', '#3ee0a0', '#059669', 'calc'], settings: ['Settings', '#9aa5b5', '#4b5563', 'gear'],
  store: ['Store', '#ff7ab8', '#c026d3', 'store'], maps: ['Maps', '#3ee0a0', '#0ea5e9', 'map'], files: ['My Files', '#ffbb55', '#f97316', 'folder'],
  health: ['Health', '#ff7088', '#e11d48', 'heart'], wallet: ['Wallet', '#4c8dff', '#1e3a8a', 'wallet'], contacts: ['Contacts', '#fb9a4c', '#ea580c', 'user'],
  voice: ['Recorder', '#7a7dff', '#312e81', 'mic'], themes: ['Themes', '#f783c6', '#8b5cf6', 'brush'], mail: ['Mail', '#66b2ff', '#2563eb', 'mail'],
  videos: ['Videos', '#ff7b7b', '#b91c1c', 'video'], reminder: ['Reminder', '#a8e84a', '#16a34a', 'check'], tips: ['Tips', '#ffc93c', '#d97706', 'bell']
};
const appIcon = id => { const [, a, b, i] = APPS[id]; return `<span class="ic" style="--a:${a};--b:${b}">${ico(i)}</span>`; };
const appBtn = id => `<button class="app" data-app="${id}" aria-label="${APPS[id][0]}">${appIcon(id)}<em>${APPS[id][0]}</em></button>`;

const TR = [
  { t: 'Midnight Drive', a: 'Neon Harbor', d: 214, c: ['#ff6b9d', '#7c5cff'] },
  { t: 'Glass Hours', a: 'Aoi', d: 187, c: ['#2dd4ff', '#3b82f6'] },
  { t: 'Slow Bloom', a: 'Wren & Co.', d: 241, c: ['#ffb347', '#ff3d81'] },
  { t: 'Paper Planes', a: 'Hollow Pines', d: 203, c: ['#34d399', '#0ea5e9'] }
];
const M = { i: 0, playing: false, pos: 0 };
let NOTIFS = [
  { app: 'messages', who: 'Mina', text: 'Are we still on for dinner tonight? 🍜', time: 'now' },
  { app: 'calendar', who: 'Design review', text: 'Starts in 15 minutes · Room 4B', time: '8m' },
  { app: 'weather', who: 'Rain expected', text: 'Light showers around 6 PM. Take an umbrella.', time: '32m' },
  { app: 'music', who: 'New release', text: 'Aoi dropped “Glass Hours”. Listen now.', time: '1h' }
];

/* ============================================================
   home screen
   ============================================================ */
function buildHome() {
  const p1 = ['gallery', 'calendar', 'clock', 'weather', 'notes', 'music', 'calc', 'settings', 'store', 'maps', 'files', 'health'];
  const p2 = ['wallet', 'contacts', 'voice', 'themes', 'mail', 'videos', 'reminder', 'tips'];
  pagesEl.innerHTML = `
    <div class="page">
      <div class="widget glass" id="wClock"><div><div class="t" id="wTime">10:42</div><div class="d" id="wDate"></div></div>
        <div class="w">${ico('sun')}<b>24°</b><span>Seoul · Clear</span></div></div>
      ${p1.map(appBtn).join('')}
    </div>
    <div class="page">
      <div class="widget half glass wcal"><b id="wMon">NOV</b><div class="n" id="wDay">21</div><p>Design review<br>11:00 – 12:00</p></div>
      <div class="widget half glass wbat"><span style="font-size:13px;opacity:.85;font-weight:500">Battery</span><div class="ring"><b>82%</b></div><span style="font-size:12px;opacity:.8">Fast charging</span></div>
      ${p2.map(appBtn).join('')}
    </div>`;
  $('#dock').innerHTML = ['phone', 'messages', 'browser', 'camera'].map(appBtn).join('');
  $$('#dock .ic').forEach(i => i.classList.add('glass'));
  $('#dots').innerHTML = '<i class="on"></i><i></i>';
  pagesEl.addEventListener('scroll', () => {
    const i = Math.round(pagesEl.scrollLeft / pagesEl.clientWidth);
    $$('#dots i').forEach((d, j) => d.classList.toggle('on', i === j));
    document.documentElement.style.setProperty('--par', pagesEl.scrollLeft / pagesEl.clientWidth);
    const wp = $('#wallpaper'); wp.style.transform = `translate3d(${-pagesEl.scrollLeft / pagesEl.clientWidth * 26}px,0,0)`;
  }, { passive: true });
}

/* ============================================================
   app windows (spring-driven)
   ============================================================ */
const rectIn = el => { const a = el.getBoundingClientRect(), s = screen.getBoundingClientRect(); return { x: a.left - s.left, y: a.top - s.top, w: a.width, h: a.height }; };
function originOf(from) {
  const s = screen.getBoundingClientRect(); const r = from && from.isConnected ? rectIn(from) : { x: s.width / 2 - 29, y: s.height - 110, w: 58, h: 58 };
  return { dx: r.x + r.w / 2 - s.width / 2, dy: r.y + r.h / 2 - s.height / 2, sx: r.w / s.width, sy: r.h / s.height };
}
function applyWin(a) {
  const c = current, w = c.w, o = c.o, p = clamp(a, 0, 1.04);
  const sx = lerp(o.sx, 1, p), sy = lerp(o.sy, 1, p);
  const fx = c.fx * clamp(p, 0, 1), fy = c.fy * clamp(p, 0, 1);
  w.style.transform = `translate3d(${lerp(o.dx, 0, p) + fx}px,${lerp(o.dy, 0, p) + fy}px,0) scale(${sx},${sy})`;
  const vr = lerp(19, 50, clamp(p, 0, 1));
  w.style.borderRadius = `${vr / ((sx + sy) / 2 || 1)}px / ${vr / sy}px`;
  w.style.opacity = clamp(p * 8, 0, 1);
  c.splash.style.opacity = clamp(1 - (p - .05) * 2.6, 0, 1);
  c.inner.style.opacity = clamp((p - .28) * 2.2, 0, 1);
  appLayer.style.pointerEvents = p > .95 ? '' : 'none';
}
function openApp(id, from) {
  if (current) return;
  const def = APPS[id] || APPS.tips;
  const w = document.createElement('div'); w.className = 'win'; w.dataset.app = id; w.style.willChange = 'transform,opacity';
  const inner = document.createElement('div'); inner.style.cssText = 'position:absolute;inset:0'; w.append(inner);
  const splash = document.createElement('div');
  splash.style.cssText = `position:absolute;inset:0;z-index:99;pointer-events:none;display:grid;place-items:center;background:linear-gradient(160deg,${def[1]},${def[2]})`;
  splash.innerHTML = `<div style="color:#fff;width:46%;max-width:150px">${ico(def[3])}</div>`;
  w.append(splash);
  appLayer.append(w);
  current = { id, w, inner, splash, from, o: originOf(from), fx: 0, fy: 0 };
  (BUILD[id] || buildGeneric)(inner, id);
  S.app.set(0); S.app.done = null;
  S.app.to(1, 0, { k: 240, z: 1 });
}
function closeApp(vel = 0) {
  if (!current) return;
  current.o = originOf(current.from);
  const c = current;
  S.app.done = () => { if (current === c && S.app.v <= .001) { c.w.remove(); current = null; S.app.done = null; layout(); } };
  S.app.to(0, vel, { k: 260, z: 1 });
}
function goHome() {
  if (S.pan.t > .5) { S.pan.to(0); return; }
  if (S.lock.t < .5) { unlock(); return; }
  if (current) closeApp();
  else pagesEl.scrollTo({ left: 0, behavior: 'smooth' });
}
let greeted = false;
function unlock(vel = 0) {
  S.lock.to(1, vel, { k: 170, z: 1 });
  if (!greeted) { greeted = true; setTimeout(() => peekMsg('Mina', 'Are we still on for dinner tonight? 🍜'), 2400); }
}
function relock() { closeAppNow(); S.pan.set(0); S.lock.to(0, 0, { k: 190, z: .95 }); }
function closeAppNow() { if (current) { current.w.remove(); current = null; S.app.set(0); } }

/* ---------- shared window scaffolding ---------- */
function shell(root, title, { sub = '', tabs = null } = {}) {
  root.innerHTML = `<div class="scroll"><div class="hero"><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div><div class="body"></div></div>
    <div class="appbar"><button class="back glass round" aria-label="Back">${ico('chev')}</button><b>${title}</b><span class="act"></span></div>`;
  const sc = $('.scroll', root), hero = $('.hero', root), bar = $('.appbar', root);
  sc.addEventListener('scroll', () => {
    const t = clamp(sc.scrollTop / 120, 0, 1);
    hero.style.opacity = 1 - t; hero.style.transform = `scale(${1 - .08 * t}) translateY(${-sc.scrollTop * .12}px)`;
    bar.style.setProperty('--t', t);
  }, { passive: true });
  $('.back', root).onclick = () => closeApp();
  return $('.body', root);
}
const rowH = (icon, color, title, sub = '', right = '') =>
  `<div class="row">${icon ? `<span class="ri" style="background:${color}">${ico(icon)}</span>` : ''}<div class="tx"><b>${title}</b>${sub ? `<span>${sub}</span>` : ''}</div>${right}</div>`;
const swH = on => `<span class="sw ${on ? 'on' : ''}"><i></i></span>`;
function bindSw(root, sel, cb) { $$(sel, root).forEach(el => el.addEventListener('click', () => { el.classList.toggle('on'); cb && cb(el.classList.contains('on'), el); })); }

function slider(el, { v = .5, input } = {}) {
  const fill = $('.fill', el), knob = $('.knob', el); let val = v;
  const set = x => { val = clamp(x, 0, 1); fill.style.width = `${val * 100}%`; if (knob) knob.style.left = `${val * 100}%`; input && input(val); };
  const pos = e => { const r = el.getBoundingClientRect(); set((e.clientX - r.left) / r.width); };
  el.addEventListener('pointerdown', e => {
    e.stopPropagation(); pos(e); knob && (knob.style.transform = 'scale(1.18)');
    const mv = ev => pos(ev), up = () => { removeEventListener('pointermove', mv); removeEventListener('pointerup', up); knob && (knob.style.transform = ''); };
    addEventListener('pointermove', mv); addEventListener('pointerup', up);
  });
  set(v); return { set };
}

/* ============================================================
   apps
   ============================================================ */
const BUILD = {};

/* ---- Settings ---- */
BUILD.settings = root => {
  const b = shell(root, 'Settings', { sub: 'Nova' });
  const dark = screen.dataset.theme === 'dark';
  const wp = +screen.dataset.wp;
  b.innerHTML = `
    <div class="card">${rowH('user', 'linear-gradient(135deg,#7c5cff,#3b82f6)', 'Nova Lee', 'Samsung account · Cloud 14 GB used', '')}</div>
    <div class="sec">Appearance</div>
    <div class="card">
      ${rowH('moon', '#6366f1', 'Dark mode', 'Follows glass tint', `<span id="swDark">${swH(dark)}</span>`)}
      <div class="row" style="flex-direction:column;align-items:stretch;gap:10px"><div class="tx"><b>Lens refraction</b><span>${chromium ? 'Glass bends what is behind it' : 'Needs a Chromium browser'}</span></div><div class="slider" id="sRefr"><div class="fill"></div><div class="knob glass"></div></div></div>
      <div class="row" style="flex-direction:column;align-items:stretch;gap:10px"><div class="tx"><b>Glass quality</b><span>Max adds chromatic fringing</span></div><div class="seg" id="sTier">${['Lite', 'Balanced', 'Max'].map((n, i) => `<button data-t="${i}" class="${i === tier ? 'on' : ''}" ${chromium || !i ? '' : 'disabled'}>${n}</button>`).join('')}</div></div>
      <div class="row" style="flex-direction:column;align-items:stretch;gap:10px"><div class="tx"><b>Glass blur</b></div><div class="slider" id="sBlur"><div class="fill"></div><div class="knob glass"></div></div></div>
    </div>
    <div class="card">
      <div class="row" style="padding-bottom:4px"><div class="tx"><b>Wallpaper</b></div></div>
      <div class="swatches" id="wps">${[0, 1, 2, 3].map(i => `<button class="${i === wp ? 'on' : ''}" data-i="${i}" style="background:${['linear-gradient(160deg,#ff6b9d,#7c5cff,#2dd4ff)', 'linear-gradient(160deg,#34d399,#3b82f6,#a855f7)', 'linear-gradient(160deg,#ffc371,#ff3d81,#8e44ff)', 'linear-gradient(160deg,#7b8794,#3e91ff,#151b29)'][i]}"></button>`).join('')}</div>
      <div class="row" style="padding-bottom:0"><div class="tx"><b>Accent color</b></div></div>
      <div class="accs" id="accs">${['#3e91ff', '#7c5cff', '#ff4f81', '#22c58b', '#ff9f1c'].map(c => `<button data-c="${c}" style="background:${c}"></button>`).join('')}</div>
    </div>
    <div class="sec">Connections</div>
    <div class="card">
      ${rowH('wifi2', '#3b82f6', 'Wi-Fi', 'Home_5G', `<span class="v">${ico('chevr').replace('<svg', '<svg width="16" height="16"')}</span>`)}
      ${rowH('bt', '#2563eb', 'Bluetooth', 'Galaxy Buds Pro', `<span class="v">On</span>`)}
      ${rowH('plane', '#f97316', 'Flight mode', '', swH(false).replace('class="sw ', 'id="x" class="sw '))}
    </div>
    <div class="card">
      ${rowH('bell', '#ef4444', 'Notifications', 'Status bar, Do not disturb')}
      ${rowH('vol', '#10b981', 'Sounds and vibration', 'Sound mode, ringtone')}
      ${rowH('disp', '#8b5cf6', 'Display', 'Brightness, Eye comfort shield')}
      ${rowH('batt', '#22c55e', 'Battery', '82% · 11 h 20 m left')}
      ${rowH('info', '#64748b', 'About phone', 'One UI 8.5 · Liquid')}
    </div>`;
  bindSw(b, '#swDark .sw', on => setTheme(on ? 'dark' : 'light'));
  slider($('#sRefr', b), { v: refrAmt, input: v => { if (chromium) setRefraction(v); } });
  $$('#sTier button', b).forEach(btn => btn.onclick = () => { if (btn.disabled) return; setTier(+btn.dataset.t); $$('#sTier button', b).forEach(x => x.classList.toggle('on', x === btn)); });
  bindSw(b, '#x');
  slider($('#sBlur', b), { v: store.get('blur', .45), input: v => { screen.style.setProperty('--gblur', `${4 + v * 36}px`); store.set('blur', v); } });
  $$('#wps button', b).forEach(btn => btn.onclick = () => { setWp(+btn.dataset.i); $$('#wps button', b).forEach(x => x.classList.toggle('on', x === btn)); });
  const acc = store.get('acc', '#3e91ff');
  $$('#accs button', b).forEach(btn => { btn.classList.toggle('on', btn.dataset.c === acc); btn.onclick = () => { setAcc(btn.dataset.c); $$('#accs button', b).forEach(x => x.classList.toggle('on', x === btn)); }; });
};
function setTheme(t) { screen.dataset.theme = t; store.set('theme', t); syncTheme(); }
function setWp(i) { screen.dataset.wp = i; store.set('wp', i); }
function setAcc(c) { screen.style.setProperty('--acc', c); store.set('acc', c); }

/* ---- Calculator ---- */
BUILD.calc = root => {
  root.innerHTML = `<div class="appbar" style="background:none"><button class="back glass round">${ico('chev')}</button></div>
    <div class="calc"><div class="disp"><div class="ex"></div><div class="rs">0</div></div>
    <div class="keys">${[['AC', 'fn'], ['±', 'fn'], ['%', 'fn'], ['÷', 'op'], 7, 8, 9, ['×', 'op'], 4, 5, 6, ['−', 'op'], 1, 2, 3, ['+', 'op'], ['⌫', 'fn'], 0, '.', ['=', 'eq']].map(k => Array.isArray(k) ? `<button class="${k[1]}" data-k="${k[0]}">${k[0]}</button>` : `<button data-k="${k}">${k}</button>`).join('')}</div></div>`;
  $('.back', root).onclick = () => closeApp();
  let ex = '', cur = '0', fresh = false, typed = true;
  const ev = s => {
    const e = s.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');
    if (!/^[\d+\-*/. ()e]+$/.test(e)) return 'Error';
    try { const r = Function(`"use strict";return (${e})`)(); return isFinite(r) ? String(parseFloat(r.toPrecision(12))) : 'Error'; } catch { return 'Error'; }
  };
  const show = () => { $('.ex', root).textContent = ex; const r = $('.rs', root); r.textContent = cur; r.style.fontSize = cur.length > 9 ? '44px' : cur.length > 6 ? '56px' : '68px'; };
  root.addEventListener('click', e => {
    const k = e.target.closest('[data-k]')?.dataset.k; if (!k) return;
    if (/^\d$/.test(k)) { if (fresh) { cur = '0'; ex = ''; fresh = false; } cur = cur === '0' ? k : cur + k; typed = true; }
    else if (k === '.') { if (fresh) { cur = '0'; ex = ''; fresh = false; } if (!cur.includes('.')) cur += '.'; typed = true; }
    else if (k === 'AC') { ex = ''; cur = '0'; typed = true; fresh = false; }
    else if (k === '⌫') cur = cur.length > 1 && cur !== 'Error' ? cur.slice(0, -1) : '0';
    else if (k === '±') cur = cur.startsWith('-') ? cur.slice(1) : (cur === '0' ? cur : '-' + cur);
    else if (k === '%') cur = String(parseFloat(cur) / 100);
    else if ('÷×−+'.includes(k)) {
      if (fresh) { ex = ''; fresh = false; }
      if (!typed && ex) ex = ex.slice(0, -2) + k + ' '; else { ex += `${cur} ${k} `; }
      cur = '0'; typed = false;
    } else if (k === '=') { if (ex && typed) { const full = ex + cur; const r = ev(full); ex = full + ' ='; cur = r; fresh = true; } }
    show();
  });
};

/* ---- Clock ---- */
BUILD.clock = root => {
  const b = shell(root, 'Clock');
  root.insertAdjacentHTML('beforeend', `<div class="tabbar glass"><button data-t="alarm" class="on">${ico('bell')}Alarm</button><button data-t="world">${ico('globe')}World</button><button data-t="stop">${ico('clock')}Stopwatch</button></div>`);
  const alarms = [['6:30', 'AM', 'Mon – Fri', true], ['7:45', 'AM', 'Weekends', false], ['11:15', 'PM', 'Every day', true]];
  const cities = [['Seoul', 'Asia/Seoul'], ['New York', 'America/New_York'], ['London', 'Europe/London'], ['Tokyo', 'Asia/Tokyo'], ['Sydney', 'Australia/Sydney']];
  b.innerHTML = `
    <div class="panelv on" data-p="alarm"><div class="card">${alarms.map(a => `<div class="row"><div class="tx"><b style="font-size:34px;font-weight:300">${a[0]} <small style="font-size:14px;font-weight:500">${a[1]}</small></b><span>${a[2]}</span></div>${swH(a[3])}</div>`).join('')}</div></div>
    <div class="panelv" data-p="world"><div class="clockface"><i class="h"></i><i class="m"></i><i class="s"></i></div>
      <div class="card">${cities.map(c => `<div class="row"><div class="tx"><b>${c[0]}</b><span data-tz="${c[1]}d"></span></div><b data-tz="${c[1]}" style="font-size:26px;font-weight:300"></b></div>`).join('')}</div></div>
    <div class="panelv" data-p="stop"><div class="big-time" id="swT">00:00.00</div><div class="ctr"><button class="pill" id="swL">Lap</button><button class="pill go" id="swG">Start</button></div><div class="card" id="laps"></div></div>`;
  bindSw(b, '.sw');
  $$('.tabbar button', root).forEach(t => t.onclick = () => {
    $$('.tabbar button', root).forEach(x => x.classList.toggle('on', x === t));
    $$('.panelv', b).forEach(p => p.classList.toggle('on', p.dataset.p === t.dataset.t));
  });
  const face = () => {
    if (!root.isConnected) return;
    const d = new Date(), s = d.getSeconds() + d.getMilliseconds() / 1000, m = d.getMinutes() + s / 60, h = d.getHours() % 12 + m / 60;
    const f = $('.clockface', b); if (f) { $('.h', f).style.transform = `rotate(${h * 30}deg)`; $('.m', f).style.transform = `rotate(${m * 6}deg)`; $('.s', f).style.transform = `rotate(${s * 6}deg)`; }
    $$('[data-tz]', b).forEach(el => {
      const tz = el.dataset.tz; if (tz.endsWith('d')) { el.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', timeZone: tz.slice(0, -1) }); }
      else el.textContent = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false, timeZone: tz });
    });
    requestAnimationFrame(face);
  }; face();
  let run = false, t0 = 0, acc = 0, laps = [];
  const fmt = ms => { const m = Math.floor(ms / 60000), s = Math.floor(ms / 1000) % 60, c = Math.floor(ms / 10) % 100; return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(c).padStart(2, '0')}`; };
  const upd = () => { if (!root.isConnected) return; $('#swT', b).textContent = fmt(acc + (run ? performance.now() - t0 : 0)); requestAnimationFrame(upd); }; upd();
  $('#swG', b).onclick = e => { if (run) { acc += performance.now() - t0; run = false; e.target.textContent = 'Start'; $('#swL', b).textContent = 'Reset'; } else { t0 = performance.now(); run = true; e.target.textContent = 'Stop'; $('#swL', b).textContent = 'Lap'; } };
  $('#swL', b).onclick = () => {
    if (run) laps.unshift(fmt(acc + performance.now() - t0)); else { acc = 0; laps = []; }
    $('#laps', b).innerHTML = laps.map((l, i) => `<div class="lap"><span style="color:var(--sub)">Lap ${laps.length - i}</span><b style="font-weight:500">${l}</b></div>`).join('');
  };
};

/* ---- Weather ---- */
BUILD.weather = root => {
  const b = shell(root, 'Weather', { sub: 'Seoul' });
  const hrs = [['Now', 'sun', 24], ['12', 'sun', 25], ['1 PM', 'weather', 26], ['2', 'weather', 26], ['3', 'weather', 24], ['4', 'rain', 22], ['5', 'rain', 20], ['6', 'rain', 19], ['7', 'weather', 18]];
  const days = [['Today', 'sun', 17, 26], ['Sun', 'rain', 14, 21], ['Mon', 'weather', 13, 20], ['Tue', 'sun', 12, 22], ['Wed', 'sun', 13, 24], ['Thu', 'weather', 15, 23]];
  b.innerHTML = `<div class="wx-hero"><div class="tt">24°</div><p style="font-size:18px;font-weight:500">Mostly clear</p><p>H 26°  ·  L 17°</p></div>
    <div class="card"><div class="hours">${hrs.map(h => `<div><span>${h[0]}</span>${ico(h[1])}<b style="font-weight:500">${h[2]}°</b></div>`).join('')}</div></div>
    <div class="card">${days.map(d => `<div class="day"><b style="font-weight:500">${d[0]}</b>${ico(d[1])}<div class="rng"><i style="left:${(d[2] - 10) * 5}%;right:${100 - (d[3] - 10) * 5}%"></i></div><span style="text-align:right;font-size:14px">${d[2]}° <span style="color:var(--sub)">${d[3]}°</span></span></div>`).join('')}</div>`;
};

/* ---- Notes ---- */
BUILD.notes = root => {
  const b = shell(root, 'Notes');
  let notes = store.get('notes', [
    { id: 1, t: 'Glass UI ideas', b: 'Refraction on edges, specular highlight follows the pointer, elastic thumb on switches.', d: 'Nov 20' },
    { id: 2, t: 'Groceries', b: 'Oat milk, yuzu, sesame oil, rice, tofu, kimchi', d: 'Nov 18' },
    { id: 3, t: 'Trip — Jeju', b: 'Flights Friday 9:40 · Hotel near Hallasan · Rent a car', d: 'Nov 12' }
  ]);
  root.insertAdjacentHTML('beforeend', `<div class="fabr"><button class="fab glass" aria-label="New note">${ico('plus')}</button></div>`);
  const render = () => { b.innerHTML = notes.map(n => `<button class="note card" data-id="${n.id}"><b>${n.t || 'Untitled'}</b><p>${n.b || 'No additional text'}</p><small>${n.d}</small></button>`).join(''); };
  const edit = n => {
    const ed = document.createElement('div'); ed.className = 'editor';
    ed.innerHTML = `<button class="back glass round" style="position:absolute;top:46px;left:14px">${ico('chev')}</button><input placeholder="Title" value="${(n.t || '').replace(/"/g, '&quot;')}"><textarea placeholder="Start typing…"></textarea>`;
    $('textarea', ed).value = n.b || ''; root.append(ed);
    ed.animate([{ opacity: 0, transform: 'translateY(30px) scale(.98)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'cubic-bezier(.22,1,.36,1)' });
    $('.back', ed).onclick = () => { n.t = $('input', ed).value; n.b = $('textarea', ed).value; store.set('notes', notes); render(); ed.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(30px)' }], { duration: 260, easing: 'ease-in' }).onfinish = () => ed.remove(); };
  };
  b.addEventListener('click', e => { const n = e.target.closest('.note'); if (n) edit(notes.find(x => x.id == n.dataset.id)); });
  $('.fab', root).onclick = () => { const n = { id: Date.now(), t: '', b: '', d: 'Today' }; notes.unshift(n); edit(n); };
  render();
};

/* ---- Music ---- */
BUILD.music = root => {
  const b = shell(root, 'Music', { sub: 'Now playing' });
  b.style.padding = '0 14px 120px';
  b.innerHTML = `<div class="mplayer" style="padding:0"><div class="cover" data-m="art"></div><div style="text-align:center"><h2 data-m="title"></h2><p data-m="artist"></p></div>
    <div class="prog"><div class="slider" id="mProg"><div class="fill" style="background:var(--acc)"></div></div><div class="t"><span id="mCur">0:00</span><span id="mDur"></span></div></div>
    <div class="mctl"><button class="glass round" data-act="prev">${fillIco('prev')}</button><button class="glass round main" data-act="play"></button><button class="glass round" data-act="next">${fillIco('next')}</button></div></div>
    <div class="sec">Up next</div><div class="card" id="tl">${TR.map((t, i) => `<button class="row track" data-i="${i}"><span class="cv" style="background:linear-gradient(135deg,${t.c[0]},${t.c[1]})"></span><div class="tx"><b>${t.t}</b><span>${t.a}</span></div><span class="v">${fmt(t.d)}</span></button>`).join('')}</div>`;
  $('#tl', b).addEventListener('click', e => { const r = e.target.closest('[data-i]'); if (r) { M.i = +r.dataset.i; M.pos = 0; M.playing = true; mUpdate(); } });
  slider($('#mProg', b), { v: M.pos / TR[M.i].d, input: v => { M.pos = v * TR[M.i].d; mTick(); } });
  mUpdate();
};
const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
function mTick() {
  const t = TR[M.i], pc = M.pos / t.d * 100;
  $$('[data-m=bar]').forEach(u => u.style.width = pc + '%');
  const cur = $('#mCur'); if (cur) { cur.textContent = fmt(M.pos); }
  $$('[data-m=cur]').forEach(e => e.textContent = fmt(M.pos));
  $$('[data-m=dur]').forEach(e => e.textContent = '-' + fmt(Math.max(0, t.d - M.pos)));
  const f = $('#mProg .fill'); if (f) f.style.width = pc + '%';
}
function mUpdate() {
  const t = TR[M.i], grad = `linear-gradient(135deg,${t.c[0]},${t.c[1]})`;
  $$('[data-m=title]').forEach(e => e.textContent = t.t);
  $$('[data-m=artist]').forEach(e => e.textContent = t.a);
  $$('[data-m=art]').forEach(e => { e.style.background = grad; e.classList.toggle('pl', M.playing); });
  $$('[data-act=play]').forEach(btn => btn.innerHTML = fillIco(M.playing ? 'pause' : 'play'));
  $$('[data-act=prev]').forEach(btn => btn.innerHTML = fillIco('prev'));
  $$('[data-act=next]').forEach(btn => btn.innerHTML = fillIco('next'));
  const d = $('#mDur'); if (d) d.textContent = fmt(t.d);
  screen.classList.toggle('playing', M.playing);
  isl.style.setProperty('--ga', t.c[0]); isl.style.setProperty('--gb', t.c[1]);
  islUpdate(); mTick();
}
setInterval(() => { if (M.playing) { M.pos += .25; if (M.pos >= TR[M.i].d) { M.i = (M.i + 1) % TR.length; M.pos = 0; mUpdate(); } else mTick(); } }, 250);

/* ---- Calendar ---- */
BUILD.calendar = root => {
  const d = new Date(), y = d.getFullYear(), m = d.getMonth(), first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate();
  const b = shell(root, 'Calendar', { sub: d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) });
  const marks = [3, 8, 14, d.getDate(), 27];
  b.innerHTML = `<div class="card"><div class="mgrid">${['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(x => `<span>${x}</span>`).join('')}${'<i></i>'.repeat(first)}${Array.from({ length: days }, (_, i) => `<button class="${i + 1 === d.getDate() ? 'today' : ''} ${marks.includes(i + 1) ? 'dot' : ''}">${i + 1}</button>`).join('')}</div></div>
    <div class="sec">Today</div><div class="card">
      <div class="ev"><i style="background:#3e91ff"></i><div><b>Design review</b><span>11:00 – 12:00 · Room 4B</span></div></div>
      <div class="ev"><i style="background:#ff4f81"></i><div><b>Lunch with Mina</b><span>12:30 – 13:30 · Yuzu Kitchen</span></div></div>
      <div class="ev"><i style="background:#22c58b"></i><div><b>Gym</b><span>18:30 – 19:30</span></div></div></div>`;
};

/* ---- Gallery ---- */
BUILD.gallery = root => {
  const b = shell(root, 'Gallery', { sub: '36 pictures' });
  b.style.padding = '0 3px 120px';
  const tile = i => { const h = (i * 47 + 200) % 360; return `linear-gradient(${(i * 37) % 360}deg,hsl(${h} 85% 62%),hsl(${(h + 60) % 360} 80% 52%))`; };
  b.innerHTML = `<div class="ggrid">${Array.from({ length: 36 }, (_, i) => `<button data-i="${i}" style="background:radial-gradient(circle at ${20 + (i * 13) % 60}% ${25 + (i * 17) % 50}%,rgba(255,255,255,.55),transparent 38%),${tile(i)}"></button>`).join('')}</div>`;
  b.addEventListener('click', e => {
    const t = e.target.closest('[data-i]'); if (!t) return;
    const v = document.createElement('div'); v.className = 'viewer'; v.innerHTML = `<div style="background:${t.style.background}"></div><button class="glass round">${ico('chev')}</button>`;
    root.append(v); v.animate([{ opacity: 0, transform: 'scale(.9)' }, { opacity: 1, transform: 'none' }], { duration: 400, easing: 'cubic-bezier(.22,1,.36,1)' });
    v.onclick = () => v.animate([{ opacity: 1 }, { opacity: 0, transform: 'scale(.94)' }], { duration: 240, easing: 'ease-in' }).onfinish = () => v.remove();
  });
};

/* ---- Messages ---- */
BUILD.messages = root => {
  const b = shell(root, 'Messages');
  const convs = [['Mina', 'Are we still on for dinner tonight? 🍜', '#ff6b9d', 'now'], ['Studio Group', 'Jun: uploaded the new mocks', '#7c5cff', '9:12'], ['Dad', 'Call me when you land', '#3e91ff', 'Tue'], ['Jun', 'lol that glass effect is insane', '#22c58b', 'Mon']];
  const data = { Mina: [['in', 'Hey! Are we still on for dinner tonight? 🍜'], ['out', 'Yes!! 7:30 at Yuzu Kitchen?'], ['in', 'Perfect. I will grab a table.']], 'Studio Group': [['in', 'Jun: uploaded the new mocks']], Dad: [['in', 'Call me when you land']], Jun: [['in', 'lol that glass effect is insane']] };
  b.innerHTML = `<div class="card">${convs.map(c => `<button class="row" data-n="${c[0]}"><span class="ri" style="background:${c[2]};width:46px;height:46px;font-weight:600">${c[0][0]}</span><div class="tx"><b>${c[0]}</b><span>${c[1]}</span></div><span class="v" style="font-size:12px">${c[3]}</span></button>`).join('')}</div>`;
  b.addEventListener('click', e => {
    const r = e.target.closest('[data-n]'); if (!r) return; const name = r.dataset.n;
    const th = document.createElement('div'); th.className = 'thread';
    th.innerHTML = `<header><button class="back glass round">${ico('chev')}</button><b>${name}</b></header><div class="msgs"></div><div class="compose glass"><input placeholder="Message"><button>${ico('send')}</button></div>`;
    root.append(th); const ms = $('.msgs', th);
    const add = (k, t) => { const d = document.createElement('div'); d.className = `bub ${k}`; d.textContent = t; ms.append(d); ms.scrollTop = ms.scrollHeight; };
    data[name].forEach(m => add(...m));
    th.animate([{ transform: 'translateX(100%)' }, { transform: 'none' }], { duration: 480, easing: 'cubic-bezier(.22,1,.36,1)' });
    $('.back', th).onclick = () => th.animate([{ transform: 'none' }, { transform: 'translateX(100%)' }], { duration: 360, easing: 'cubic-bezier(.4,0,.2,1)' }).onfinish = () => th.remove();
    const inp = $('input', th), send = () => { const t = inp.value.trim(); if (!t) return; add('out', t); inp.value = ''; setTimeout(() => add('in', ['Haha yes', 'Sounds good!', 'On my way', 'Okay 👍'][Math.random() * 4 | 0]), 900); };
    $('.compose button', th).onclick = send; inp.onkeydown = e => { e.stopPropagation(); if (e.key === 'Enter') send(); };
  });
};

/* ---- Camera ---- */
BUILD.camera = root => {
  root.className = 'cam'; root.style.background = '#000';
  root.innerHTML = `<div class="vf"></div><div class="appbar"><button class="back glass round">${ico('chev')}</button><span class="act glass round">${ico('torch')}</span></div>
    <div class="camui"><div class="modes glass lens">${['Video', 'Photo', 'Portrait', 'Pro'].map((m, i) => `<button class="${i === 1 ? 'on' : ''}">${m}</button>`).join('')}</div><button class="shut" aria-label="Shutter"><i></i></button></div><div class="flash"></div>`;
  $('.back', root).onclick = () => closeApp();
  $$('.modes button', root).forEach(btn => btn.onclick = () => $$('.modes button', root).forEach(x => x.classList.toggle('on', x === btn)));
  $('.shut', root).onclick = () => $('.flash', root).animate([{ opacity: .9 }, { opacity: 0 }], { duration: 380, easing: 'ease-out' });
};

/* ---- generic ---- */
function buildGeneric(root, id) {
  const name = APPS[id][0];
  const b = shell(root, name, { sub: 'Nothing new' });
  const dflt = [['Recent', 'Last opened today'], ['Favorites', '0 items'], ['Suggestions', 'Based on your usage']];
  b.innerHTML = `<div class="card">${dflt.map(r => rowH(APPS[id][3], `linear-gradient(135deg,${APPS[id][1]},${APPS[id][2]})`, r[0], r[1])).join('')}</div><div class="empty">Nothing to show yet</div>`;
}
BUILD.phone = (root, id) => buildGeneric(root, id);

/* ============================================================
   status, clock, lock, notifications, island, panel
   ============================================================ */
function tick() {
  const d = new Date(), h = d.getHours() % 12 || 12, mm = String(d.getMinutes()).padStart(2, '0'), t = `${h}:${mm}`;
  ['#sbTime', '#pTime', '#lkTime', '#wTime'].forEach(s => { const e = $(s); if (e) e.textContent = t; });
  const date = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  ['#pDate', '#lkDate'].forEach(s => $(s).textContent = date);
  const wd = $('#wDate'); if (wd) wd.textContent = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const wm = $('#wMon'); if (wm) { wm.textContent = d.toLocaleDateString('en-US', { month: 'short' }); $('#wDay').textContent = d.getDate(); }
}

function renderNotifs() {
  const card = (n, i) => `<div class="notif glass" data-i="${i}"><span class="ic sm" style="--a:${APPS[n.app][1]};--b:${APPS[n.app][2]}">${ico(APPS[n.app][3])}</span><div><b>${n.who}</b><p>${n.text}</p></div><small>${n.time}</small></div>`;
  $('#lkNotifs').innerHTML = NOTIFS.slice(0, 3).map(card).join('');
  $('#pNotifs').innerHTML = NOTIFS.length ? NOTIFS.map(card).join('') : '<div class="nonotif">No notifications</div>';
}
document.addEventListener('click', e => {
  const n = e.target.closest('.notif'); if (!n || n.classList.contains('out')) return;
  const i = +n.dataset.i, item = NOTIFS[i]; n.classList.add('out');
  setTimeout(() => { NOTIFS = NOTIFS.filter(x => x !== item); renderNotifs(); }, 380);
});
$('#clearAll').onclick = () => { NOTIFS = []; renderNotifs(); };

/* lock */
drag(lockEl, {
  filter: e => !e.target.closest('button,.notif'),
  move: (dx, dy) => S.lock.set(clamp(-dy / 560, 0, 1)),
  end: (dx, dy, moved, vx, vy) => {
    if (!moved) { unlock(); return; }
    const l = S.lock.v;
    if (l > .35 || vy < -600) unlock(-vy / 560); else S.lock.to(0, -vy / 560, { k: 200, z: .9 });
  }
});
$$('[data-lk]').forEach(b => b.innerHTML = ico(b.dataset.lk === 'phone' ? 'phone' : 'camera'));
$$('[data-lk]').forEach(b => b.onclick = () => { unlock(); setTimeout(() => openApp(b.dataset.lk, null), 250); });
$('#lkIc').innerHTML = ico('lock');

/* home gesture bar */
drag($('#gesture'), {
  begin: () => { if (current) { current.o = originOf(current.from); } },
  move: (dx, dy) => {
    if (S.pan.t > .5) return;
    if (current) { current.fx = dx * .9; current.fy = Math.min(0, dy) * .15; S.app.set(clamp(1 + Math.min(0, dy) / 520, .12, 1)); }
    else if (S.lock.t < .5) S.lock.set(clamp(-dy / 560, 0, 1));
  },
  end: (dx, dy, moved, vx, vy) => {
    if (!moved) { goHome(); return; }
    if (S.pan.t > .5) { S.pan.to(0, 0); return; }
    if (current) {
      const a = S.app.v;
      if (a < .72 || vy < -500) closeApp(vy / 520);
      else { S.app.to(1, 0, { k: 300, z: .85 }); relaxOffsets(current); }
    } else if (S.lock.t < .5) { if (S.lock.v > .3 || vy < -600) unlock(-vy / 560); else S.lock.to(0); }
  }
});
function relaxOffsets(c) {
  const t0 = performance.now(), fx0 = c.fx, fy0 = c.fy;
  (function s(now) { const t = clamp((now - t0) / 380, 0, 1), e = 1 - Math.pow(1 - t, 3); c.fx = fx0 * (1 - e); c.fy = fy0 * (1 - e); if (current === c) layout(); if (t < 1) requestAnimationFrame(s); })(t0);
}

/* panel */
drag($('#status'), {
  move: (dx, dy) => { S.pan.set(clamp(dy / 460, 0, 1)); },
  end: (dx, dy, moved, vx, vy) => {
    if (!moved) { S.pan.to(S.pan.t > .5 ? 0 : 1, 0, { k: 220, z: .88 }); return; }
    const open = S.pan.v > .35 || vy > 600; S.pan.to(open ? 1 : 0, vy / 460, { k: 220, z: .88 });
  }
});
drag(panelEl, {
  filter: e => S.pan.t > .5 && !e.target.closest('.slider,.tile,.notif,button'),
  move: (dx, dy) => S.pan.set(clamp(1 + dy / 460, 0, 1)),
  end: (dx, dy, moved, vx, vy) => {
    if (!moved) { S.pan.to(0); return; }
    const close = S.pan.v < .65 || vy < -600; S.pan.to(close ? 0 : 1, vy / 460, { k: 220, z: .88 });
  }
});
$('.handle').onclick = () => S.pan.to(0);

const TILES = [['wifi', 'Wi-Fi', 1], ['bt', 'Bluetooth', 1], ['moon', 'Do not disturb', 0], ['torch', 'Torch', 0], ['rotate', 'Auto rotate', 1], ['clock', 'Timer', 0], ['moon', 'Dark mode', 0], ['batt', 'Power saving', 0]];
function buildPanel() {
  $('#tiles').innerHTML = TILES.map((t, i) => `<button class="tile ${t[2] ? 'on' : ''}" data-i="${i}"><span class="glass lens">${ico(t[0])}</span>${t[1]}</button>`).join('');
  $('#tiles').addEventListener('click', e => {
    const t = e.target.closest('.tile'); if (!t) return; t.classList.toggle('on');
    if (t.dataset.i === '6') setTheme(t.classList.contains('on') ? 'dark' : 'light');
    if (t.dataset.i === '5') { if (t.classList.contains('on')) startTimer(300); else stopTimer(); }
  });
  $('[data-p=theme]').innerHTML = ico('sun'); $('[data-p=settings]').innerHTML = ico('gear'); $('[data-p=power]').innerHTML = ico('power');
  $('[data-p=theme]').onclick = () => setTheme(screen.dataset.theme === 'dark' ? 'light' : 'dark');
  $('[data-p=settings]').onclick = () => { S.pan.to(0); setTimeout(() => { if (!current) openApp('settings', null); }, 180); };
  $('[data-p=power]').onclick = () => relock();
  $('#bright .sico').innerHTML = ico('sun');
  slider($('#bright'), { v: .85, input: v => { bdim.style.opacity = (1 - v) * .55; } });
}
function syncTheme() {
  const dark = screen.dataset.theme === 'dark';
  $$('.tile')[6]?.classList.toggle('on', dark);
  $('[data-p=theme]').innerHTML = ico(dark ? 'moon' : 'sun');
}

/* island */
let islFull = false, peek = null, peekT = 0;
const T = { on: false, end: 0, total: 300 };
function islUpdate() {
  const k = peek ? 'msg' : (M.playing ? 'music' : (T.on ? 'timer' : 'music'));
  const s = peek ? 'peek' : islFull ? 'full' : (M.playing || T.on) ? 'mini' : '';
  isl.dataset.k = k; isl.dataset.s = s; isl.dataset.v = s ? s + '-' + k : '';
  const [w, h, r] = ISL_SIZES[s ? s + '/' + (s === 'peek' ? '' : k) : ''] || ISL_SIZES[''];
  IS.w.to(w); IS.h.to(h); IS.r.to(r);
}
const ISL_SIZES = { '': [26, 26, 14], 'mini/music': [124, 26, 14], 'mini/timer': [104, 26, 14], 'full/music': [352, 138, 42], 'full/timer': [312, 76, 38], 'peek/': [332, 68, 34] };
/* The island is sprung in JS (not a CSS transition) so its glass can follow the live size:
   every frame the lens map + strength are rebuilt from the current width/height/radius. */
const IS = { w: new Spring(26, { k: 460, z: .56, eps: .06 }), h: new Spring(26, { k: 460, z: .56, eps: .06 }), r: new Spring(14, { k: 460, z: .85, eps: .06 }) };
const islGl = $('#isl .gl');
const islE = { el: islGl, id: 'rf-isl-0', url: null, filterEl: null, w: 0, h: 0, base: 40, k: '' };
function islApply() {
  const w = Math.max(20, IS.w.v), h = Math.max(20, IS.h.v), r = Math.min(IS.r.v, h / 2);
  isl.style.width = w.toFixed(1) + 'px'; isl.style.height = h.toFixed(1) + 'px'; isl.style.borderRadius = r.toFixed(1) + 'px';
  lensIsland(Math.round(w), Math.round(h), r);
}
const islMaps = new Map();
function lensIsland(w, h, r) {
  const key = w + 'x' + h + '/' + tier + '/' + refrAmt;
  if (key === islE.k) return; islE.k = key;
  if (!rfWants()) { if (islE.url) { islE.url = null; writeFilter(islE); } return; }
  const bezel = Math.min(r * 1.2, Math.min(w, h) * .38);
  islE.base = Math.min(84, 22 + bezel * 2.2); islE.w = w; islE.h = h;
  // maps are smooth, so build them at quantised sizes and cache (the filter itself still uses the exact size)
  const qw = Math.max(8, Math.round(w / 8) * 8), qh = Math.max(8, Math.round(h / 6) * 6), qr = Math.min(Math.round(r / 2) * 2, qw / 2, qh / 2);
  const mk = qw + 'x' + qh + 'x' + qr;
  let url = islMaps.get(mk);
  if (!url) { url = buildMap(qw, qh, qr, Math.min(qr * 1.2, Math.min(qw, qh) * .38), 'rrect', 80); islMaps.set(mk, url); }
  islE.url = url;
  islE.id = islE.id === 'rf-isl-0' ? 'rf-isl-1' : 'rf-isl-0';   // ping-pong ids so Chrome re-reads the filter each frame
  writeFilter(islE);
}
function islLensDirty() { islE.k = ''; if (typeof layout === 'function') layout(); }
function islRing() { isl.dataset.ring = '1'; setTimeout(() => isl.removeAttribute('data-ring'), 650); }
function peekMsg(who, text) {
  $('#iWho').textContent = who; $('#iTxt').textContent = text; $('#iAv').textContent = who[0];
  peek = { who, text }; islFull = false; islUpdate(); islRing();
  clearTimeout(peekT); peekT = setTimeout(() => { peek = null; islUpdate(); }, 4600);
}
function syncTimerTile() { $$('.tile')[5]?.classList.toggle('on', T.on); }
function startTimer(sec = 300) { T.on = true; T.total = sec; T.end = performance.now() + sec * 1000; islUpdate(); timerTick(); islRing(); }
function stopTimer() { T.on = false; islFull = false; islUpdate(); syncTimerTile(); }
function timerTick() {
  if (!T.on) return;
  const left = Math.max(0, T.end - performance.now());
  $$('.tmT').forEach(e => e.textContent = fmt(Math.ceil(left / 1000)));
  $$('.tmRg').forEach(e => e.style.setProperty('--p', ((1 - left / (T.total * 1000)) * 100) + '%'));
  if (left <= 0) { T.on = false; islUpdate(); syncTimerTile(); peekMsg('Timer', 'Time is up'); }
}
setInterval(timerTick, 250);
$('#tmStop').addEventListener('click', e => { e.stopPropagation(); stopTimer(); });
isl.addEventListener('click', e => {
  if (e.target.closest('button')) return;
  if (peek) { peek = null; clearTimeout(peekT); islUpdate(); if (!current && S.lock.v > .9) openApp('messages', null); return; }
  islFull = !islFull; islUpdate();
});
addEventListener('pointerdown', e => { if (islFull && !e.target.closest('#isl')) { islFull = false; islUpdate(); } }, true);

/* media actions (delegated) */
document.addEventListener('click', e => {
  const a = e.target.closest('[data-act]')?.dataset.act; if (!a) return;
  if (a === 'play') M.playing = !M.playing;
  else { M.i = (M.i + (a === 'next' ? 1 : TR.length - 1)) % TR.length; M.pos = 0; M.playing = true; }
  mUpdate();
});

/* app launch */
document.addEventListener('click', e => { const b = e.target.closest('[data-app]'); if (b && S.lock.v >= .9 && !current && S.pan.v < .05) openApp(b.dataset.app, b.querySelector('.ic') || b); });

/* pointer-follow specular glow on glass */
let lastG = null;
screen.addEventListener('pointermove', e => {
  const g = e.target.closest('.glass');
  if (lastG && lastG !== g) lastG.style.setProperty('--gl', 0);
  if (g) { const r = g.getBoundingClientRect(); g.style.setProperty('--mx', `${e.clientX - r.left}px`); g.style.setProperty('--my', `${e.clientY - r.top}px`); g.style.setProperty('--gl', 1); }
  lastG = g;
});
screen.addEventListener('pointerleave', () => { lastG && lastG.style.setProperty('--gl', 0); lastG = null; });

addEventListener('keydown', e => {
  if (e.key === 'Escape') goHome();
  if ((e.key === 'Enter' || e.key === ' ') && S.lock.t < .5 && !e.target.closest('input')) unlock();
});

/* ============================================================
   refraction filter (liquid glass lens) — Chromium
   ============================================================ */
/* ---- lens refraction engine (ported from the silicon wafer glass experiment) ----
   Per-element displacement map built from a signed-distance bezel profile, with
   optional chromatic aberration. SVG backdrop filters are Chromium-only and
   software rendered, so there are tiers: 0 Lite (no filter) · 1 Balanced · 2 Max (RGB split) */
const chromium = /Chrome\/\d+/.test(navigator.userAgent);
const rfDefs = $('#svgdefs');
const refractors = new Map();
let rfN = 0, refrAmt = store.get('refr2', .85), tier = chromium ? store.get('tier', 1) : 0;

function buildMap(w, h, r, bezel, shape, maxDim = 192) {
  const k = Math.min(1, maxDim / Math.max(w, h));
  const cw = Math.max(2, Math.round(w * k)), ch = Math.max(2, Math.round(h * k));
  const canvas = document.createElement('canvas'); canvas.width = cw; canvas.height = ch;
  const ctx = canvas.getContext('2d', { willReadFrequently: true }), img = ctx.createImageData(cw, ch), data = img.data;
  const hx = w / 2 - r, hy = h / 2 - r;
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const dx = (x + .5) / k - w / 2, dy = (y + .5) / k - h / 2;
    let d, nx, ny;
    if (shape === 'circle') { const len = Math.hypot(dx, dy) || 1; d = len - w / 2; nx = dx / len; ny = dy / len; }
    else {
      const ax = Math.abs(dx) - hx, ay = Math.abs(dy) - hy, ox = Math.max(ax, 0), oy = Math.max(ay, 0), out = Math.hypot(ox, oy);
      d = out + Math.min(Math.max(ax, ay), 0) - r;
      if (out > 0) { nx = Math.sign(dx) * ox / out; ny = Math.sign(dy) * oy / out; }
      else if (ax > ay) { nx = Math.sign(dx); ny = 0; } else { nx = 0; ny = Math.sign(dy); }
    }
    const depth = -d; let m = 0;
    if (depth > 0 && depth < bezel) m = Math.pow(1 - depth / bezel, 1.7);
    const i = (y * cw + x) * 4;
    data[i] = 128 + 127 * (-nx * m); data[i + 1] = 128 + 127 * (-ny * m); data[i + 2] = 128; data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
}
const rfWants = () => chromium && tier > 0 && refrAmt > 0;
function writeFilter(e) {
  e.filterEl = null; e.el.style.removeProperty('--lf'); delete e.el.dataset.lens;
  document.getElementById(e.id)?.remove();
  if (!e.url || !rfWants()) return;
  const s = e.base * refrAmt;
  const dm = (res, sc) => `<feDisplacementMap in="SourceGraphic" in2="map" scale="${sc.toFixed(2)}" xChannelSelector="R" yChannelSelector="G" result="${res}"/>`;
  const body = tier >= 2
    ? dm('dr', s) + '<feColorMatrix in="dr" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>' +
      dm('dg', s * .93) + '<feColorMatrix in="dg" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>' +
      dm('db', s * .86) + '<feColorMatrix in="db" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"/>' +
      '<feBlend in="r" in2="g" mode="screen" result="rg"/><feBlend in="rg" in2="b" mode="screen"/>'
    : dm('d', s);
  rfDefs.insertAdjacentHTML('beforeend', `<filter id="${e.id}" filterUnits="userSpaceOnUse" x="0" y="0" width="${e.w}" height="${e.h}" color-interpolation-filters="sRGB">
    <feImage href="${e.url}" x="0" y="0" width="${e.w}" height="${e.h}" preserveAspectRatio="none" result="map"/>${body}</filter>`);
  e.filterEl = document.getElementById(e.id);
  e.el.style.setProperty('--lf', `url(#${e.id})`); e.el.dataset.lens = '';
}
function rebuildLens(e) {
  const w = e.el.offsetWidth, h = e.el.offsetHeight; if (!w || !h) return;
  const br = getComputedStyle(e.el).borderTopLeftRadius, v = parseFloat(br) || 20;
  const pct = br.includes('%'); let r = pct ? v / 100 * Math.min(w, h) : v;
  r = Math.min(r, w / 2, h / 2);
  e.shape = (pct && v >= 50 && Math.abs(w - h) < 2) ? 'circle' : 'rrect';
  const bezel = e.shape === 'circle' ? w * .22 : Math.min(r * 1.2, Math.min(w, h) * .38);
  e.base = Math.min(84, 22 + bezel * 2.2);
  e.w = w; e.h = h; e.url = buildMap(w, h, e.shape === 'circle' ? w / 2 : r, bezel, e.shape);
  writeFilter(e);
}
function setRefraction(v) {
  refrAmt = v; store.set("refr2", v); islLensDirty();
  refractors.forEach(e => {
    if (!!e.filterEl !== rfWants()) { writeFilter(e); return; }
    if (!e.filterEl) return;
    const maps = $$('feDisplacementMap', e.filterEl), s = e.base * refrAmt;
    [1, .93, .86].forEach((f, i) => maps[i] && maps[i].setAttribute('scale', (s * f).toFixed(2)));
  });
}
function setTier(t) { tier = t; store.set("tier", t); refractors.forEach(writeFilter); islLensDirty(); }
const lensRO = new ResizeObserver(es => es.forEach(en => {
  const e = refractors.get(en.target); if (!e) return;
  clearTimeout(e.t); e.t = setTimeout(() => rebuildLens(e), e.url ? 150 : 0);
}));
function attachLens(el) {
  if (refractors.has(el) || el.closest("#isl")) return;
  const e = { el, id: 'rf-' + (++rfN), t: 0, url: null, filterEl: null, w: 0, h: 0, shape: 'rrect', base: 48 };
  refractors.set(el, e); lensRO.observe(el); rebuildLens(e);
}
function detachLens(el) {
  const e = refractors.get(el); if (!e) return;
  clearTimeout(e.t); document.getElementById(e.id)?.remove(); refractors.delete(el); lensRO.unobserve(el);
}
function buildLens() {
  if (!chromium) return;
  document.documentElement.classList.add('refract');
  const scan = (n, fn) => { if (n.nodeType !== 1) return; if (n.matches('.glass')) fn(n); n.querySelectorAll('.glass').forEach(fn); };
  scan(screen, attachLens);
  new MutationObserver(ms => ms.forEach(r => { r.addedNodes.forEach(n => scan(n, attachLens)); r.removedNodes.forEach(n => scan(n, detachLens)); })).observe(screen, { childList: true, subtree: true });
}


/* ============================================================
   boot
   ============================================================ */
screen.dataset.theme = store.get('theme', 'light');
screen.dataset.wp = store.get('wp', 0);
screen.style.setProperty('--acc', store.get('acc', '#3e91ff'));
screen.style.setProperty('--gblur', `${4 + store.get('blur', .45) * 36}px`);
buildLens(); buildHome(); buildPanel(); renderNotifs(); tick(); setInterval(tick, 1000);
$$('.sbr .batt').forEach(() => {});
mUpdate(); syncTheme(); layout();
