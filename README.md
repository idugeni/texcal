# Texcal

Texcal adalah aplikasi web yang dibangun menggunakan [Next.js](https://nextjs.org) dan di-bootstrap dengan [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 📋 Daftar Isi

- [Fitur](#fitur)
- [Persyaratan Sistem](#persyaratan-sistem)
- [Instalasi](#instalasi)
- [Penggunaan](#penggunaan)
- [Pengembangan](#pengembangan)
- [Deployment](#deployment)
- [Kontribusi](#kontribusi)

## ✨ Fitur

- Antarmuka pengguna modern dan responsif
- Tema terang/gelap
- Optimasi font menggunakan next/font
- Komponen UI yang dapat digunakan kembali
- Dukungan TypeScript penuh

## 💻 Persyaratan Sistem

Sebelum memulai, pastikan sistem Anda memenuhi persyaratan berikut:

- Node.js (versi 18.17 atau lebih tinggi)
- npm, yarn, pnpm, atau bun sebagai package manager

## 🚀 Instalasi

1. Clone repositori ini:
```bash
git clone [URL_REPOSITORI]
cd texcal
```

2. Install dependensi:
```bash
npm install
# atau
yarn install
# atau
pnpm install
# atau
bun install
```

## 🎮 Penggunaan

1. Jalankan server pengembangan:
```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
# atau
bun dev
```

2. Buka [http://localhost:3000](http://localhost:3000) dengan browser Anda untuk melihat hasilnya.

3. Mulai mengedit dengan memodifikasi `app/page.tsx`. Halaman akan diperbarui secara otomatis saat Anda mengedit file.

## 💡 Pengembangan

### Struktur Proyek

```
├── public/          # Aset statis
├── src/
│   ├── app/        # Routing dan halaman
│   ├── components/ # Komponen React
│   ├── hooks/      # Custom hooks
│   └── lib/        # Utilitas dan helper
├── .gitignore
├── next.config.ts
└── package.json
```

### Teknologi yang Digunakan

- [Next.js](https://nextjs.org/) - Framework React
- [TypeScript](https://www.typescriptlang.org/) - JavaScript dengan sintaks tipe
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS

## 🌐 Deployment

Cara termudah untuk men-deploy aplikasi Next.js adalah menggunakan [Platform Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dari pembuat Next.js.

Langkah-langkah deployment:

1. Push kode Anda ke repositori GitHub
2. Import proyek ke Vercel
3. Vercel akan mendeteksi bahwa Anda menggunakan Next.js dan mengaktifkan pengaturan yang sesuai
4. Deployment Anda akan dilakukan

Untuk informasi lebih lanjut, kunjungi [dokumentasi deployment Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

## 🤝 Kontribusi

Kontribusi selalu diterima dengan baik! Berikut adalah cara Anda dapat berkontribusi:

1. Fork repositori
2. Buat branch fitur (`git checkout -b fitur/AmazingFeature`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur yang mengagumkan'`)
4. Push ke branch (`git push origin fitur/AmazingFeature`)
5. Buka Pull Request

## 📝 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE](LICENSE) untuk detail.

---

Dibuat dengan ❤️ menggunakan Next.js
