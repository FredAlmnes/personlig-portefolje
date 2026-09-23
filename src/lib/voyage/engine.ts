/* ==========================================================================
   Seiltur-bakgrunn: Oslo -> Tenerife
   --------------------------------------------------------------------------
   - Elementet som sendes inn til initVoyage() må inneholde to <canvas>:
     .voyage-map (kart) og .voyage-overlay (rute, havner, båt).
   - Alle elementer med data-voyage="N" styrer animasjonen. Når midten av
     elementet står ved ankerlinja på skjermen, er animasjonen på steg N:
        0  = kloden snurrer
        1  = kloden har stoppet over Oslo
        2  = zoomet inn, båten ligger i Oslo
        3..11 = båten ligger i havn nr. 2..10 (Skagen ... Tenerife)
        12 = zoomet ut, hele ruta vises
     Mellom to steg glir animasjonen jevnt. Mangler data-voyage helt,
     følger den bare hvor langt ned på siden man har scrollet.
   - Kartdataene hentes fra /voyage/*.json etter at motoren har startet.
   ========================================================================== */
import {
  geoBounds,
  geoCentroid,
  geoDistance,
  geoGraticule,
  geoInterpolate,
  geoOrthographic,
  geoPath,
  type GeoContext,
  type GeoPermissibleObjects,
} from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type {
  Feature,
  FeatureCollection,
  Geometry,
  LineString,
  MultiLineString,
  Polygon,
  Position,
} from "geojson";

type LonLat = [number, number];
type Box = [number, number, number, number];
type Side = "r" | "l" | "b";
type Stop = { name: string; country: string; at: LonLat; side: Side };
type Sea = { name: string; at: LonLat; angle: number; size?: number };
type Palette = typeof PALETTES.day;
type LandFC = FeatureCollection<Geometry, { b?: Box } | null>;
type Tile = { b: Box; land: GeoPermissibleObjects; coast: MultiLineString };
type RestPoly = { c: LonLat; r: number; land: Feature<Polygon>; coast: MultiLineString };
type Camera = {
  rot: [number, number, number];
  k: number;
  tr: [number, number];
  boatD: number | null;
  leg: number;
  s: number;
  z: number;
  center: LonLat;
};

/* ------------------------------ KONFIG ------------------------------ */
const CONFIG = {
  stops: [
    { name: "Oslo", country: "Norge", at: [10.705, 59.898], side: "r" },
    { name: "Skagen", country: "Danmark", at: [10.61, 57.716], side: "r" },
    { name: "Amsterdam", country: "Nederland", at: [4.9, 52.382], side: "r" },
    { name: "Guernsey", country: "Kanaløyene", at: [-2.518, 49.456], side: "r" },
    { name: "A Coruña", country: "Spania", at: [-8.375, 43.373], side: "r" },
    { name: "Vigo", country: "Spania", at: [-8.742, 42.247], side: "r" },
    { name: "Porto", country: "Portugal", at: [-8.678, 41.147], side: "r" },
    { name: "Lisboa", country: "Portugal", at: [-9.14, 38.698], side: "r" },
    { name: "Faro", country: "Portugal", at: [-7.925, 36.995], side: "r" },
    { name: "Tenerife", country: "Kanariøyene", at: [-16.225, 28.465], side: "b" },
  ] as Stop[],
  // Veipunkter mellom havnene (lengdegrad, breddegrad), sjekket mot kystlinja.
  via: [
    [[10.68,59.875],[10.60,59.855],[10.54,59.82],[10.525,59.77],[10.53,59.73],[10.555,59.695],[10.595,59.66],[10.62,59.63],[10.63,59.60],[10.61,59.565],[10.58,59.53],[10.555,59.48],[10.54,59.43],[10.54,59.38],[10.56,59.30],[10.58,59.20],[10.60,59.00],[10.64,58.40],[10.74,57.90],[10.72,57.76],[10.67,57.725]],
    [[10.66,57.725],[10.70,57.755],[10.66,57.775],[10.50,57.79],[10.20,57.74],[9.90,57.69],[9.2,57.45],[8.3,57.1],[7.6,56.5],[7.3,55.5],[6.8,54.6],[5.5,53.9],[4.6,53.4],[4.30,52.90],[4.40,52.50],[4.54,52.463],[4.62,52.46],[4.70,52.435],[4.78,52.42],[4.84,52.405]],
    [[4.84,52.405],[4.78,52.42],[4.70,52.435],[4.62,52.46],[4.54,52.463],[4.30,52.40],[3.4,51.9],[2.3,51.35],[1.45,51.0],[0.5,50.55],[-0.8,50.25],[-1.8,49.9],[-2.35,49.60],[-2.45,49.50],[-2.505,49.462]],
    [[-2.51,49.44],[-2.60,49.40],[-3.5,49.2],[-5.0,48.75],[-5.5,48.35],[-6.0,47.3],[-7.5,45.5],[-8.3,44.2],[-8.42,43.52],[-8.39,43.44],[-8.37,43.40]],
    [[-8.37,43.40],[-8.43,43.435],[-8.60,43.42],[-9.0,43.40],[-9.40,43.10],[-9.45,42.80],[-9.10,42.30],[-8.95,42.215],[-8.85,42.225],[-8.78,42.242]],
    [[-8.78,42.242],[-8.85,42.225],[-8.97,42.15],[-9.00,41.80],[-8.85,41.35],[-8.76,41.20],[-8.70,41.155]],
    [[-8.72,41.14],[-8.80,41.10],[-9.15,40.50],[-9.45,39.70],[-9.65,39.35],[-9.62,38.80],[-9.42,38.64],[-9.33,38.672],[-9.25,38.688],[-9.18,38.694]],
    [[-9.18,38.694],[-9.25,38.686],[-9.33,38.670],[-9.42,38.62],[-9.35,38.40],[-9.00,37.80],[-9.10,37.10],[-8.95,36.90],[-8.40,36.975],[-8.05,36.975]],
    [[-7.96,36.992],[-8.01,36.975],[-8.04,36.94],[-8.30,36.60],[-10.5,34.3],[-13.2,31.0],[-15.2,29.2],[-16.0,28.62],[-16.10,28.52],[-16.18,28.49],[-16.21,28.472]],
  ] as LonLat[][],
  // Nordsjøkanalen inn til Amsterdam (for smal for kystdataene, tegnes som vann)
  canals: [[[4.54,52.463],[4.62,52.46],[4.70,52.435],[4.78,52.42],[4.84,52.405],[4.90,52.382]]] as LonLat[][],
  seas: [
    { name: "Skagerrak", at: [8.9, 57.9], angle: -16 },
    { name: "Kattegat", at: [11.25, 56.9], angle: 0, size: 0.85 },
    { name: "Nordsjøen", at: [3.4, 56.3], angle: 0, size: 1.2 },
    { name: "Den engelske kanal", at: [-1.7, 50.38], angle: -4 },
    { name: "Biscayabukta", at: [-4.7, 45.6], angle: 0, size: 1.1 },
    { name: "Atlanterhavet", at: [-14.2, 40.2], angle: 0, size: 1.35 },
  ] as Sea[],
  spins: 2, // hele omdreininger før kloden stopper over Oslo
  idleSpeed: 6, // grader per sekund mens man står helt øverst
  startTilt: 24, // breddegraden kloden peker mot før den snurrer
  dwell: 0.18, // hvor lenge båten ligger i havn (andel av hver etappe)
  detailBox: [-32, 18, 38, 76] as Box,
  dataUrl: "/voyage",
};

const PALETTES = {
  day: {
    paper: "#f2f8fd", seaGlobe: "#b9d6e7", sea: "#eaf4f9", shallow1: "#d5e9f4", shallow2: "#bcdcee",
    land: "#f2e1a4", coast: "#5a503f", grid: "#2f6b93", gridA: 0.15, rim: "#86a3b7",
    route: "#c2177d", track: "#ffffff", ink: "#17233b", halo: "#ffffff", seaInk: "#3e6d90",
    shadow: "#1a3550", glint: 0.3, hull: "#1b2b48", sail: "#ffffff", sail2: "#eef2f6",
    sailEdge: "#1b2b48", wake: "#6fa6c9",
  },
  night: {
    paper: "#08111d", seaGlobe: "#12304d", sea: "#0b1b2e", shallow1: "#0f2540", shallow2: "#153452",
    land: "#3a3524", coast: "#a8976a", grid: "#8fb4d6", gridA: 0.11, rim: "#2d4c6b",
    route: "#ff5fb9", track: "#08111d", ink: "#e4edf6", halo: "#08111d", seaInk: "#7fa6c7",
    shadow: "#000000", glint: 0.1, hull: "#dfe8f2", sail: "#f4f7fa", sail2: "#d3dce6",
    sailEdge: "#08111d", wake: "#9cc2e0",
  },
};

/* ----------------------------- hjelpere ----------------------------- */
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const smoother = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
function easeOutBack(t: number) {
  const c1 = 1.5, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}
function hex(h: string) {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mix(a: string, b: string, t: number) {
  const A = hex(a), B = hex(b);
  return "rgb(" + A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",") + ")";
}
function rgba(h: string, a: number) {
  const c = hex(h);
  return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
}
const fmt = (n: number) => n.toLocaleString("nb-NO");

// Canvas kan ikke lese CSS-variabler, så fontene fra next/font slås opp
// (de har genererte family-navn, ikke "Space Grotesk"/"Inter").
function cssFont(varName: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return v ? `${v}, ${fallback}` : fallback;
}

/* ------------------------------ kartdata ----------------------------- */
const GRID_STEP = 4; // detaljkartet er delt i ruter på 4 x 4 grader

// Kystlinjer uten de kunstige kantene der datasettene er klippet sammen
function onGrid(v: number, o: number) {
  const r = (v - o) / GRID_STEP;
  return Math.abs(r - Math.round(r)) * GRID_STEP < 0.0008;
}
function coastOf(fc: LandFC | Feature, box: Box, tiled = false): MultiLineString {
  const e = 0.02, lons = [box[0], box[2], -180, 180], lats = [box[1], box[3], -90, 90];
  function same(p: Position, q: Position) {
    if (tiled) {
      if (Math.abs(p[0] - q[0]) < 0.0008 && onGrid(p[0], box[0]) && onGrid(q[0], box[0])) return true;
      if (Math.abs(p[1] - q[1]) < 0.0008 && onGrid(p[1], box[1]) && onGrid(q[1], box[1])) return true;
    }
    for (let i = 0; i < 4; i++) {
      if (Math.abs(p[0] - lons[i]) < e && Math.abs(q[0] - lons[i]) < e) return true;
      if (Math.abs(p[1] - lats[i]) < e && Math.abs(q[1] - lats[i]) < e) return true;
    }
    return false;
  }
  const lines: Position[][] = [];
  const feats = "features" in fc ? fc.features : [fc];
  feats.forEach((f) => {
    const g = f.geometry;
    if (!g) return;
    const polys = g.type === "Polygon" ? [g.coordinates] : g.type === "MultiPolygon" ? g.coordinates : [];
    polys.forEach((poly) => {
      poly.forEach((r) => {
        let cur: Position[] = [];
        for (let i = 0; i < r.length - 1; i++) {
          if (same(r[i], r[i + 1])) {
            if (cur.length > 1) lines.push(cur);
            cur = [];
          } else {
            if (!cur.length) cur.push(r[i]);
            cur.push(r[i + 1]);
          }
        }
        if (cur.length > 1) lines.push(cur);
      });
    });
  });
  return { type: "MultiLineString", coordinates: lines };
}

async function loadLand(name: string, signal: AbortSignal): Promise<LandFC> {
  const res = await fetch(`${CONFIG.dataUrl}/land-${name}.json`, { signal });
  if (!res.ok) throw new Error(`voyage: klarte ikke å hente land-${name}.json (${res.status})`);
  const t = (await res.json()) as Topology<{ land: GeometryCollection<{ b?: Box }> }>;
  return feature(t, t.objects.land) as LandFC;
}

function tilesOf(fc: LandFC): Tile[] {
  return fc.features.map((f) => ({ b: f.properties!.b!, land: f, coast: coastOf(f, CONFIG.detailBox, true) }));
}

/* ------------------------------- ruta -------------------------------- */
function chaikin(p: LonLat[], it: number) {
  for (let k = 0; k < it; k++) {
    const out: LonLat[] = [p[0]];
    for (let i = 0; i < p.length - 1; i++) {
      const a = p[i], b = p[i + 1];
      out.push([a[0] * 0.75 + b[0] * 0.25, a[1] * 0.75 + b[1] * 0.25]);
      out.push([a[0] * 0.25 + b[0] * 0.75, a[1] * 0.25 + b[1] * 0.75]);
    }
    out.push(p[p.length - 1]);
    p = out;
  }
  return p;
}

const STOPS = CONFIG.stops, NSTOPS = STOPS.length, NLEGS = NSTOPS - 1;
const pts: LonLat[] = [], cum: number[] = [], stopKm = [0], legKm: number[] = [];
CONFIG.via.forEach((via, i) => {
  const leg = chaikin([STOPS[i].at, ...via, STOPS[i + 1].at], 3);
  leg.forEach((p, j) => {
    if (i > 0 && j === 0) return;
    cum.push(pts.length ? cum[cum.length - 1] + geoDistance(pts[pts.length - 1], p) * 6371.0088 : 0);
    pts.push(p);
  });
  stopKm.push(cum[cum.length - 1]);
  legKm.push(stopKm[i + 1] - stopKm[i]);
});
const TOTAL = cum[cum.length - 1];
const ROUTE: LineString = { type: "LineString", coordinates: pts };
const CANALS: MultiLineString = { type: "MultiLineString", coordinates: CONFIG.canals };
const bounds = geoBounds(ROUTE);
const OV_CENTER: LonLat = [(bounds[0][0] + bounds[1][0]) / 2, (bounds[0][1] + bounds[1][1]) / 2];
const SPHERE = { type: "Sphere" } as const;
const GRID_COARSE = geoGraticule().step([15, 15])();
const GRID_FINE = geoGraticule().extent([[-44, 14], [48, 80]]).step([2, 2]).precision(1)();

function pointAt(d: number): [number, number, number] {
  d = clamp(d, 0, TOTAL);
  let lo = 0, hi = cum.length - 1;
  while (hi - lo > 1) {
    const m = (lo + hi) >> 1;
    if (cum[m] <= d) lo = m;
    else hi = m;
  }
  const span = cum[hi] - cum[lo], t = span > 0 ? (d - cum[lo]) / span : 0;
  return [lerp(pts[lo][0], pts[hi][0], t), lerp(pts[lo][1], pts[hi][1], t), lo];
}

/** Total distanse og havner, for tekst på siden om det trengs. */
export const voyageInfo = { totalKm: TOTAL, legKm, stops: STOPS };

/* ======================================================================
   initVoyage: starter animasjonen i `el` og returnerer destroy()
   ====================================================================== */
export function initVoyage(el: HTMLElement): () => void {
  const mapCv = el.querySelector<HTMLCanvasElement>(".voyage-map");
  const ovCv = el.querySelector<HTMLCanvasElement>(".voyage-overlay");
  const mctx = mapCv?.getContext("2d");
  const octx = ovCv?.getContext("2d");
  if (!mapCv || !ovCv || !mctx || !octx) return () => {};

  let destroyed = false;
  const abort = new AbortController();
  const cleanups: (() => void)[] = [() => abort.abort()];
  const on = <K extends keyof WindowEventMap>(k: K, fn: (e: WindowEventMap[K]) => void) => {
    window.addEventListener(k, fn, { passive: true });
    cleanups.push(() => window.removeEventListener(k, fn));
  };

  /* ---------------------------- kartdata ----------------------------- */
  // Grovkartene (hele kloden) trengs først; detaljene kommer når de kommer.
  let FAR: { land: LandFC; coast: MultiLineString } | null = null;
  let LITE: { land: LandFC; coast: MultiLineString } | null = null;
  let REST: RestPoly[] = [];
  const TILES: { detail: Tile[] | null; mid: Tile[] | null } = { detail: null, mid: null };

  const loadErr = (err: unknown) => {
    if (!destroyed && (err as Error)?.name !== "AbortError") console.error(err);
  };
  Promise.all([loadLand("far", abort.signal), loadLand("rest", abort.signal)])
    .then(([far, rest]) => {
      if (destroyed) return;
      FAR = { land: far, coast: coastOf(far, CONFIG.detailBox) };
      // Resten av verden delt opp i enkeltpolygoner, så baksiden av kloden kan hoppes over
      REST = [];
      rest.features.forEach((f) => {
        const g = f.geometry;
        if (!g || (g.type !== "Polygon" && g.type !== "MultiPolygon")) return;
        (g.type === "Polygon" ? [g.coordinates] : g.coordinates).forEach((poly) => {
          const feat: Feature<Polygon> = { type: "Feature", properties: {}, geometry: { type: "Polygon", coordinates: poly } };
          const ctr = geoCentroid(feat) as LonLat;
          let rad = 0;
          poly[0].forEach((p) => { rad = Math.max(rad, geoDistance(ctr, p as LonLat)); });
          REST.push({ c: ctr, r: rad, land: feat, coast: coastOf(feat, CONFIG.detailBox) });
        });
      });
      mapKey = "";
      el.dataset.ready = "";
    })
    .catch(loadErr);
  loadLand("lite", abort.signal)
    .then((lite) => { if (!destroyed) { LITE = { land: lite, coast: coastOf(lite, CONFIG.detailBox) }; mapKey = ""; } })
    .catch(loadErr);
  loadLand("mid", abort.signal)
    .then((mid) => { if (!destroyed) { TILES.mid = tilesOf(mid); mapKey = ""; } })
    .catch(loadErr);
  loadLand("detail", abort.signal)
    .then((detail) => { if (!destroyed) { TILES.detail = tilesOf(detail); mapKey = ""; } })
    .catch(loadErr);

  /* ------------------------------ lerret ------------------------------- */
  const proj = geoOrthographic().precision(0.6);
  const projD = geoOrthographic().precision(0); // detaljdata har korte segmenter, trenger ikke resampling
  const ovPath = geoPath(proj, octx);
  const geoM = geoPath(proj), geoD = geoPath(projD);
  const mapPath = (obj: GeoPermissibleObjects) => geoM.context(mctx)(obj);
  // Bygger en Path2D én gang per bilde, så den kan fylles/strekes flere ganger
  function toPath2D(parts: [boolean, GeoPermissibleObjects][]) {
    const P = new Path2D();
    geoM.context(P as unknown as GeoContext);
    geoD.context(P as unknown as GeoContext);
    parts.forEach(([detail, obj]) => (detail ? geoD : geoM)(obj));
    return P;
  }

  let SANS = "", SERIF = "";
  function readFonts() {
    SANS = cssFont("--font-display", '"Arial Narrow", Arial, sans-serif');
    SERIF = cssFont("--font-body", "Georgia, serif");
  }
  readFonts();

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Siden har bare lyst tema i dag. Kartet følger likevel data-theme="dark"
  // eller klassen .dark på <html>, så det henger med om mørk modus kommer.
  const root = document.documentElement;
  const themeName = () =>
    root.getAttribute("data-theme") === "dark" || root.classList.contains("dark") ? "night" : "day";
  let PAL: Palette = PALETTES[themeName()];
  let mapKey = "";
  const themeObs = new MutationObserver(() => { PAL = PALETTES[themeName()]; mapKey = ""; });
  themeObs.observe(root, { attributes: true, attributeFilter: ["data-theme", "class"] });
  cleanups.push(() => themeObs.disconnect());

  let W = 0, H = 0, DPR = 1, DPRM = 1, wide = false, R = 1, kStop = 1, kOv = 1, anchorLine = 0.5;
  let focus: [number, number] = [0, 0], tOv: [number, number] = [0, 0];

  function layout() {
    W = window.innerWidth; H = window.innerHeight;
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    DPRM = Math.min(DPR, 1.5); // kartet er mykt nok til å tåle litt lavere oppløsning
    mapCv!.width = Math.round(W * DPRM); mapCv!.height = Math.round(H * DPRM);
    ovCv!.width = Math.round(W * DPR); ovCv!.height = Math.round(H * DPR);
    wide = W >= 860;
    focus = wide ? [W * (W < 1100 ? 0.68 : 0.64), H * 0.5] : [W * 0.5, H * 0.34];
    R = wide ? Math.min(H * 0.36, W * 0.27) : Math.min(W * 0.42, H * 0.24);
    kStop = 5.2 * Math.min(H, W * 1.1);
    const ext: [[number, number], [number, number]] = wide
      ? [[W * 0.4, H * 0.09], [W * 0.95, H * 0.88]]
      : [[W * 0.12, H * 0.08], [W * 0.88, H * 0.5]];
    const tmp = geoOrthographic().rotate([-OV_CENTER[0], -OV_CENTER[1]]).fitExtent(ext, ROUTE);
    kOv = tmp.scale(); tOv = tmp.translate();
    anchorLine = wide ? 0.5 : 0.66;
    proj.clipExtent([[-40, -40], [W + 40, H + 40]]);
    projD.clipExtent([[-40, -40], [W + 40, H + 40]]);
    buildAnchors();
    mapKey = "";
  }

  /* --------------------------- scroll -> steg --------------------------- */
  let anchors: { t: number; y: number }[] = [], maxS = 1;
  function buildAnchors() {
    const vh = window.innerHeight;
    maxS = Math.max(1, document.documentElement.scrollHeight - vh);
    anchors = Array.from(document.querySelectorAll<HTMLElement>("[data-voyage]"))
      .map((a) => {
        const r = a.getBoundingClientRect();
        const y = r.top + window.scrollY + r.height / 2 - vh * anchorLine;
        return { t: parseFloat(a.dataset.voyage!), y: clamp(y, 0, maxS) };
      })
      .filter((a) => !isNaN(a.t))
      .sort((a, b) => a.t - b.t);
    for (let i = 1; i < anchors.length; i++) anchors[i].y = Math.max(anchors[i].y, anchors[i - 1].y);
  }
  function targetT() {
    const y = window.scrollY, maxT = 3 + NLEGS;
    if (!anchors.length) return maxT * clamp(y / maxS);
    if (y <= anchors[0].y) return anchors[0].t;
    for (let i = 1; i < anchors.length; i++) {
      const a = anchors[i - 1], b = anchors[i];
      if (y <= b.y) return b.y > a.y ? lerp(a.t, b.t, (y - a.y) / (b.y - a.y)) : b.t;
    }
    return anchors[anchors.length - 1].t;
  }

  /* ------------------------------ kamera ------------------------------- */
  let idleB = 0;
  function camera(T: number): Camera {
    const O = STOPS[0].at;
    const cam: Camera = { rot: [0, 0, 0], k: R, tr: [focus[0], focus[1]], boatD: null, leg: -1, s: 0, z: 0, center: [0, 0] };
    if (T < 1) {
      const u = clamp(T), e = easeOut(u);
      cam.rot = [-O[0] - (1 - e) * (CONFIG.spins * 360 - idleB), -lerp(CONFIG.startTilt, O[1], easeInOut(u)), 0];
    } else if (T < 2) {
      const e2 = easeInOut(clamp(T - 1));
      cam.rot = [-O[0], -O[1], 0];
      cam.k = R * Math.pow(kStop / R, e2);
      cam.boatD = 0;
    } else if (T < 2 + NLEGS) {
      const x = T - 2, leg = Math.min(NLEGS - 1, Math.floor(x)), u2 = x - leg;
      const s = smoother(clamp((u2 - CONFIG.dwell) / (1 - 2 * CONFIG.dwell)));
      const d = stopKm[leg] + s * legKm[leg];
      const p = pointAt(d);
      const zf = clamp(legKm[leg] / 420, 1, 2.8), sn = Math.sin(Math.PI * s);
      cam.k = kStop / (1 + (zf - 1) * sn * sn);
      cam.rot = [-p[0], -p[1], 0];
      cam.boatD = d; cam.leg = leg; cam.s = s;
    } else {
      const e3 = easeInOut(clamp(T - 2 - NLEGS));
      const c = geoInterpolate(STOPS[NSTOPS - 1].at, OV_CENTER)(e3);
      cam.rot = [-c[0], -c[1], 0];
      cam.k = kStop * Math.pow(kOv / kStop, e3);
      cam.tr = [lerp(focus[0], tOv[0], e3), lerp(focus[1], tOv[1], e3)];
      cam.boatD = TOTAL;
      cam.leg = NLEGS - 1; cam.s = 1;
    }
    cam.z = clamp(Math.log(cam.k / R) / Math.log(4));
    cam.center = [-cam.rot[0], -cam.rot[1]];
    return cam;
  }
  const visible = (cam: Camera, p: LonLat) => geoDistance(p, cam.center) < Math.PI / 2 - 0.03;

  /* ---------------------------- kartlaget ------------------------------ */
  // Omtrentlig lengde-/breddegradsutsnitt av skjermen (null = deler av skjermen er utenfor kloden)
  function viewBounds(): Box | null {
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    for (let i = 0; i <= 6; i++) for (let j = 0; j <= 4; j++) {
      const g = proj.invert!([-40 + (W + 80) * i / 6, -40 + (H + 80) * j / 4]);
      if (!g || !isFinite(g[0]) || !isFinite(g[1])) return null;
      if (g[0] < x0) x0 = g[0]; if (g[0] > x1) x1 = g[0];
      if (g[1] < y0) y0 = g[1]; if (g[1] > y1) y1 = g[1];
    }
    const pad = 0.6;
    return [x0 - pad * 2, y0 - pad, x1 + pad * 2, y1 + pad];
  }

  function drawMap(cam: Camera) {
    const key = [cam.rot[0].toFixed(3), cam.rot[1].toFixed(3), cam.k.toFixed(1), cam.tr[0].toFixed(1), cam.tr[1].toFixed(1), W, H, DPRM, PAL.paper].join("|");
    if (key === mapKey) return;
    mapKey = key;
    const c = mctx!, z = cam.z;
    proj.rotate(cam.rot).scale(cam.k).translate(cam.tr);
    projD.rotate(cam.rot).scale(cam.k).translate(cam.tr);
    c.setTransform(DPRM, 0, 0, DPRM, 0, 0);
    c.fillStyle = PAL.paper;
    c.fillRect(0, 0, W, H);

    // myk skygge under kloden (gradient i stedet for shadowBlur, som er tregt)
    if (z < 1) {
      const sx = cam.tr[0], sy = cam.tr[1] + cam.k * 0.08, sr = cam.k * 1.14;
      const sg = c.createRadialGradient(sx, sy, cam.k * 0.86, sx, sy, sr);
      sg.addColorStop(0, rgba(PAL.shadow, 0.24 * (1 - z)));
      sg.addColorStop(0.45, rgba(PAL.shadow, 0.09 * (1 - z)));
      sg.addColorStop(1, rgba(PAL.shadow, 0));
      c.fillStyle = sg;
      c.beginPath(); c.arc(sx, sy, sr, 0, Math.PI * 2); c.fill();
    }
    // hav
    c.beginPath(); mapPath(SPHERE);
    c.fillStyle = mix(PAL.seaGlobe, PAL.sea, z);
    c.fill();

    // gradnett
    c.lineWidth = 0.8;
    if (z < 1) {
      c.beginPath(); mapPath(GRID_COARSE);
      c.strokeStyle = rgba(PAL.grid, PAL.gridA * (1 - z)); c.stroke();
    }
    if (z > 0.4) {
      c.beginPath(); mapPath(GRID_FINE);
      c.strokeStyle = rgba(PAL.grid, PAL.gridA * clamp((z - 0.4) / 0.6)); c.stroke();
    }

    // detaljnivå etter hvor mange km én skjermpiksel dekker
    // (faller tilbake til grovere data mens detaljene fortsatt lastes)
    const kmPx = 6371 / cam.k;
    const set = kmPx < 2.2 ? TILES.detail ?? TILES.mid : kmPx < 7 ? TILES.mid : null;
    const landParts: [boolean, GeoPermissibleObjects][] = [], coastParts: [boolean, GeoPermissibleObjects][] = [];
    REST.forEach((p) => {
      if (geoDistance(p.c, cam.center) > Math.PI / 2 + p.r + 0.02) return;
      landParts.push([false, p.land]); coastParts.push([false, p.coast]);
    });
    const base = kmPx < 13 ? LITE ?? FAR : FAR;
    if (set) {
      const vb = viewBounds();
      set.forEach((t) => {
        if (vb && (t.b[0] > vb[2] || t.b[2] < vb[0] || t.b[1] > vb[3] || t.b[3] < vb[1])) return;
        landParts.push([true, t.land]); coastParts.push([true, t.coast]);
      });
    } else if (base) {
      landParts.push([false, base.land]); coastParts.push([false, base.coast]);
    }
    const landP = toPath2D(landParts), coastP = toPath2D(coastParts);
    c.lineJoin = "round"; c.lineCap = "round";

    // grunt vann langs kysten, som på et sjøkart
    const band = clamp(cam.k / kStop, 0.18, 1) * z;
    if (band > 0.02) {
      c.strokeStyle = PAL.shallow1; c.lineWidth = 15 * band; c.stroke(coastP);
      c.strokeStyle = PAL.shallow2; c.lineWidth = 6 * band; c.stroke(coastP);
    }

    // land
    c.fillStyle = PAL.land; c.fill(landP);

    if (z > 0.3) {
      c.beginPath(); mapPath(CANALS);
      c.strokeStyle = PAL.shallow2; c.lineWidth = 3.2 * z; c.stroke();
    }

    c.strokeStyle = PAL.coast; c.lineWidth = 0.5 + 0.35 * z; c.stroke(coastP);

    // lys og skygge på kloden
    if (z < 1) {
      const cx = cam.tr[0], cy = cam.tr[1], r = cam.k;
      c.save();
      c.beginPath(); mapPath(SPHERE); c.clip();
      const g = c.createRadialGradient(cx - r * 0.38, cy - r * 0.42, r * 0.04, cx, cy, r * 1.02);
      g.addColorStop(0, "rgba(255,255,255," + PAL.glint + ")");
      g.addColorStop(0.5, "rgba(255,255,255,0)");
      g.addColorStop(1, rgba(PAL.shadow, 0.3));
      c.globalAlpha = 1 - z;
      c.fillStyle = g; c.fillRect(0, 0, W, H);
      c.restore();
      c.beginPath(); mapPath(SPHERE);
      c.strokeStyle = rgba(PAL.rim, 1 - z); c.lineWidth = 1; c.stroke();
    }

    // navn på havområder
    const seaA = clamp((Math.log(cam.k / R) / Math.log(kStop / R) - 0.72) / 0.2);
    if (seaA > 0) {
      c.textAlign = "center"; c.textBaseline = "middle";
      if ("letterSpacing" in c) c.letterSpacing = "0.12em";
      CONFIG.seas.forEach((s) => {
        if (!visible(cam, s.at)) return;
        const xy = proj(s.at)!;
        const near = cam.boatD === null ? 1 : clamp((Math.hypot(xy[0] - focus[0], xy[1] - focus[1]) - 80) / 70);
        if (near <= 0) return;
        c.save();
        c.translate(xy[0], xy[1]);
        c.rotate(((s.angle || 0) * Math.PI) / 180);
        c.font = "italic 400 " + (15 * (s.size || 1)).toFixed(1) + "px " + SERIF;
        c.fillStyle = rgba(PAL.seaInk, 0.85 * seaA * near);
        c.fillText(s.name, 0, 0);
        c.restore();
      });
      if ("letterSpacing" in c) c.letterSpacing = "0px";
    }
  }

  /* ------------------------------ båten -------------------------------- */
  function drawBoat(c: CanvasRenderingContext2D, x: number, y: number, scale: number, facing: number, t: number, wake: number) {
    const bob = reduce ? 0 : Math.sin(t * 2.3) * 1.3;
    const roll = reduce ? 0 : Math.sin(t * 1.7) * 0.045;
    c.save();
    c.translate(x, y + bob);

    // skygge i vannet
    c.fillStyle = rgba(PAL.shadow, 0.12);
    c.beginPath(); c.ellipse(0, 4 * scale, 30 * scale, 4.5 * scale, 0, 0, Math.PI * 2); c.fill();

    // kjølvann
    if (wake > 0.01) {
      c.save();
      c.scale(facing * scale, scale);
      c.strokeStyle = PAL.wake; c.lineWidth = 1.3 / scale; c.lineCap = "round";
      for (let i = 0; i < 3; i++) {
        const ph = (t * 0.9 + i / 3) % 1;
        const wx = -22 - ph * 34;
        c.globalAlpha = (1 - ph) * 0.85 * wake;
        c.beginPath(); c.moveTo(wx, 2 + ph * 1.5); c.quadraticCurveTo(wx - 5, 4 + ph * 2, wx - 11, 2.5 + ph * 1.5); c.stroke();
      }
      c.globalAlpha = 0.7 * wake;
      c.beginPath(); c.moveTo(24, 1.5); c.quadraticCurveTo(29, 3.5, 33, 1.8); c.stroke();
      c.restore();
    }

    c.rotate(roll);
    c.scale(facing * scale, scale);
    c.lineJoin = "round"; c.lineCap = "round";

    // flagg (Norge) på akterstaget
    c.strokeStyle = PAL.hull; c.lineWidth = 1;
    c.beginPath(); c.moveTo(-22.5, -7); c.lineTo(-25.5, -18); c.stroke();
    const fx = -35, fy = -19, fw = 9.5, fh = 6.8;
    c.fillStyle = "#ba0c2f"; c.fillRect(fx, fy, fw, fh);
    const vx = fx + fw - (fw * 8) / 22; // korset ligger nærmest stanga
    c.fillStyle = "#ffffff";
    c.fillRect(vx - (fw * 2) / 22, fy, (fw * 4) / 22, fh);
    c.fillRect(fx, fy + fh / 2 - (fh * 2) / 16, fw, (fh * 4) / 16);
    c.fillStyle = "#00205b";
    c.fillRect(vx - (fw * 1) / 22, fy, (fw * 2) / 22, fh);
    c.fillRect(fx, fy + fh / 2 - (fh * 1) / 16, fw, (fh * 2) / 16);

    // mast og bom
    c.strokeStyle = PAL.hull; c.lineWidth = 1.7;
    c.beginPath(); c.moveTo(2, -7); c.lineTo(2, -57); c.stroke();
    c.lineWidth = 1.4;
    c.beginPath(); c.moveTo(2, -11); c.lineTo(-20, -11); c.stroke();

    // storseil
    c.beginPath();
    c.moveTo(0.6, -55); c.quadraticCurveTo(-8, -31, -19.5, -12); c.lineTo(0.6, -12); c.closePath();
    c.fillStyle = PAL.sail; c.fill();
    c.strokeStyle = PAL.sailEdge; c.lineWidth = 0.9; c.stroke();
    // forseil
    c.beginPath();
    c.moveTo(3.6, -51); c.lineTo(23, -9); c.lineTo(6.2, -11.5); c.quadraticCurveTo(10, -30, 3.6, -51); c.closePath();
    c.fillStyle = PAL.sail2; c.fill(); c.stroke();

    // skrog
    c.beginPath();
    c.moveTo(-24, -7.5); c.lineTo(25.5, -7.5);
    c.quadraticCurveTo(20, -0.5, 13, 3.8); c.lineTo(-17.5, 3.8);
    c.quadraticCurveTo(-23, 0.5, -24, -7.5); c.closePath();
    c.fillStyle = PAL.hull; c.fill();
    c.strokeStyle = PAL.sail; c.lineWidth = 1.1; c.globalAlpha = 0.85;
    c.beginPath(); c.moveTo(-23, -5); c.lineTo(22.5, -5); c.stroke();
    c.globalAlpha = 1;
    c.restore();
  }

  /* ---------------------------- overlaget ------------------------------ */
  let facing = -1, facingDisp = -1, wakeAmt = 0;
  function label(c: CanvasRenderingContext2D, x: number, y: number, st: Stop, big: boolean, alpha: number, side: Side, off: number) {
    const dir = side === "l" ? -1 : 1, below = side === "b";
    c.globalAlpha = alpha;
    c.textAlign = below ? "center" : dir > 0 ? "left" : "right";
    c.textBaseline = "middle";
    c.lineJoin = "round";
    const lx = below ? x : x + dir * off;
    if (below) y += big ? 30 : 15;
    c.strokeStyle = PAL.halo;
    if (big) {
      c.font = "600 21px " + SANS;
      c.lineWidth = 5; c.strokeText(st.name, lx, y - 7);
      c.fillStyle = PAL.ink; c.fillText(st.name, lx, y - 7);
      c.font = "500 13px " + SANS;
      c.lineWidth = 4; c.strokeText(st.country, lx, y + 11);
      c.fillStyle = rgba(PAL.ink, 0.72); c.fillText(st.country, lx, y + 11);
    } else {
      c.font = "600 14px " + SANS;
      c.lineWidth = 4; c.strokeText(st.name, lx, y);
      c.fillStyle = PAL.ink; c.fillText(st.name, lx, y);
    }
    c.globalAlpha = 1;
  }

  function drawOverlay(cam: Camera, T: number, now: number, moving: boolean, dt: number) {
    const c = octx!, t = now / 1000;
    proj.rotate(cam.rot).scale(cam.k).translate(cam.tr);
    c.setTransform(DPR, 0, 0, DPR, 0, 0);
    c.clearRect(0, 0, W, H);
    c.lineJoin = "round"; c.lineCap = "round";

    const routeA = clamp((T - 1.25) / 0.35);
    const d = cam.boatD === null ? 0 : cam.boatD;
    const here = pointAt(d);
    const hereLL: LonLat = [here[0], here[1]];
    const bs = clamp(Math.min(W, H) / 820, 0.78, 1.15);

    // planlagt rute (stiplet) og tilbakelagt rute (heltrukket)
    if (routeA > 0) {
      c.globalAlpha = routeA;
      c.beginPath(); ovPath(ROUTE);
      c.setLineDash([2, 6]); c.lineWidth = 1.5;
      c.strokeStyle = rgba(PAL.route, 0.6); c.stroke();
      c.setLineDash([]);
      if (d > 0.01) {
        const done: LineString = { type: "LineString", coordinates: [...pts.slice(0, here[2] + 1), hereLL] };
        c.beginPath(); ovPath(done);
        c.strokeStyle = rgba(PAL.track, 0.8); c.lineWidth = 6; c.stroke();
        c.strokeStyle = PAL.route; c.lineWidth = 2.6; c.stroke();
      }
      c.globalAlpha = 1;
    }

    // hvilken havn ligger båten i akkurat nå?
    let docked = -1;
    if (T >= 1 && T < 2) docked = 0;
    else if (cam.leg >= 0) docked = cam.s <= 0 ? cam.leg : cam.s >= 1 ? cam.leg + 1 : -1;

    // havnene
    const osloA = clamp((T - 0.78) / 0.2);
    STOPS.forEach((st, i) => {
      const show = i === 0 ? Math.max(osloA, routeA) : routeA;
      if (show <= 0 || !visible(cam, st.at)) return;
      const xy = proj(st.at)!, reached = cam.boatD !== null && cam.boatD >= stopKm[i] - 0.5;
      c.globalAlpha = show;
      c.beginPath(); c.arc(xy[0], xy[1], reached ? 5 : 4.2, 0, Math.PI * 2);
      if (reached || (i === 0 && T < 2)) {
        c.fillStyle = PAL.route; c.fill();
        c.strokeStyle = PAL.halo; c.lineWidth = 1.6; c.stroke();
      } else {
        c.fillStyle = PAL.halo; c.fill();
        c.strokeStyle = PAL.route; c.lineWidth = 1.5; c.stroke();
        c.beginPath(); c.arc(xy[0], xy[1], 1.4, 0, Math.PI * 2); c.fillStyle = PAL.route; c.fill();
      }
      c.globalAlpha = 1;
      const dockOff = 40 * bs + 8;
      if (i === 0 && T < 2) label(c, xy[0], xy[1], st, true, osloA, st.side, lerp(12, dockOff, clamp((T - 1.4) / 0.35)));
      else if (i === docked) label(c, xy[0], xy[1], st, true, show, st.side, dockOff);
      else if (reached) label(c, xy[0], xy[1], st, false, show * 0.95, st.side, 10);
    });

    // puls over Oslo når kloden stopper
    const pulseA = clamp((T - 0.8) / 0.15) * (1 - clamp((T - 1.7) / 0.4));
    if (pulseA > 0 && visible(cam, STOPS[0].at)) {
      const o = proj(STOPS[0].at)!;
      for (let k = 0; k < 2; k++) {
        const ph = reduce ? 0.35 + k * 0.3 : (t * 0.6 + k / 2) % 1;
        c.beginPath(); c.arc(o[0], o[1], 7 + ph * 30, 0, Math.PI * 2);
        c.strokeStyle = rgba(PAL.route, (1 - ph) * 0.7 * pulseA); c.lineWidth = 1.6; c.stroke();
      }
    }

    // båten
    if (cam.boatD !== null && T > 1.4 && visible(cam, hereLL)) {
      const pop = easeOutBack(clamp((T - 1.45) / 0.4));
      const bxy = proj(hereLL)!;
      if (moving) {
        const a = pointAt(d - 25), b = pointAt(d + 25);
        const pa = proj([a[0], a[1]])!, pb = proj([b[0], b[1]])!;
        const dx = pb[0] - pa[0], len = Math.hypot(dx, pb[1] - pa[1]);
        if (len > 1) { if (dx < -0.3 * len) facing = -1; else if (dx > 0.3 * len) facing = 1; }
      }
      facingDisp += (facing - facingDisp) * (1 - Math.exp(-dt * 7));
      wakeAmt += ((moving ? 1 : 0) - wakeAmt) * (1 - Math.exp(-dt * 4));
      const fd = Math.abs(facingDisp) < 0.08 ? (facingDisp < 0 ? -0.08 : 0.08) : facingDisp;
      if (pop > 0.01) drawBoat(c, bxy[0], bxy[1], bs * pop, fd, t, wakeAmt);
    }

    // logg
    const logA = clamp((T - 1.9) / 0.3);
    if (logA > 0) {
      const nm = Math.round(d / 1.852);
      c.globalAlpha = logA;
      c.textBaseline = "alphabetic"; c.textAlign = wide ? "right" : "left";
      const lx = wide ? W - 32 : 18, ly = H - (wide ? 30 : 22); // under headeren på mobil blir den skjult
      c.font = "600 15px " + SANS;
      c.lineWidth = 4; c.strokeStyle = PAL.halo;
      const txt = fmt(nm) + " nm seilt";
      c.strokeText(txt, lx, ly); c.fillStyle = PAL.ink; c.fillText(txt, lx, ly);
      c.globalAlpha = 1;
    }
  }

  /* ----------------------------- hovedløkke ---------------------------- */
  layout();
  let Tcur = targetT(), last = performance.now(), raf = 0;
  function frame(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const Tt = targetT(), Tprev = Tcur;
    Tcur = reduce ? Tt : Tcur + (Tt - Tcur) * (1 - Math.exp(-dt * 7));
    if (Math.abs(Tt - Tcur) < 1e-4) Tcur = Tt;
    if (!reduce) {
      idleB += dt * CONFIG.idleSpeed * clamp(1 - Tcur * 20);
      if (idleB >= 360) idleB = Tcur < 0.001 ? idleB - 360 : 360 - 1e-6;
    }
    const cam = camera(Tcur);
    const moving = cam.s > 0 && cam.s < 1 && Math.abs(Tcur - Tprev) > 1e-5;
    drawMap(cam);
    drawOverlay(cam, Tcur, now, moving, dt);
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);
  cleanups.push(() => cancelAnimationFrame(raf));

  let rT: ReturnType<typeof setTimeout> | undefined;
  on("resize", () => { clearTimeout(rT); rT = setTimeout(layout, 120); });
  cleanups.push(() => clearTimeout(rT));
  on("load", buildAnchors);
  document.fonts?.ready.then(() => {
    if (destroyed) return;
    readFonts(); buildAnchors(); mapKey = "";
  });
  const ro = new ResizeObserver(() => buildAnchors());
  ro.observe(document.body);
  cleanups.push(() => ro.disconnect());

  return function destroy() {
    if (destroyed) return;
    destroyed = true;
    cleanups.forEach((fn) => fn());
    delete el.dataset.ready;
    mctx.setTransform(1, 0, 0, 1, 0, 0);
    mctx.clearRect(0, 0, mapCv.width, mapCv.height);
    octx.setTransform(1, 0, 0, 1, 0, 0);
    octx.clearRect(0, 0, ovCv.width, ovCv.height);
  };
}
