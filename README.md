# 🎄 Natal 2025 — 3D Christmas Greeting (Three.js + GSAP + Lenis)

Website ucapan Natal 2025 bergaya **3D modern** dengan pengalaman interaktif:
- Gate modal input **Nama + Tanggal Lahir** (tombol masuk aktif hanya jika valid)
- **Tirai (curtain) cinematic** yang menutup → snap ke section → membuka kembali (scroll terkunci hanya saat tirai benar-benar tertutup)
- Section “Tentang kamu” (tanggal lahir, zodiak, saran singkat)
- **Kado 3D** terbuka + popup ucapan Natal muncul halus dari kado kecil
- Animasi **smooth scrolling** (Lenis) + reveal cards + hover 3D press
- **Musik Natal autoplay** setelah klik masuk (`Natal.mp3`)
- Tombol **scroll to top** yang juga memakai curtain cycle
- Pohon natal **kelap-kelip meriah** + boneka salju dengan **topi** dan hidung mancung

> Dibuat untuk halaman publik yang ringan, modern, dan mudah di-host (tanpa build tool).

---

## ✨ Tech Stack

- **Three.js** (ESM via UNPKG) — scene 3D, gift, tree, snowman, snow particles  
- **GSAP 3 + ScrollTrigger** — curtain transition, timeline animasi, scroll-based triggers  
- **Lenis** — smooth scrolling  
- **Canvas Confetti** — efek “Meriahkan!”  

---

## ✅ Fitur Utama

- **Input Gate**: validasi nama & tanggal lahir (button disabled sampai lengkap)
- **Curtain Transition**: scroll terkunci hanya saat tirai fully closed (anti “stuck”)
- **Auto Snap**: saat curtain close, page snap tepat ke section target (anti geser liar)
- **Zodiac Panel**: nama zodiak, elemen, mode, kekuatan, tantangan, saran
- **Gift + Wish**: popup ucapan muncul smooth dari mini gift, plus confetti burst
- **Hover 3D Cards**: efek tilt + “press” feel + galaxy shine
- **Autoplay Music**: mulai setelah klik masuk (kompatibel kebijakan browser)
- **Scroll to Top**: tombol muncul di akhir, animasi balik ke atas lebih sinematik

---

## 📦 Struktur Project

.
├── index.html
├── style.css
├── app.js
└── Natal.mp3

yaml
Copy code

---

## 🚀 Cara Menjalankan (Local)

Karena `app.js` menggunakan ES Modules (`type="module"`), sebaiknya jalankan via local server.

### Opsi 1 — VS Code Live Server (Paling gampang)
1. Install extension **Live Server**
2. Klik kanan `index.html` → **Open with Live Server**

### Opsi 2 — Node.js (http-server)
```bash
npx http-server -p 5173
Buka:
http://localhost:5173

Opsi 3 — Python
bash
Copy code
python -m http.server 5173
Buka:
http://localhost:5173