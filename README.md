# ANARGYA ITS

Website seleksi Web Design & Development untuk Anargya ITS EV Team, mencakup kebutuhan **LOW, MEDIUM, dan HIGH**. Menampilkan profil tim, kendaraan Formula EV, pencapaian, kegiatan riset, sponsor, koleksi merchandise konsep, checkout simulasi, dashboard admin, dan PWA dengan offline dasar.

Website: [ANARGYA ITS](https://special-task-anargya.vercel.app/).

## Menjalankan project

Gunakan **Node.js 22+** dan **npm**. Batas minimum Node.js yang didukung Next.js dalam project ini adalah 20.9.0.

```bash
git clone https://github.com/proogramer-u/special-task-anargya.git
cd special-task-anargya
npm ci
cp .env.example .env.local
```

Lengkapi konfigurasi server di `.env.local` untuk menjalankan shop dan admin:

| Variable | Keterangan |
| --- | --- |
| `DATABASE_URL` | URI Supabase PostgreSQL Transaction pooler, port 6543. Gunakan kredensial project yang benar dan URL-encode password. |
| `DATABASE_SSL_CA` | Sertifikat CA resmi Supabase untuk verifikasi TLS. Format PEM dengan baris asli atau pemisah literal `\n` didukung. |
| `ADMIN_PASSWORD_HASH` | Hash password admin yang dihasilkan oleh `npm run admin:setup`. |
| `APP_ORIGIN` | Origin aplikasi yang persis sama, misalnya `http://localhost:3000`, tanpa trailing slash. |

`.env.example` menggunakan contoh port 3003; ubah `APP_ORIGIN` sesuai port yang digunakan. Halaman company profile tidak membutuhkan kredensial database, tetapi fitur commerce membutuhkan koneksi PostgreSQL.

Untuk database baru, jalankan migrasi dan seed koleksi konsep:

```bash
npm run db:migrate
npm run db:seed
npm run admin:setup
npm run dev
```

Buka [localhost:3000](http://localhost:3000/). Restart dev server setelah mengubah environment variable agar koneksi database dan konfigurasi autentikasi dimuat ulang.

Seed bersifat idempotent: menambahkan produk yang belum ada dan menonaktifkan empat listing lama, tanpa mereset stok produk yang sudah ada, pesanan, snapshot order item, atau sesi admin. Jangan jalankan seed pada setiap build. Gunakan Transaction pooler untuk runtime; `MIGRATION_DATABASE_URL` dapat digunakan untuk koneksi maintenance melalui Direct atau Session pooler. Migrasi SQL tersedia di `supabase/migrations/`.

Untuk production lokal dan pengujian PWA:

```bash
npm run build
npm run start
```

Service worker didaftarkan pada mode production. Gunakan origin dan port yang konsisten karena cart dan cache terikat pada browser serta origin.

## Fitur

- **Company profile:** homepage sebagai pengenalan dan akses ke halaman Team, Vehicles, Achievements, Research, dan Sponsors; menggunakan imagery resmi dan konten dengan sumber terdokumentasi.
- **Navigasi:** header responsif, indikator halaman aktif, dan menu mobile/tablet fullscreen tanpa penomoran dekoratif; mendukung keyboard, pengelolaan fokus, Escape, dan scroll locking.
- **Team:** sejarah, struktur divisi, dan direktori anggota dengan nama serta peran terverifikasi. Semua kartu anggota menggunakan silhouette placeholder yang konsisten.
- **Vehicles dan Research:** showcase kendaraan, spesifikasi yang tersedia, serta kegiatan engineering dan pengembangan.
- **Track Record:** carousel pencapaian dengan kontrol previous/next, indikator aktif, input keyboard dan touch, serta dukungan reduced motion.
- **Sponsors:** logo wall terstruktur dan informasi sponsorship/contact. Konten hubungan sponsor mengikuti sumber yang dicantumkan pada aplikasi.
- **Shop:** sepuluh produk merchandise konsep, harga IDR, pencarian, filter kategori/stok, detail produk, spesifikasi konsep, dan gambar mockup studio original.
- **Cart dan checkout:** cart lokal, kontrol kuantitas, subtotal, validasi stok dan harga di server, checkout simulasi, serta konfirmasi pesanan dengan akses bertoken.
- **Admin:** login single-admin, product CRUD, pengelolaan stok, daftar pesanan, dan perubahan status. Pembatalan pesanan mengembalikan stok secara transaksional.
- **Persistence:** produk, pesanan, order item, hash sesi admin, dan rate limit disimpan di Supabase PostgreSQL. Checkout menggunakan transaksi dan proteksi idempotency untuk mencegah pesanan ganda saat retry.
- **PWA:** manifest, ikon aplikasi, kontrol instalasi saat didukung browser, standalone mode, notifikasi pembaruan, dan cache halaman/aset publik.

**Concept merchandise collection · Orders are simulated and no purchases are processed.**

Produk, harga, stok, dan spesifikasi merchandise merupakan konsep fiktif, bukan klaim penjualan resmi Anargya. Pesanan simulasi tersimpan di database, tetapi aplikasi tidak memproses pembayaran, mengirim email pesanan, atau menyediakan pengiriman barang. Gunakan informasi pelanggan fiktif saat pengujian.

## Stack

Versi berikut berasal dari `package-lock.json`, bukan hanya rentang versi dalam `package.json`.

| Teknologi | Versi / implementasi |
| --- | --- |
| Next.js / App Router | 16.4.0 |
| React / React DOM | 19.3.0 |
| TypeScript | 5.9.3 |
| Tailwind CSS | 4.3.3 |
| Tailwind Turbopack integration | 4.3.3 |
| ESLint | 9.39.5 |
| ESLint Config Next | 16.4.0 |
| PostgreSQL driver (`pg`) | 8.23.1 |
| Server-only boundary (`server-only`) | 0.0.1 |
| Database | Supabase-hosted PostgreSQL; versi server tidak dipatok oleh lockfile |
| Cart persistence | Browser localStorage |
| Offline persistence | Browser Cache Storage melalui service worker native |
| Admin authentication | Versioned scrypt hash dan sesi server di PostgreSQL |
| Hosting | Vercel |

Menggunakan satu lockfile: `package-lock.json`. Font Inter disediakan secara lokal beserta lisensi OFL. Tidak menggunakan ORM, UI kit, library state tambahan, atau library PWA tambahan.

## Struktur

```text
src/app/                      App Router, metadata, manifest, dan styles
src/app/team/                 sejarah dan direktori tim
src/app/vehicles/             kendaraan dan spesifikasi
src/app/achievements/         pencapaian dan Track Record
src/app/research/             kegiatan riset dan pengembangan
src/app/sponsors/             sponsor wall dan contact
src/app/shop/                 katalog, detail, cart, checkout, konfirmasi
src/app/admin/                dashboard dan login admin
src/app/api/                  endpoint commerce dan admin
src/components/               navigation, editorial layout, carousel, PWA
src/components/team/          direktori dan kartu anggota reusable
src/components/commerce/      UI shop, cart, checkout, dan admin
src/lib/commerce/             model, collection, PostgreSQL, auth, password
src/data/                     konten tim, kendaraan, pencapaian, sponsor
public/images/anargya/        imagery dan logo dari sumber resmi
public/images/shop/collection/ mockup sepuluh produk konsep
public/images/team/           silhouette placeholder anggota
public/fonts/                 Inter dan lisensi OFL
public/pwa/                   ikon aplikasi
public/sw.js                  service worker untuk konten publik
scripts/                      migrasi, seed, setup admin
supabase/migrations/          migrasi SQL versioned
tests/                       pengujian commerce, PWA, dan browser
```

Homepage berada di `src/app/page.tsx`. Commerce tetap menggunakan backend di aplikasi Next.js yang sama; tidak membutuhkan aplikasi backend terpisah.

## Pemeriksaan

```bash
npm run lint
npm run typecheck
npm run test:pwa
npm run build
```

Pengujian database dan API membutuhkan database pengujian terpisah melalui `TEST_DATABASE_URL`:

```bash
npm run test:commerce
```

Jangan arahkan database pengujian ke database production. Gunakan database disposable yang terpisah untuk pengujian commerce. Script browser di `tests/` membutuhkan Playwright yang disediakan terpisah; beberapa script berasal dari layout sebelumnya dan perlu ditinjau sebelum dipakai ulang.

Audit sebelumnya mencakup lint, TypeScript, production build, product CRUD, autentikasi admin, checkout, idempotency, perubahan stok, pembatalan/restock, persistence Supabase, dan responsive shop pada 1440px, 768px, serta 390px. Pengujian production-mode lokal juga memverifikasi registrasi worker dan fallback offline. Hasil tersebut mencatat kondisi pada saat audit, bukan jaminan pengujian ulang untuk setiap deployment.

Production `/shop` telah diverifikasi merender sepuluh produk setelah penambahan CA Supabase. Login admin yang berhasil dengan password pemilik, instalasi di perangkat fisik, serta offline lintas browser tetap perlu diperiksa pada deployment final.

## PWA dan offline

Home dan halaman company profile yang pernah dikunjungi dapat ditampilkan dari cache, bersama aset publik yang sudah dimuat. Jika halaman belum tersedia, aplikasi menggunakan `/offline` sebagai fallback.

Respons shop, checkout, API, admin, POST, dan data pelanggan tidak disimpan dalam offline cache. Checkout dan pengelolaan admin membutuhkan koneksi online. Update worker menggunakan kontrol reload yang terlihat; availability instalasi tergantung dukungan browser. Naikkan versi cache di `public/sw.js` saat merilis perubahan kebijakan cache.

## Deployment

Website sudah tersedia di [special-task-anargya.vercel.app](https://special-task-anargya.vercel.app/).

Untuk konfigurasi ulang Vercel:

1. Import repository ini dan pilih direktori yang berisi `package.json` sebagai Root Directory.
2. Gunakan preset Next.js, install command `npm ci`, build command `npm run build`, dan Node.js 22+ yang didukung platform.
3. Set `DATABASE_URL`, `DATABASE_SSL_CA`, `ADMIN_PASSWORD_HASH`, dan `APP_ORIGIN` pada environment **Production**. Untuk situs ini, `APP_ORIGIN=https://special-task-anargya.vercel.app`.
4. Salin hash admin secara lengkap tanpa surrounding quotes; password login harus sesuai hash pada deployment tersebut. Konfigurasi local dan Vercel terpisah.
5. Redeploy setelah memperbarui environment variable. Perubahan tidak diterapkan ke deployment yang sudah berjalan.

Jangan gunakan prefix `NEXT_PUBLIC_` untuk kredensial server. Jangan commit `.env.local`, `.data/`, database URL, password, sesi, atau data pelanggan lokal. `MIGRATION_DATABASE_URL` bersifat opsional untuk maintenance lokal dan tidak diperlukan oleh runtime aplikasi.

Driver memakai pool server-side maksimal tiga koneksi per instance, Supabase Transaction pooler, dan verifikasi sertifikat TLS. Persistence tidak bergantung pada filesystem Vercel. Jangan gunakan static export, Edge runtime untuk route database, atau menonaktifkan verifikasi TLS.

## Halaman dan desain

| Halaman | Route |
| --- | --- |
| Home | [`/`](https://special-task-anargya.vercel.app/) |
| Team | [`/team`](https://special-task-anargya.vercel.app/team) |
| Vehicles | [`/vehicles`](https://special-task-anargya.vercel.app/vehicles) |
| Achievements | [`/achievements`](https://special-task-anargya.vercel.app/achievements) |
| Research | [`/research`](https://special-task-anargya.vercel.app/research) |
| Sponsors dan Contact | [`/sponsors`](https://special-task-anargya.vercel.app/sponsors) |
| Shop | [`/shop`](https://special-task-anargya.vercel.app/shop) |
| Cart | [`/shop/cart`](https://special-task-anargya.vercel.app/shop/cart) |
| Checkout simulasi | [`/shop/checkout`](https://special-task-anargya.vercel.app/shop/checkout) |
| Admin sign-in | [`/admin/login`](https://special-task-anargya.vercel.app/admin/login) |

Referensi desain: [Anargya ITS — Website Design di Figma](https://www.figma.com/design/rOfocrKCEhJwAyOTxRF82h/Anargya-ITS-%E2%80%94-Website-Design?node-id=116-1026).

