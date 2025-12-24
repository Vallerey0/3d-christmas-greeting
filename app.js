import * as THREE from "https://unpkg.com/three@0.182.0/build/three.module.js";

const $ = (s) => document.querySelector(s);
gsap.registerPlugin(ScrollTrigger);

/* =========================
   ZODIAC DATA
========================= */
const ZODIAC = [
  {
    name: "Capricorn",
    badge: "♑",
    from: [12, 22],
    to: [1, 19],
    element: "Tanah",
    mode: "Kardinal",
    core: "Ambisius, realistis, dan fokus membangun sesuatu yang tahan lama.",
    strength: "Disiplin, konsisten, kuat dalam perencanaan & eksekusi.",
    challenge:
      "Cenderung terlalu keras pada diri sendiri dan sulit melepas kontrol.",
    tip: "Saran: jaga ritme—tetap serius, tapi beri ruang untuk istirahat dan menikmati proses.",
  },
  {
    name: "Aquarius",
    badge: "♒",
    from: [1, 20],
    to: [2, 18],
    element: "Udara",
    mode: "Tetap",
    core: "Visioner, independen, dan senang melihat dunia dari sudut pandang yang berbeda.",
    strength: "Inovatif, berpikir luas, cepat menangkap pola dan ide besar.",
    challenge:
      "Kadang terasa ‘jauh’ atau terlalu logis saat situasi butuh kehangatan.",
    tip: "Saran: tetap autentik, tapi sampaikan perasaan dengan cara yang sederhana & hangat.",
  },
  {
    name: "Pisces",
    badge: "♓",
    from: [2, 19],
    to: [3, 20],
    element: "Air",
    mode: "Mutable",
    core: "Peka, intuitif, dan punya imajinasi yang kuat.",
    strength: "Empati tinggi, kreatif, mudah membaca suasana.",
    challenge: "Mudah lelah jika terlalu menyerap energi lingkungan.",
    tip: "Saran: baik hati itu indah, tapi tetap pasang batas sehat.",
  },
  {
    name: "Aries",
    badge: "♈",
    from: [3, 21],
    to: [4, 19],
    element: "Api",
    mode: "Kardinal",
    core: "Berani, cepat bergerak, dan senang memulai hal baru.",
    strength: "Inisiatif tinggi, tegas, penuh energi.",
    challenge: "Kadang terburu-buru dan mudah terpancing emosi.",
    tip: "Saran: tetap gesit—tarik napas sebentar sebelum memilih keputusan besar.",
  },
  {
    name: "Taurus",
    badge: "♉",
    from: [4, 20],
    to: [5, 20],
    element: "Tanah",
    mode: "Tetap",
    core: "Stabil, setia, dan kuat menjaga konsistensi.",
    strength: "Sabar, dapat diandalkan, fokus pada kualitas.",
    challenge: "Kadang sulit berubah dan terlalu nyaman di zona aman.",
    tip: "Saran: pertahankan stabilitas—tambahkan fleksibilitas kecil saat dibutuhkan.",
  },
  {
    name: "Gemini",
    badge: "♊",
    from: [5, 21],
    to: [6, 20],
    element: "Udara",
    mode: "Mutable",
    core: "Komunikatif, cepat belajar, dan mudah beradaptasi.",
    strength: "Cerdas, lincah sosial, cepat memahami banyak sudut pandang.",
    challenge: "Mudah terdistraksi dan terlalu banyak hal berjalan bersamaan.",
    tip: "Saran: pilih satu prioritas utama, selesaikan, baru lanjut yang berikutnya.",
  },
  {
    name: "Cancer",
    badge: "♋",
    from: [6, 21],
    to: [7, 22],
    element: "Air",
    mode: "Kardinal",
    core: "Hangat, protektif, dan kuat membangun kedekatan.",
    strength: "Perhatian, setia, punya insting merawat yang besar.",
    challenge: "Mudah memendam dan sensitif pada perubahan mood.",
    tip: "Saran: ungkapkan kebutuhanmu dengan jelas—bukan dipendam sendiri.",
  },
  {
    name: "Leo",
    badge: "♌",
    from: [7, 23],
    to: [8, 22],
    element: "Api",
    mode: "Tetap",
    core: "Percaya diri, ekspresif, dan suka memberi semangat.",
    strength: "Leadership alami, karisma, berani tampil.",
    challenge: "Bisa sensitif soal apresiasi atau gengsi.",
    tip: "Saran: tetap bersinar—dan beri ruang orang lain bersinar juga.",
  },
  {
    name: "Virgo",
    badge: "♍",
    from: [8, 23],
    to: [9, 22],
    element: "Tanah",
    mode: "Mutable",
    core: "Teliti, terstruktur, dan suka merapikan hal sampai rapi.",
    strength: "Detail-oriented, disiplin, jago bikin sistem.",
    challenge: "Perfeksionis dan mudah merasa kurang.",
    tip: "Saran: standar tinggi oke—jangan lupa merayakan progress kecil.",
  },
  {
    name: "Libra",
    badge: "♎",
    from: [9, 23],
    to: [10, 22],
    element: "Udara",
    mode: "Kardinal",
    core: "Harmonis, adil, dan kuat di rasa estetika.",
    strength: "Diplomatis, menenangkan, peka pada keseimbangan.",
    challenge: "Susah memilih karena ingin semuanya terasa aman.",
    tip: "Saran: keputusan terbaik adalah yang baik untukmu juga.",
  },
  {
    name: "Scorpio",
    badge: "♏",
    from: [10, 23],
    to: [11, 21],
    element: "Air",
    mode: "Tetap",
    core: "Intens, fokus, dan punya tekad kuat.",
    strength: "Loyal, tajam, berani menghadapi hal sulit.",
    challenge: "Cenderung overprotective atau terlalu curiga.",
    tip: "Saran: pegang kendali diri—dan bangun kepercayaan setahap demi setahap.",
  },
  {
    name: "Sagittarius",
    badge: "♐",
    from: [11, 22],
    to: [12, 21],
    element: "Api",
    mode: "Mutable",
    core: "Optimis, suka eksplor, dan punya semangat besar.",
    strength: "Berpikir luas, jujur, mudah memotivasi orang lain.",
    challenge: "Kadang terlalu spontan dan melewatkan detail.",
    tip: "Saran: bebas itu bagus—tambahkan sedikit struktur biar makin kuat.",
  },
];

// "DD/MM/YYYY" -> "YYYY-MM-DD"
function parseDMYtoISO(dmy) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec((dmy || "").trim());
  if (!m) return null;
  const dd = Number(m[1]),
    mm = Number(m[2]),
    yyyy = Number(m[3]);
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return null;

  const iso = `${String(yyyy).padStart(4, "0")}-${String(mm).padStart(
    2,
    "0"
  )}-${String(dd).padStart(2, "0")}`;
  const d = new Date(iso + "T00:00:00");

  // validasi real (hindari 31/02)
  if (Number.isNaN(d.getTime())) return null;
  if (d.getFullYear() !== yyyy || d.getMonth() + 1 !== mm || d.getDate() !== dd)
    return null;

  // jangan boleh masa depan
  const today = new Date();
  const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (d > t0) return null;

  return iso;
}
function isValidDateInput(value) {
  return !!parseDMYtoISO(value);
}
function formatIDDate(isoYyyyMmDd) {
  const d = new Date(isoYyyyMmDd + "T00:00:00");
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
function nextBirthdayInfo(isoYyyyMmDd) {
  const dob = new Date(isoYyyyMmDd + "T00:00:00");
  const now = new Date();
  const y = now.getFullYear();
  let next = new Date(y, dob.getMonth(), dob.getDate());
  if (next < now) next = new Date(y + 1, dob.getMonth(), dob.getDate());
  const dayName = next.toLocaleDateString("id-ID", { weekday: "long" });
  const full = next.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return { dayName, full };
}
function getZodiac(month1to12, day) {
  for (const z of ZODIAC) {
    const [fm, fd] = z.from;
    const [tm, td] = z.to;

    if (fm <= tm) {
      if (
        (month1to12 === fm && day >= fd) ||
        (month1to12 === tm && day <= td) ||
        (month1to12 > fm && month1to12 < tm)
      )
        return z;
    } else {
      if (
        (month1to12 === fm && day >= fd) ||
        (month1to12 === tm && day <= td) ||
        month1to12 > fm ||
        month1to12 < tm
      )
        return z;
    }
  }
  return ZODIAC[0];
}
function zodiacRangeText(z) {
  const m = (n) => String(n).padStart(2, "0");
  const [fm, fd] = z.from;
  const [tm, td] = z.to;
  return `${m(fm)}/${m(fd)} – ${m(tm)}/${m(td)}`;
}

/* =========================
   DOM
========================= */
const gate = $("#gate");
const form = $("#gateForm");
const nameInput = $("#nameInput");
const dobInput = $("#dobInput");
const startBtn = $("#startBtn");
const gateHint = $("#gateHint");
const app = $("#app");
const bgm = $("#bgm");

const whoLine = $("#whoLine");
const aboutLine = $("#aboutLine");
const zodiacBadge = $("#zodiacBadge");
const zodiacName = $("#zodiacName");
const zodiacMeta = $("#zodiacMeta");
const zodiacDesc = $("#zodiacDesc");
const zStrength = $("#zStrength");
const zChallenge = $("#zChallenge");
const zodiacTip = $("#zodiacTip");

const wish = $("#wish");
const wishCard = $("#wishCard");
const miniGift = $("#miniGift");
const wishTitle = $("#wishTitle");
const wishText = $("#wishText");
const cheerBtn = $("#cheerBtn");

const morphBlob = $("#morphBlob");
const toTopBtn = $("#toTop");

/* Flatpickr init (force UI modern + allow typing) */
if (window.flatpickr) {
  window.flatpickr(dobInput, {
    dateFormat: "d/m/Y",
    allowInput: true,
    disableMobile: true,
    maxDate: "today",
  });
}

/* =========================
   LENIS
========================= */
let lenis = null;
function enableSmoothScroll() {
  document.body.style.overflow = "auto";
  lenis = new Lenis({
    duration: 1.25,
    smoothWheel: true,
    smoothTouch: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.1,
    syncTouch: true,
    syncTouchLerp: 0.08,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on("scroll", () => ScrollTrigger.update());
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.ticker.lagSmoothing(500, 33);
}

/* =========================
   SCROLL LOCK (used ONLY when curtain fully closed)
========================= */
let scrollLocked = false;
function lockScroll() {
  if (scrollLocked) return;
  scrollLocked = true;

  if (lenis) lenis.stop();
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  const prevent = (e) => {
    e.preventDefault();
  };
  window.addEventListener("wheel", prevent, { passive: false });
  window.addEventListener("touchmove", prevent, { passive: false });
  lockScroll._prevent = prevent;
}
function unlockScroll() {
  if (!scrollLocked) return;
  scrollLocked = false;

  if (lenis) lenis.start();
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "auto";

  if (lockScroll._prevent) {
    window.removeEventListener("wheel", lockScroll._prevent, {
      passive: false,
    });
    window.removeEventListener("touchmove", lockScroll._prevent, {
      passive: false,
    });
  }
}

/* =========================
   HARD SNAP
========================= */
function hardSnapTo(targetSelector) {
  const el = document.querySelector(targetSelector);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo(0, top);
  if (lenis) lenis.scrollTo(top, { immediate: true });
}

/* =========================
   CURTAINS + SNAP (SMOOTHER)
========================= */
let curtainBusy = false;

function curtainsOpen(duration = 0.9) {
  const tl = gsap.timeline();
  tl.to(".curtain--left", { scaleX: 0, duration, ease: "power3.inOut" }, 0);
  tl.to(".curtain--right", { scaleX: 0, duration, ease: "power3.inOut" }, 0);
  tl.to(
    "#curtains",
    { opacity: 0, duration: 0.4, ease: "power2.out" },
    duration - 0.22
  );
  return tl;
}
function curtainsClose(duration = 0.42) {
  gsap.set("#curtains", { opacity: 1 });
  const tl = gsap.timeline();
  tl.to(".curtain--left", { scaleX: 1, duration, ease: "power3.inOut" }, 0);
  tl.to(".curtain--right", { scaleX: 1, duration, ease: "power3.inOut" }, 0);
  return tl;
}

function curtainCycleTo(
  targetSelector,
  { closeDur = 0.42, hold = 0.14, openDur = 0.9 } = {}
) {
  if (curtainBusy || !lenis) return;
  curtainBusy = true;

  gsap.set("#curtains", { opacity: 1 });

  const tl = gsap.timeline({
    onComplete: () => {
      curtainBusy = false;
      unlockScroll();
      hardSnapTo(targetSelector);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
  });

  tl.add(curtainsClose(closeDur), 0);
  tl.add(() => lockScroll(), closeDur);
  tl.add(() => hardSnapTo(targetSelector), closeDur + 0.01);
  tl.to({}, { duration: hold }, closeDur + 0.01);
  tl.add(curtainsOpen(openDur), closeDur + hold);

  return tl;
}

/* =========================
   REVEAL + CARD TILT PRESS
========================= */
function setupReveal() {
  const els = document.querySelectorAll(".reveal");
  els.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      }
    );
  });
}
function setupCardTiltPress() {
  const cards = document.querySelectorAll(".card--galaxy");
  cards.forEach((card) => {
    let rafId = null;

    const onMove = (clientX, clientY) => {
      const r = card.getBoundingClientRect();
      const x = (clientX - r.left) / r.width;
      const y = (clientY - r.top) / r.height;

      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);

      const rotY = (x - 0.5) * 10;
      const rotX = (0.5 - y) * 10;
      const scale = 0.985;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
      });
    };

    const reset = () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)`;
      card.style.setProperty("--mx", `50%`);
      card.style.setProperty("--my", `50%`);
    };

    card.addEventListener("mousemove", (e) => onMove(e.clientX, e.clientY));
    card.addEventListener(
      "mouseenter",
      () => (card.style.transition = "transform 80ms ease")
    );
    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform 420ms cubic-bezier(.2,.8,.2,1)";
      reset();
    });
  });
}

/* =========================
   TOP BUTTON
========================= */
function setupToTopReveal() {
  ScrollTrigger.create({
    trigger: "#footer",
    start: "top 80%",
    onEnter: () => {
      gsap.to(toTopBtn, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
      });
      toTopBtn.style.pointerEvents = "auto";
    },
    onLeaveBack: () => {
      gsap.to(toTopBtn, {
        opacity: 0,
        y: 10,
        duration: 0.35,
        ease: "power2.inOut",
      });
      toTopBtn.style.pointerEvents = "none";
    },
  });
}
toTopBtn.addEventListener("click", () => {
  if (!lenis) return;
  curtainCycleTo("#hero", { closeDur: 0.4, hold: 0.12, openDur: 0.85 });
});

/* =========================
   THREE.JS
========================= */
const canvas = $("#webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x070914, 6, 22);

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 60);
camera.position.set(0, 2.0, 9);

scene.add(new THREE.AmbientLight(0xffffff, 0.55));
const key = new THREE.DirectionalLight(0xffffff, 1.1);
key.position.set(4, 7, 6);
scene.add(key);
const rim = new THREE.DirectionalLight(0x66e6ff, 0.55);
rim.position.set(-6, 3, -4);
scene.add(rim);

const ground = new THREE.Mesh(
  new THREE.CircleGeometry(7.4, 64),
  new THREE.MeshStandardMaterial({
    color: 0x0c1022,
    roughness: 1,
    metalness: 0,
  })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1.25;
scene.add(ground);

const world = new THREE.Group();
scene.add(world);

function makeTree() {
  const g = new THREE.Group();

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.2, 1.0, 18),
    new THREE.MeshStandardMaterial({ color: 0x4b2e22, roughness: 1 })
  );
  trunk.position.y = -0.65;
  g.add(trunk);

  const layers = [
    { r: 1.15, h: 1.35, y: -0.02 },
    { r: 0.92, h: 1.2, y: 0.62 },
    { r: 0.7, h: 1.05, y: 1.15 },
    { r: 0.52, h: 0.9, y: 1.58 },
  ];

  g.userData.lights = [];

  layers.forEach((l, i) => {
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(l.r, l.h, 24),
      new THREE.MeshStandardMaterial({ color: 0x0f7a3a, roughness: 0.95 })
    );
    cone.position.y = l.y;
    g.add(cone);

    const bulbs = new THREE.Group();
    for (let b = 0; b < 24; b++) {
      const m = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.85,
        roughness: 0.22,
        metalness: 0.1,
      });

      m.color.setHSL((b / 24 + i * 0.2) % 1, 0.95, 0.58);
      m.emissive.set(m.color);

      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.052, 14, 14), m);
      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 12, 12),
        new THREE.MeshBasicMaterial({
          color: m.color,
          transparent: true,
          opacity: 0.25,
        })
      );

      const a = (b / 24) * Math.PI * 2;
      const rr = l.r * 0.64;
      const yJitter = Math.random() * 0.44 - 0.18;
      bulb.position.set(Math.cos(a) * rr, l.y + yJitter, Math.sin(a) * rr);
      halo.position.copy(bulb.position);

      bulb.userData.blinkPhase = Math.random() * Math.PI * 2;
      bulb.userData.base = 0.55 + Math.random() * 0.55;
      bulb.userData.halo = halo;

      bulbs.add(bulb);
      bulbs.add(halo);

      g.userData.lights.push(bulb);
    }
    g.add(bulbs);
  });

  const star = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.18, 0),
    new THREE.MeshStandardMaterial({
      color: 0xfff2b0,
      emissive: 0xfff2b0,
      emissiveIntensity: 1.25,
      roughness: 0.15,
    })
  );
  star.position.y = 1.95;
  g.add(star);

  const starHalo = new THREE.Mesh(
    new THREE.SphereGeometry(0.42, 16, 16),
    new THREE.MeshBasicMaterial({
      color: 0xfff2b0,
      transparent: true,
      opacity: 0.18,
    })
  );
  starHalo.position.y = 1.95;
  g.add(starHalo);

  g.userData.star = star;
  g.userData.starHalo = starHalo;

  g.position.set(-1.95, 0, -0.95);
  return g;
}

function makeSnowman() {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: 0xeef4ff,
    roughness: 0.85,
  });

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.75, 28, 28), mat);
  body.position.y = -0.65;
  const mid = new THREE.Mesh(new THREE.SphereGeometry(0.55, 28, 28), mat);
  mid.position.y = 0.15;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.38, 28, 28), mat);
  head.position.y = 0.75;

  g.add(body, mid, head);

  const nose = new THREE.Mesh(
    new THREE.ConeGeometry(0.05, 0.48, 18),
    new THREE.MeshStandardMaterial({ color: 0xff7a2f, roughness: 0.65 })
  );
  nose.rotation.x = Math.PI / 2;
  nose.position.set(0, 0.75, 0.39);
  g.add(nose);

  const eyeMat = new THREE.MeshStandardMaterial({
    color: 0x0b0b12,
    roughness: 0.6,
  });
  const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), eyeMat);
  const eyeR = eyeL.clone();
  eyeL.position.set(-0.12, 0.82, 0.33);
  eyeR.position.set(0.12, 0.82, 0.33);
  g.add(eyeL, eyeR);

  const btnMat = new THREE.MeshStandardMaterial({
    color: 0x111320,
    roughness: 0.7,
  });
  for (let i = 0; i < 3; i++) {
    const btn = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), btnMat);
    btn.position.set(0, 0.25 - i * 0.22, 0.52);
    g.add(btn);
  }

  const scarf = new THREE.Mesh(
    new THREE.TorusGeometry(0.42, 0.09, 12, 24),
    new THREE.MeshStandardMaterial({ color: 0xb0002a, roughness: 0.6 })
  );
  scarf.rotation.x = Math.PI / 2;
  scarf.position.y = 0.46;
  g.add(scarf);

  // top hat
  const hatGroup = new THREE.Group();
  const brim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.32, 0.05, 22),
    new THREE.MeshStandardMaterial({
      color: 0x0c0c12,
      roughness: 0.55,
      metalness: 0.08,
    })
  );
  brim.position.y = 0.0;

  const crown = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.24, 0.3, 22),
    new THREE.MeshStandardMaterial({
      color: 0x0c0c12,
      roughness: 0.55,
      metalness: 0.08,
    })
  );
  crown.position.y = 0.18;

  const band = new THREE.Mesh(
    new THREE.CylinderGeometry(0.235, 0.245, 0.06, 22),
    new THREE.MeshStandardMaterial({
      color: 0xb0002a,
      roughness: 0.45,
      metalness: 0.05,
    })
  );
  band.position.y = 0.08;

  hatGroup.add(brim, crown, band);
  hatGroup.position.set(0, 1.05, 0);
  hatGroup.rotation.z = -0.08;
  g.add(hatGroup);

  g.position.set(2.15, 0, -1.05);
  return g;
}

/* Gift 3D */
const gift = new THREE.Group();
let giftLid = null;
let giftIsOpen = false;

function makeGift() {
  const g = new THREE.Group();

  const base = new THREE.Mesh(
    new THREE.BoxGeometry(1.25, 0.95, 1.25),
    new THREE.MeshStandardMaterial({
      color: 0x8a2be2,
      roughness: 0.6,
      metalness: 0.05,
    })
  );
  base.position.y = -0.2;

  const ribbon = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 1.02, 1.28),
    new THREE.MeshStandardMaterial({
      color: 0x00d6ff,
      roughness: 0.35,
      metalness: 0.15,
    })
  );
  ribbon.position.y = -0.2;

  const ribbon2 = new THREE.Mesh(
    new THREE.BoxGeometry(1.28, 1.02, 0.16),
    new THREE.MeshStandardMaterial({
      color: 0x00d6ff,
      roughness: 0.35,
      metalness: 0.15,
    })
  );
  ribbon2.position.y = -0.2;

  giftLid = new THREE.Group();
  const lid = new THREE.Mesh(
    new THREE.BoxGeometry(1.32, 0.26, 1.32),
    new THREE.MeshStandardMaterial({
      color: 0x6f1fd9,
      roughness: 0.55,
      metalness: 0.05,
    })
  );
  lid.position.y = 0.42;

  giftLid.add(lid);
  giftLid.position.y = 0.08;

  g.add(base, ribbon, ribbon2, giftLid);
  g.position.set(0.2, -0.25, 0.25);
  return g;
}

function makeSnow(count = 700) {
  const geom = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const speed = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    pos[i * 3 + 0] = (Math.random() - 0.5) * 14;
    pos[i * 3 + 1] = Math.random() * 10;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    speed[i] = 0.35 + Math.random() * 0.75;
  }

  geom.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geom.setAttribute("aSpeed", new THREE.BufferAttribute(speed, 1));
  const mat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.035,
    transparent: true,
    opacity: 0.85,
  });
  const pts = new THREE.Points(geom, mat);
  pts.userData.speedAttr = geom.getAttribute("aSpeed");
  return pts;
}

world.add(makeTree());
world.add(makeSnowman());
gift.add(makeGift());
world.add(gift);

const snow = makeSnow(700);
scene.add(snow);

function resize() {
  const w = window.innerWidth,
    h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize);
resize();

let t = 0;
function tick() {
  t += 0.01;
  world.rotation.y = Math.sin(t * 0.25) * 0.08;

  // Tree lights blink (meriah)
  const tree = world.children.find((o) => o.userData?.lights);
  if (tree) {
    const lights = tree.userData.lights;
    const star = tree.userData.star;
    const starHalo = tree.userData.starHalo;

    for (let i = 0; i < lights.length; i++) {
      const bulb = lights[i];
      const mat = bulb.material;

      const w = 2.2 + (i % 6) * 0.25;
      const s1 = Math.sin(t * w + bulb.userData.blinkPhase) * 0.5 + 0.5;
      const sparkle =
        (Math.sin(t * (6.5 + (i % 5)) + bulb.userData.blinkPhase * 1.7) * 0.5 +
          0.5) *
        0.25;

      const intensity = 0.25 + bulb.userData.base * (0.65 * s1 + sparkle);
      mat.emissiveIntensity = intensity;

      if (bulb.userData.halo) {
        bulb.userData.halo.material.opacity =
          0.1 + Math.min(0.35, intensity * 0.18);
      }
    }

    if (star) {
      const pulse = Math.sin(t * 2.4) * 0.5 + 0.5;
      star.material.emissiveIntensity = 1.0 + pulse * 0.9;
    }
    if (starHalo) {
      const pulse2 = Math.sin(t * 2.0) * 0.5 + 0.5;
      starHalo.material.opacity = 0.12 + pulse2 * 0.12;
      starHalo.scale.setScalar(1.0 + pulse2 * 0.08);
    }
  }

  // Snow fall
  const p = snow.geometry.attributes.position;
  const s = snow.userData.speedAttr;
  for (let i = 0; i < p.count; i++) {
    p.array[i * 3 + 1] -= s.array[i] * 0.02;
    if (p.array[i * 3 + 1] < -1.2) p.array[i * 3 + 1] = 10;
  }
  p.needsUpdate = true;

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();

/* =========================
   GIFT POPUP
========================= */
function openGift3D() {
  if (giftIsOpen) return;
  giftIsOpen = true;
  gsap.to(giftLid.rotation, { x: -1.22, duration: 0.85, ease: "power3.inOut" });
  gsap.to(giftLid.position, { y: 0.28, duration: 0.85, ease: "power3.inOut" });
}
function closeGift3D() {
  if (!giftIsOpen) return;
  giftIsOpen = false;
  gsap.to(giftLid.rotation, { x: 0, duration: 0.6, ease: "power3.inOut" });
  gsap.to(giftLid.position, { y: 0.08, duration: 0.6, ease: "power3.inOut" });
}

function showWishFromGift() {
  gsap.set(wish, { opacity: 1, pointerEvents: "auto" });

  const tl = gsap.timeline();
  tl.fromTo(
    miniGift,
    { opacity: 0, scale: 0.2, rotate: -10, y: 18 },
    {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      duration: 0.45,
      ease: "back.out(1.8)",
    }
  );
  tl.to(
    ".miniGift__lid",
    { rotate: -22, duration: 0.28, ease: "power2.out" },
    "-=0.12"
  );
  tl.to(
    miniGift,
    { scale: 1.25, opacity: 0, duration: 0.28, ease: "power2.inOut" },
    "+=0.05"
  );
  tl.to(
    wishCard,
    { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
    "-=0.10"
  );
  confetti({ particleCount: 90, spread: 80, origin: { y: 0.62 } });
}
function hideWish() {
  gsap.to(wishCard, {
    opacity: 0,
    y: 12,
    scale: 0.98,
    duration: 0.25,
    ease: "power2.inOut",
  });
  gsap.to(wish, {
    opacity: 0,
    duration: 0.2,
    ease: "power2.out",
    onComplete: () => gsap.set(wish, { pointerEvents: "none" }),
  });
}

function sparkleBurst() {
  confetti({ particleCount: 160, spread: 95, origin: { y: 0.6 } });
  setTimeout(
    () => confetti({ particleCount: 120, spread: 70, origin: { y: 0.58 } }),
    220
  );
  setTimeout(
    () => confetti({ particleCount: 90, spread: 60, origin: { y: 0.56 } }),
    460
  );
}
cheerBtn.addEventListener("click", sparkleBurst);

/* =========================
   SCROLL BUILD
========================= */
function buildScroll() {
  let lastInfoDir = 0;

  ScrollTrigger.create({
    trigger: "#info",
    start: "top 92%",
    onEnter: () => {
      if (lastInfoDir !== 1) {
        lastInfoDir = 1;
        curtainCycleTo("#info");
      }
    },
    onEnterBack: () => {
      if (lastInfoDir !== -1) {
        lastInfoDir = -1;
        curtainCycleTo("#info");
      }
    },
  });

  gsap.to(morphBlob, {
    scrollTrigger: {
      trigger: "#gift",
      start: "top 85%",
      end: "top 25%",
      scrub: true,
    },
    clipPath: "polygon(10% 20%, 70% 10%, 92% 35%, 82% 92%, 28% 86%, 8% 55%)",
    ease: "none",
  });

  gsap.to(camera.position, {
    scrollTrigger: {
      trigger: "#info",
      start: "top 85%",
      end: "top 25%",
      scrub: true,
    },
    x: 0.15,
    y: 1.85,
    z: 8.0,
    ease: "none",
  });
  gsap.to(camera.position, {
    scrollTrigger: {
      trigger: "#gift",
      start: "top 80%",
      end: "top 35%",
      scrub: true,
    },
    x: 0.25,
    y: 1.4,
    z: 4.6,
    ease: "none",
  });
  gsap.to(gift.rotation, {
    scrollTrigger: {
      trigger: "#gift",
      start: "top 85%",
      end: "top 30%",
      scrub: true,
    },
    y: Math.PI * 0.35,
    ease: "none",
  });

  ScrollTrigger.create({
    trigger: "#gift",
    start: "top 70%",
    end: "bottom 30%",
    onEnter: () => {
      openGift3D();
      showWishFromGift();
    },
    onEnterBack: () => {
      openGift3D();
      showWishFromGift();
    },
    onLeaveBack: () => {
      hideWish();
      closeGift3D();
    },
  });

  setupReveal();
  setupCardTiltPress();
  setupToTopReveal();
}

/* =========================
   Gate
========================= */
function updateGateButton() {
  const nameOk = nameInput.value.trim().length >= 2;
  const dobOk = isValidDateInput(dobInput.value);
  startBtn.disabled = !(nameOk && dobOk);
  gateHint.textContent = startBtn.disabled
    ? "Isi nama & tanggal lahir dulu biar tombolnya nyala."
    : "Sip. Klik Masuk, musik mulai, lalu scroll pelan ya.";
}
nameInput.addEventListener("input", updateGateButton);
dobInput.addEventListener("input", updateGateButton);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const dmyDob = dobInput.value;

  if (name.length < 2 || !isValidDateInput(dmyDob)) return;

  const isoDob = parseDMYtoISO(dmyDob);
  const d = new Date(isoDob + "T00:00:00");
  const z = getZodiac(d.getMonth() + 1, d.getDate());
  const born = formatIDDate(isoDob);
  const next = nextBirthdayInfo(isoDob);

  whoLine.textContent = `Untuk ${name}`;

  aboutLine.textContent =
    `Hi ${name}, kamu lahir di tanggal ${born}. ` +
    `Zodiak kamu ${z.name}. ` +
    `Ulang tahunmu berikutnya di hari ${next.dayName} (${next.full}).`;

  zodiacBadge.textContent = z.badge;
  zodiacName.textContent = z.name;
  zodiacMeta.textContent = `${zodiacRangeText(z)} • Elemen ${
    z.element
  } • Mode ${z.mode}`;
  zodiacDesc.textContent = z.core;
  zStrength.textContent = z.strength;
  zChallenge.textContent = z.challenge;
  zodiacTip.textContent = z.tip;

  wishTitle.textContent = `Selamat Natal, ${name}!`;
  wishText.textContent =
    `Kiranya damai Natal memenuhi hatimu, dan sukacita menyertai keluargamu. ` +
    `Semoga kasih dan kebaikan selalu bertumbuh dalam hidupmu, serta harapan baru menyala untuk hari-hari ke depan. ` +
    `Selamat merayakan Natal dengan hangat dan penuh berkat.`;

  try {
    bgm.volume = 0.85;
    await bgm.play();
  } catch {}

  enableSmoothScroll();

  gsap.to(gate, {
    opacity: 0,
    duration: 0.45,
    ease: "power2.out",
    onComplete: () => {
      gate.style.display = "none";
      gsap.to(app, { opacity: 1, duration: 0.6, ease: "power2.out" });

      curtainsOpen(1.0);

      buildScroll();
      setTimeout(() => ScrollTrigger.refresh(), 200);
    },
  });
});
