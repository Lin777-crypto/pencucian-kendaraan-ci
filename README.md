# Sistem Manajemen Pencucian Kendaraan (`pencucian-kendaraan-ci`)

Repositori ini merupakan proyek kelompok untuk **Tugas Team-Based Project (TBP): Praktik Pipeline Continuous Integration (CI)** pada Mata Kuliah **Rekayasa Perangkat Lunak (F09252010)**, Program Studi S1 Teknik Informatika, Fakultas Teknik, Universitas Tadulako.

## Anggota Kelompok (3 Orang)
1. **Juan Terrin K. Samatimbang** (`F5512520051`) — *CI/CD Pipeline Architect & Backend Developer*
2. **Linolian** (`[NIM Menyusul]`) — *Quality Assurance (QA) & Test Automation Engineer*
3. **Ryan Prasetya** (`[NIM Menyusul]`) — *Documentation & Pull Request Reviewer*

## Struktur Berkas Proyek
```text
pencucian-kendaraan-ci/
├── .github/
│   └── workflows/
│       └── ci.yml           # Konfigurasi workflow GitHub Actions (push & pull_request)
├── app.js                   # Modul utama perhitungan tarif, diskon member, & tiket antrean cuci
├── app-versi-gagal.js       # Contoh kode dengan bug perhitungan diskon untuk simulasi Failed Run
├── test-runner.js           # Skrip pengujian otomatis (5 Test Cases / 14 Assertions)
├── package.json             # Konfigurasi proyek serta skrip npm run build & npm test
└── README.md                # Dokumentasi singkat cara menjalankan CI
```

## Cara Menjalankan Build & Pengujian Secara Lokal
Pastikan **Node.js** (versi 18.x atau 20.x LTS) telah terpasang di perangkat Anda, lalu jalankan perintah berikut di terminal:

1. **Instalasi Dependensi**
   ```bash
   npm install
   ```
2. **Menjalankan Pemeriksaan Build / Sintaks Lokal**
   ```bash
   npm run build
   ```
3. **Menjalankan Pengujian Otomatis (Unit & Integration Test)**
   ```bash
   npm test
   ```

## Cara Kerja Workflow CI di GitHub Actions
Berkas `.github/workflows/ci.yml` akan dieksekusi secara otomatis oleh **GitHub Actions** setiap kali terdapat aktivitas `push` atau `pull_request` ke cabang `main` / `master` dengan tahapan:
1. **Checkout Repository Code** (`actions/checkout@v4`)
2. **Setup Node.js 20.x** (`actions/setup-node@v4`)
3. **Install Dependencies** (`npm install`)
4. **Run Build & Syntax Check** (`npm run build`)
5. **Run Automated Tests** (`npm test`)
