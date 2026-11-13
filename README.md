# 🌴 MadTravel — Travel Metasearch & SaaS Power Tools

**MadTravel** adalah desain prototipe lengkap untuk platform **B2C Travel Metasearch & B2B SaaS Power Tools** yang dibangun menggunakan **100% Native HTML5, CSS3, dan Vanilla JavaScript** (tanpa ketergantungan framework eksternal).

Platform ini dirancang untuk membandingkan harga tiket pesawat, hotel, dan paket liburan dari **120+ Online Travel Agent (OTA)** seperti Traveloka, Tiket.com, Agoda, Booking.com, Trip.com, serta situs resmi maskapai dalam satu antarmuka yang cerah, transparan, dan cepat.

---

## 🎨 Identitas & Gaya Desain (UI/UX Style)

Proyek ini mengusung gaya desain **Soft Neo-Brutalism (Pop-Brutalism) + Tropical Bento UI**:

### 1. Soft Neo-Brutalism / Tactile Pop UI
Berbeda dengan *Neo-Brutalism* kaku yang menggunakan sudut tajam dan warna hitam pekat, **Soft Neo-Brutalism** (terinspirasi dari gaya interaktif Figma, Duolingo, dan Poolsuite) memadukan:
- **Garis Tepi Tegas (*Bold Outlines*):** Menggunakan border `2px` hingga `3px solid #0F2942` (*Ocean Navy*) sehingga terlihat tajam namun tetap nyaman di mata.
- **Hard Offset Shadow (*Pop Shadow*):** Bayangan kartu dan tombol dibuat bergeser tegas (`box-shadow: 4px 4px 0px #0F2942`) yang memberikan efek fisik (*tactile*) saat di-*hover* maupun diklik.
- **Sudut Membulat (*Generous Border Radius*):** Kartu menggunakan radius `16px`–`32px` dan tombol berbentuk kapsul (*pill shape*) untuk menjaga nuansa liburan yang ramah dan menyenangkan.

### 2. Tropical Coastal Color Palette
| Token Warna | Hex | Peran Visual |
| :--- | :--- | :--- |
| **Warm Sand Base** | `#FFFDF8` / `#FFF6E6` | Latar belakang utama bernuansa pasir pantai yang hangat |
| **Ocean Navy** | `#0F2942` | Warna teks utama, border tegas, dan struktur kontras |
| **Hibiscus Coral** | `#FF5A36` | Aksen tombol aksi utama (CTA) dan penanda diskon panas |
| **Lagoon Turquoise** | `#00B4A2` | Aksen fitur SaaS, navigasi aktif, dan elemen interaktif |
| **Sunny Mango** | `#FFB800` | Sticker badge, highlight promo, dan tab aktif |
| **Tropical Lime** | `#10B981` | Penanda khusus **"Harga Termurah / Target Alert Tercapai"** |

### 3. Bento Grid & Sticker Badge System
- **Bento Grid Layout:** Mengelompokkan informasi padat (seperti *Live OTA Scanner*, *Kalender Heatmap Harga Termurah*, dan *SaaS Power Tools*) ke dalam kartu-kartu modular yang rapi.
- **Playful Sticker Badges:** Label mikro seperti `TERMURAH 🏆`, `PRO`, atau `🔥 Turun 21%` dengan *offset shadow* menyerupai stiker koper perjalanan.

### 4. Tipografi Tiga Karakter (Friendly Display + Data Monospace)
- **Heading / Display (`Fredoka`):** Bulat, ekspresif, dan membangkitkan semangat liburan.
- **Body & UI (`Plus Jakarta Sans`):** Bersih dan memiliki keterbacaan tinggi di desktop maupun mobile.
- **Harga & Jam Penerbangan (`JetBrains Mono`):** Memastikan deretan angka perbandingan harga antar-OTA sejajar rapi dan mudah dipindai dalam hitungan detik.

---

## 📄 Daftar Halaman & Fitur Interaktif

1. **🌴 Beranda / Landing Page (`index.html`)**
   - **Universal Metasearch Box:** Tab pencarian *Tiket Pesawat*, *Hotel & Villa*, dan *AI Smart Trip*, lengkap dengan tombol penukar rute (*Origin ⇄ Destination*) dan filter harga final (+pajak).
   - **Live Metasearch Scanner Preview:** Simulasi perbandingan penerbangan yang sama di berbagai OTA.
   - **Cheapest Month Heatmap Calendar:** Kalender interaktif sebulan penuh untuk melihat tanggal dengan tarif termurah di berbagai rute populer.
   - **Trending Destinations & SaaS Bento Grid:** Kartu destinasi dengan filter kategori (*Semua*, *Tropis Indonesia*, *Luar Negeri Hemat*).

2. **✈️ Hasil Pencarian & Perbandingan Penerbangan (`flights.html`)**
   - **Expandable Multi-OTA Comparison Matrix:** Buka laci perbandingan di setiap kartu penerbangan untuk mengadu harga *Tiket.com*, *Traveloka*, *Trip.com*, *Agoda*, dan *Web Resmi Maskapai*.
   - **Kalkulator Bagasi Real-Time:** Ubah opsi bagasi (*Kabin 7kg*, *+20kg*, *+30kg*) dan seluruh harga di semua OTA akan dihitung ulang secara otomatis.
   - **AI Fare Predictor ("Beli Sekarang vs Tunggu"):** Prediksi berbasis tren harga beserta filter transit, maskapai, slider harga maksimal, dan pengurutan (*Terbaik*, *Termurah*, *Tercepat*).

3. **🏨 Hasil Pencarian, Peta Interaktif & Perbandingan Hotel (`hotels.html`)**
   - **Split-View Layout & Interactive Bali Map:** Daftar hotel di sisi kiri yang tersinkronisasi dua arah dengan pin harga di peta interaktif Bali di sisi kanan.
   - **Anti-Hidden-Fee Tax Switcher:** Sakelar instan untuk mengganti tampilan antara *Harga Dasar / Malam* dan *Harga Final (+Pajak 21%)*.
   - **Modal Perbandingan Tipe Kamar:** Bandingkan harga kamar per tipe (*Suite* vs *Private Pool Villa*) lintas OTA.

4. **📈 Price Alerts & Fare Tracker Dashboard (`price-alerts.html`)**
   - **Grafik SVG Riwayat Harga 7 Hari:** Visualisasi pergerakan tarif harian dibandingkan dengan garis target harga impian pengguna.
   - **Simulasi Penurunan Harga Real-Time:** Klik tombol `⚡ Simulasikan Harga Turun` untuk menguji pembaruan grafik dan memicu notifikasi WhatsApp Alert.
   - **Buat Pantauan Baru (`localStorage`):** Tambahkan rute pesawat atau hotel baru ke daftar pantauan serta pantau **Error Fare Radar Live**.

5. **🤖 AI Smart Trip Planner & Budget Optimizer (`ai-planner.html`)**
   - **Generator Itinerary Berbasis Bujet:** Pilih destinasi (*Bali*, *Labuan Bajo*, *Tokyo*), atur slider bujet, dan pilih *Travel Vibe*.
   - **Smart Budget Breakdown Bar:** Distribusi anggaran otomatis antara Tiket PP, Hotel, dan Aktivitas, lengkap dengan jadwal per jam yang terhubung ke deal OTA termurah.

6. **💎 Pricing SaaS & B2B White-Label Partner Studio (`pricing.html`)**
   - **3-Tier SaaS Pricing:** Paket *Explorer Free*, *Nomad Pro (B2C)*, dan *B2B Partner & API* dengan toggle tagihan Bulanan/Tahunan (Hemat 35%).
   - **B2B White-Label Widget Customizer:** Ubah nama brand agen travel dan warna tema widget secara *live*, hitung potensi komisi afiliasi bulanan melalui slider trafik pengunjung, dan salin kode embed HTML.

---

## 📂 Struktur Direktori

```text
madtravel/
├── index.html              # Home / Landing Page & Heatmap Calendar
├── flights.html            # Flight Metasearch & Multi-OTA Matrix
├── hotels.html             # Hotel Metasearch, Split Map & Room Compare Modal
├── price-alerts.html       # SaaS Price Alert Dashboard & SVG History Chart
├── ai-planner.html         # AI Smart Trip Planner & Budget Breakdown
├── pricing.html            # SaaS Subscription Tiers & B2B White-Label Studio
├── README.md               # Dokumentasi Proyek & Panduan Design System
└── assets/
    ├── css/
    │   └── style.css       # Global Design System (Soft Neo-Brutalism & Tropical UI)
    └── js/
        └── app.js          # Currency Switcher, LocalStorage State & UI Utilities
```

---

## 🚀 Cara Menjalankan di Lokal

Karena dibangun dengan **Native HTML, CSS, dan JS**, proyek ini tidak memerlukan proses *build* atau instalasi paket `npm`:

1. Clone repositori ini:
   ```bash
   git clone https://github.com/AchmadEko003/madtravel.git
   ```
2. Buka file `index.html` langsung di browser (Chrome, Edge, Firefox, Safari) atau jalankan melalui ekstensi **Live Server** di VS Code.
