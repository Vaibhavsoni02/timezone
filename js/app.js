(() => {
  "use strict";

  const MAX_ZONES = 10;
  const STORAGE_KEYS = { zones: "fio_zones", format: "fio_format", geo: "fio_geo", homeLabel: "fio_home_label" };

  const els = {
    grid: document.getElementById("cardGrid"),
    addZoneBtn: document.getElementById("addZoneBtn"),
    formatToggle: document.getElementById("formatToggle"),
    overlay: document.getElementById("modalOverlay"),
    modalClose: document.getElementById("modalClose"),
    search: document.getElementById("citySearch"),
    results: document.getElementById("resultsList"),
    enableLocationBtn: document.getElementById("enableLocationBtn"),
  };

  /** @type {{id:string, name:string, timezone:string, district:string, districtCode:string, _country:{_id:string,name:string,iso3:string}, label:string}[]} */
  let zones = [];
  let format = "12h"; // "12h" | "24h"
  let yourZone = null; // browser-detected local zone — always the first, locked column
  let homeLabel = ""; // optional custom label for the home column
  let geo = null; // { label } from local timezone / city guess, once the user opts in
  const cardRefs = new Map(); // id -> { root, hm, ampm, date, footer, input }
  let homeRef = null;

  // ---------------- storage (chrome.storage with localStorage fallback) ----------------
  const store = {
    get(keys) {
      return new Promise((resolve) => {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
          chrome.storage.local.get(keys, resolve);
        } else {
          const out = {};
          for (const k of keys) {
            const raw = localStorage.getItem(k);
            if (raw != null) {
              try { out[k] = JSON.parse(raw); } catch { out[k] = raw; }
            }
          }
          resolve(out);
        }
      });
    },
    set(obj) {
      return new Promise((resolve) => {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
          chrome.storage.local.set(obj, resolve);
        } else {
          for (const k in obj) localStorage.setItem(k, JSON.stringify(obj[k]));
          resolve();
        }
      });
    },
  };

  function uid() {
    return (crypto.randomUUID ? crypto.randomUUID() : `z-${Date.now()}-${Math.random().toString(16).slice(2)}`);
  }

  // Convert a FIO_CITIES record into the shape stored in `zones` (adds our own
  // instance bookkeeping — label — while keeping every field from the source city).
  function zoneFromCity(city) {
    return {
      id: city._id,
      name: city.name,
      timezone: city.timezone,
      district: city.district || "",
      districtCode: city.districtCode || "",
      _country: city._country
        ? { _id: city._country._id, name: city._country.name, iso3: city._country.iso3 }
        : { _id: "", name: "", iso3: "" },
      label: "",
    };
  }

  function guessLocalCity() {
    let tz = "UTC";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"; } catch { /* noop */ }
    const known = FIO_CITIES.find((c) => c.timezone === tz);
    if (known) return zoneFromCity(known);
    const parts = tz.split("/");
    const name = (parts[parts.length - 1] || tz).replace(/_/g, " ");
    const region = parts.length > 1 ? parts[0].replace(/_/g, " ") : "Local time";
    return { id: `local-${tz}`, name, timezone: tz, district: "", districtCode: "", _country: { _id: "", name: region, iso3: "" }, label: "" };
  }

  function defaultZones() {
    // The user's own zone is always shown as the locked home column, so seed
    // the list with a few useful examples instead of duplicating it here.
    const wanted = ["America/New_York", "Europe/London", "Asia/Tokyo"];
    const picks = [];
    for (const tz of wanted) {
      const match = FIO_CITIES.find((c) => c.timezone === tz);
      if (match) picks.push(zoneFromCity(match));
    }
    return picks.slice(0, MAX_ZONES);
  }

  // ---------------- color engine: hour-of-day -> gradient ----------------
  // One [top, bottom] hex pair per hour (0-23), lifted from FIO's own per-hour
  // gradient table so the "colors uniquely show the time of day" effect matches.
  const HOUR_GRADIENTS = [
    ["#030C1B", "#080923"], ["#030C1B", "#030C1B"], ["#040F22", "#030C1B"], ["#081C34", "#040F22"],
    ["#215366", "#081C34"], ["#398A97", "#215366"], ["#59B8BC", "#398A97"], ["#92CDBC", "#59B8BC"],
    ["#CBE1BC", "#92CDBC"], ["#F1EDB3", "#CBE1BC"], ["#F5EA9A", "#F1EDB3"], ["#FAE780", "#F5EA9A"],
    ["#FEE467", "#FAE780"], ["#FAC961", "#FEE467"], ["#F6AF5A", "#FAC961"], ["#F19554", "#F6AF5A"],
    ["#CA765E", "#F19554"], ["#98576E", "#CA765E"], ["#65387E", "#98576E"], ["#45246C", "#65387E"],
    ["#2B134F", "#45246C"], ["#100233", "#2B134F"], ["#0C062B", "#100233"], ["#080923", "#0C062B"],
  ];

  function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function lerpColor(c1, c2, t) {
    return [Math.round(lerp(c1[0], c2[0], t)), Math.round(lerp(c1[1], c2[1], t)), Math.round(lerp(c1[2], c2[2], t))];
  }

  function gradientForHour(hourFloat) {
    const h = ((hourFloat % 24) + 24) % 24;
    const i = Math.floor(h);
    const t = h - i;
    const a = HOUR_GRADIENTS[i];
    const b = HOUR_GRADIENTS[(i + 1) % 24];
    return {
      top: lerpColor(hexToRgb(a[0]), hexToRgb(b[0]), t),
      bottom: lerpColor(hexToRgb(a[1]), hexToRgb(b[1]), t),
    };
  }

  function rgb(c) { return `rgb(${c[0]}, ${c[1]}, ${c[2]})`; }

  // pick readable text color (near-black or near-white) against a given rgb bg
  function contrastText(c) {
    const luminance = (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]) / 255;
    return luminance > 0.6 ? "#1a1a1a" : "#FBFBFB";
  }

  // ---------------- time parts per IANA zone ----------------
  const dtfCache = new Map();
  function getFormatter(tz) {
    if (dtfCache.has(tz)) return dtfCache.get(tz);
    let f;
    try {
      f = new Intl.DateTimeFormat("en-US", {
        timeZone: tz, hour12: false, year: "numeric", month: "short", day: "numeric",
        weekday: "short", hour: "2-digit", minute: "2-digit", second: "2-digit",
        timeZoneName: "shortOffset",
      });
    } catch {
      f = new Intl.DateTimeFormat("en-US", {
        timeZone: tz, hour12: false, year: "numeric", month: "short", day: "numeric",
        weekday: "short", hour: "2-digit", minute: "2-digit", second: "2-digit",
      });
    }
    dtfCache.set(tz, f);
    return f;
  }

  function getZoneSnapshot(tz, now) {
    const parts = getFormatter(tz).formatToParts(now);
    const map = {};
    for (const p of parts) map[p.type] = p.value;
    const hour = Number(map.hour) % 24;
    const minute = Number(map.minute);
    const second = Number(map.second);
    return {
      hour, minute, second,
      hourFloat: hour + minute / 60 + second / 3600,
      weekday: map.weekday, day: Number(map.day),
    };
  }

  function formatClock(snap) {
    if (format === "24h") {
      return { main: `${String(snap.hour).padStart(2, "0")}:${String(snap.minute).padStart(2, "0")}`, ampm: "" };
    }
    let h12 = snap.hour % 12; if (h12 === 0) h12 = 12;
    return { main: `${h12}:${String(snap.minute).padStart(2, "0")}`, ampm: snap.hour >= 12 ? "pm" : "am" };
  }

  function ordinal(n) {
    const rem100 = n % 100;
    if (rem100 >= 11 && rem100 <= 13) return `${n}th`;
    switch (n % 10) {
      case 1: return `${n}st`;
      case 2: return `${n}nd`;
      case 3: return `${n}rd`;
      default: return `${n}th`;
    }
  }

  // live "EDT" / "PST" / "AEST"-style abbreviation, when the platform's ICU data has one
  const abbrCache = new Map();
  function getAbbrFormatter(tz) {
    if (abbrCache.has(tz)) return abbrCache.get(tz);
    let f = null;
    try {
      f = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "short", hour: "2-digit" });
    } catch { /* unsupported zone, ignore */ }
    abbrCache.set(tz, f);
    return f;
  }
  function getLiveAbbr(tz, now) {
    const f = getAbbrFormatter(tz);
    if (!f) return "";
    const part = f.formatToParts(now).find((p) => p.type === "timeZoneName");
    const val = part ? part.value : "";
    // Skip generic "GMT+5:30"-style fallbacks — not a real abbreviation.
    return /\d/.test(val) ? "" : val;
  }

  // "(UTC-05:00)"-style offset, used to sort the Add-place list and compute
  // each column's offset relative to home — same format Slack/Outlook/Windows use.
  const utcOffsetCache = new Map();
  function getUtcOffsetFormatter(tz) {
    if (utcOffsetCache.has(tz)) return utcOffsetCache.get(tz);
    let f = null;
    try {
      f = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "longOffset", hour: "2-digit" });
    } catch {
      try {
        f = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "shortOffset", hour: "2-digit" });
      } catch { /* unsupported zone, ignore */ }
    }
    utcOffsetCache.set(tz, f);
    return f;
  }
  function getUtcOffset(tz, now) {
    const f = getUtcOffsetFormatter(tz);
    const raw = f ? (f.formatToParts(now).find((p) => p.type === "timeZoneName") || {}).value || "" : "";
    const m = raw.replace("GMT", "UTC").match(/UTC([+-])(\d{1,2})(?::(\d{2}))?/);
    const sign = m ? m[1] : "+";
    const hh = m ? Number(m[2]) : 0;
    const mm = m ? Number(m[3] || 0) : 0;
    const minutes = (sign === "-" ? -1 : 1) * (hh * 60 + mm);
    const label = `UTC${sign}${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
    return { minutes, label };
  }

  function formatOffsetDiff(diffHours) {
    if (Math.abs(diffHours) < 0.01) return "0";
    let s = diffHours.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
    if (diffHours > 0) s = "+" + s;
    return s;
  }

  // ---------------- rendering: full-bleed columns ----------------
  function zoneDisplayName(z) {
    const abbr = getLiveAbbr(z.timezone, new Date());
    return abbr ? `${z.name} (${abbr})` : z.name;
  }

  function homeDisplayName() {
    if (geo && geo.label) {
      const abbr = getLiveAbbr(yourZone.timezone, new Date());
      return abbr ? `${geo.label} (${abbr})` : geo.label;
    }
    return zoneDisplayName(yourZone);
  }

  function buildZoneCol(zone, isHome) {
    const root = document.createElement("div");
    root.className = "zone-col" + (isHome ? " home" : "");
    root.draggable = !isHome;
    if (!isHome) root.dataset.id = zone.id;

    root.innerHTML = `
      ${isHome ? "" : `<button class="remove-btn" title="Remove">✕</button>`}
      <div class="clock"><span class="hm"></span><span class="ampm"></span></div>
      <div class="date-line"></div>
      <hr class="divider" />
      <input class="city-input" type="text" spellcheck="false" title="Click to rename — add a person or project name" />
      <div class="col-footer"></div>
    `;

    const input = root.querySelector(".city-input");
    input.addEventListener("click", (e) => e.stopPropagation());
    input.addEventListener("mousedown", (e) => e.stopPropagation());

    if (isHome) {
      input.value = homeLabel || homeDisplayName();
      const commit = () => {
        const val = input.value.trim();
        const fallback = homeDisplayName();
        const newLabel = val && val !== fallback ? val : "";
        if (newLabel !== homeLabel) { homeLabel = newLabel; persist(); }
        input.value = homeLabel || homeDisplayName();
      };
      input.addEventListener("blur", commit);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); input.blur(); }
        if (e.key === "Escape") { input.value = homeLabel || homeDisplayName(); input.blur(); }
      });
    } else {
      root.querySelector(".remove-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        removeZone(zone.id);
      });

      input.value = zone.label || zoneDisplayName(zone);
      const commit = () => {
        const val = input.value.trim();
        const fallback = zoneDisplayName(zone);
        const newLabel = val && val !== fallback ? val : "";
        if (newLabel !== (zone.label || "")) { zone.label = newLabel; persist(); }
        input.value = zone.label || zoneDisplayName(zone);
      };
      input.addEventListener("blur", commit);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); input.blur(); }
        if (e.key === "Escape") { input.value = zone.label || zoneDisplayName(zone); input.blur(); }
      });

      root.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", zone.id);
        e.dataTransfer.effectAllowed = "move";
      });
      root.addEventListener("dragover", (e) => {
        e.preventDefault();
        root.classList.add("drag-over");
      });
      root.addEventListener("dragleave", () => root.classList.remove("drag-over"));
      root.addEventListener("drop", (e) => {
        e.preventDefault();
        root.classList.remove("drag-over");
        const draggedId = e.dataTransfer.getData("text/plain");
        reorderZones(draggedId, zone.id);
      });
    }

    const ref = {
      root,
      hm: root.querySelector(".hm"),
      ampm: root.querySelector(".ampm"),
      date: root.querySelector(".date-line"),
      footer: root.querySelector(".col-footer"),
      input,
    };
    if (isHome) homeRef = ref;
    else cardRefs.set(zone.id, ref);

    return root;
  }

  function renderColumns() {
    els.grid.innerHTML = "";
    cardRefs.clear();
    homeRef = null;

    els.grid.appendChild(buildZoneCol(null, true));
    for (const zone of zones) {
      els.grid.appendChild(buildZoneCol(zone, false));
    }

    tick(); // paint immediately, don't wait for next second
  }

  function paintColumn(ref, tz, now, footerText) {
    const snap = getZoneSnapshot(tz, now);
    const clock = formatClock(snap);
    const grad = gradientForHour(snap.hourFloat);
    // sample the gradient near where the text sits (~30% down) for contrast
    const textColor = contrastText(lerpColor(grad.top, grad.bottom, 0.3));

    ref.hm.textContent = clock.main;
    ref.ampm.textContent = clock.ampm;
    ref.date.textContent = `${snap.weekday}. ${ordinal(snap.day)}`;
    ref.footer.textContent = footerText;
    ref.root.style.background = `linear-gradient(to bottom, ${rgb(grad.top)}, ${rgb(grad.bottom)})`;
    ref.root.style.color = textColor;
  }

  function tick() {
    const now = new Date();

    if (homeRef && yourZone) {
      paintColumn(homeRef, yourZone.timezone, now, "🏠");
      if (document.activeElement !== homeRef.input) homeRef.input.value = homeLabel || homeDisplayName();
    }

    const homeOffsetMin = yourZone ? getUtcOffset(yourZone.timezone, now).minutes : 0;

    for (const zone of zones) {
      const ref = cardRefs.get(zone.id);
      if (!ref) continue;
      const diffHours = (getUtcOffset(zone.timezone, now).minutes - homeOffsetMin) / 60;
      paintColumn(ref, zone.timezone, now, formatOffsetDiff(diffHours));
      if (document.activeElement !== ref.input) ref.input.value = zone.label || zoneDisplayName(zone);
    }
  }

  // ---------------- zone mutations ----------------
  async function persist() {
    await store.set({
      [STORAGE_KEYS.zones]: zones,
      [STORAGE_KEYS.format]: format,
      [STORAGE_KEYS.homeLabel]: homeLabel,
    });
  }

  function addZone(city) {
    if (zones.length >= MAX_ZONES) return;
    if (zones.some((z) => z.timezone === city.timezone)) return;
    zones.push(zoneFromCity(city));
    persist();
    renderColumns();
  }

  function removeZone(id) {
    zones = zones.filter((z) => z.id !== id);
    persist();
    renderColumns();
  }

  function reorderZones(draggedId, targetId) {
    if (draggedId === targetId) return;
    const from = zones.findIndex((z) => z.id === draggedId);
    const to = zones.findIndex((z) => z.id === targetId);
    if (from === -1 || to === -1) return;
    const [moved] = zones.splice(from, 1);
    zones.splice(to, 0, moved);
    persist();
    renderColumns();
  }

  // ---------------- modal / search (comprehensive Slack/Windows-style list) ----------------
  function openModal() {
    els.overlay.hidden = false;
    els.search.value = "";
    renderTZList();
    setTimeout(() => els.search.focus(), 30);
  }

  function closeModal() { els.overlay.hidden = true; }

  function findAbbrMatches(q) {
    const upper = q.toUpperCase().trim();
    if (!upper) return [];
    const hits = [];
    for (const key of Object.keys(FIO_ABBR_MAP)) {
      if (key === upper || (upper.length >= 2 && key.startsWith(upper))) {
        for (const entry of FIO_ABBR_MAP[key]) {
          const match = FIO_CITIES.find((c) => c.timezone === entry.tz);
          if (match) hits.push({ key, label: entry.label, city: match });
        }
      }
    }
    return hits;
  }

  function buildSearchRow(city, opts = {}) {
    const now = new Date();
    const addedTz = new Set(zones.map((z) => z.timezone));
    const atMax = zones.length >= MAX_ZONES;
    const alreadyAdded = addedTz.has(city.timezone);
    const { label } = getUtcOffset(city.timezone, now);
    const timeName = `${city.name} Time`;
    const abbr = getLiveAbbr(city.timezone, now);
    const districtPart = city.district
      ? (city.districtCode ? `${city.district} (${city.districtCode})` : city.district)
      : "";
    const place = [districtPart, city._country && city._country.name].filter(Boolean).join(", ");
    const sub = opts.subtitleOverride
      || (alreadyAdded ? "Already added" : [place, abbr].filter(Boolean).join(" · "))
      || city.timezone.replace(/_/g, " ");

    const item = document.createElement("div");
    item.className = "result-item" + (alreadyAdded || atMax ? " disabled" : "");
    item.innerHTML = `
      <span class="flag">${cityFlag(city)}</span>
      <span class="rmeta">
        <span class="rcity">(${label}) ${escapeHtml(timeName)}</span>
        <span class="rsub">${escapeHtml(sub)}</span>
      </span>
    `;
    if (!alreadyAdded && !atMax) {
      item.addEventListener("click", () => { addZone(city); closeModal(); });
    }
    return item;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }

  function renderTZList() {
    els.results.innerHTML = "";
    const now = new Date();
    const query = els.search.value.trim();
    const q = query.toLowerCase();

    // keyed by timezone only for the abbreviation overlay — FIO_CITIES itself
    // is NOT deduped by timezone, since several cities intentionally share one
    // (New York/Boston/Miami all America/New_York, etc.) and should all show up.
    const abbrHitMap = new Map();
    if (query) {
      for (const hit of findAbbrMatches(query)) {
        if (!abbrHitMap.has(hit.city.timezone)) abbrHitMap.set(hit.city.timezone, hit);
      }
    }

    const matchesQuery = (c) => !query ||
      c.name.toLowerCase().includes(q) ||
      (c.district && c.district.toLowerCase().includes(q)) ||
      (c.districtCode && c.districtCode.toLowerCase().includes(q)) ||
      (c._country && c._country.name.toLowerCase().includes(q)) ||
      c.timezone.toLowerCase().includes(q.replace(/\s/g, "_"));

    const entries = FIO_CITIES.filter((c) => matchesQuery(c) || abbrHitMap.has(c.timezone));

    if (entries.length === 0) {
      els.results.innerHTML = `<div class="no-results">No matching time zone. Try a city or a code like PST, IST, AEST.</div>`;
      return;
    }

    // sort like Slack/Windows pickers: earliest offset first, then alphabetically
    const sorted = entries
      .map((c) => ({ city: c, offset: getUtcOffset(c.timezone, now).minutes }))
      .sort((a, b) => a.offset - b.offset || a.city.name.localeCompare(b.city.name));

    for (const { city } of sorted) {
      const hit = abbrHitMap.get(city.timezone);
      els.results.appendChild(buildSearchRow(city, hit ? { subtitleOverride: `${hit.key} · ${hit.label}` } : {}));
    }
  }

  // ---------------- local home label from browser timezone (no network) ----------------
  async function requestPreciseLocation() {
    const btn = els.enableLocationBtn;
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "…";
    try {
      yourZone = guessLocalCity();
      const country = yourZone._country && yourZone._country.name;
      const label = [yourZone.name, country].filter(Boolean).join(", ");
      geo = { label };
      await store.set({ [STORAGE_KEYS.geo]: geo });
    } finally {
      btn.disabled = false;
      btn.textContent = original;
      tick();
    }
  }

  // ---------------- format toggle ----------------
  function toggleFormat() {
    format = format === "12h" ? "24h" : "12h";
    els.formatToggle.textContent = format;
    persist();
    tick();
  }

  // ---------------- wiring ----------------
  els.addZoneBtn.addEventListener("click", openModal);
  els.modalClose.addEventListener("click", closeModal);
  els.overlay.addEventListener("click", (e) => { if (e.target === els.overlay) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !els.overlay.hidden) closeModal(); });
  els.search.addEventListener("input", () => renderTZList());
  els.formatToggle.addEventListener("click", toggleFormat);
  els.enableLocationBtn.addEventListener("click", requestPreciseLocation);

  async function init() {
    yourZone = guessLocalCity();

    const saved = await store.get([STORAGE_KEYS.zones, STORAGE_KEYS.format, STORAGE_KEYS.geo, STORAGE_KEYS.homeLabel]);
    zones = Array.isArray(saved[STORAGE_KEYS.zones]) && saved[STORAGE_KEYS.zones].length
      ? saved[STORAGE_KEYS.zones]
      : defaultZones();
    format = saved[STORAGE_KEYS.format] === "24h" ? "24h" : "12h";
    geo = saved[STORAGE_KEYS.geo] || null;
    homeLabel = saved[STORAGE_KEYS.homeLabel] || "";
    els.formatToggle.textContent = format;

    if (!Array.isArray(saved[STORAGE_KEYS.zones]) || !saved[STORAGE_KEYS.zones].length) {
      await persist();
    }

    renderColumns();
    setInterval(tick, 1000);
  }

  init();
})();
