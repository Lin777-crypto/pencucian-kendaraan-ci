/**
 * Modul Layanan Sistem Pencucian Kendaraan (VERSI PERBAIKAN - LULUS CI)
 * Tugas Team-Based Project (TBP) Rekayasa Perangkat Lunak - Universitas Tadulako
 *
 * Tim Pengembang:
 * 1. Juan Terrin K. Samatimbang (F5512520051)
 * 2. Linolian
 * 3. Ryan Prasetya
 */

const TARIF_DASAR = {
  motor: { reguler: 15000, salju: 20000, detailing: 35000 },
  mobil: { reguler: 45000, salju: 60000, detailing: 120000 },
  suv:   { reguler: 55000, salju: 75000, detailing: 150000 }
};

/**
 * Memvalidasi format plat nomor kendaraan Indonesia (contoh: "DN 1234 AB")
 */
function validasiPlatNomor(plat) {
  if (!plat || typeof plat !== 'string') return false;
  const bersih = plat.trim().toUpperCase();
  return /^[A-Z]{1,2}\s+\d{1,4}\s+[A-Z]{1,3}$/.test(bersih);
}

/**
 * Menghitung tarif pencucian kendaraan beserta diskon member 10%
 */
function hitungTarifCuci(jenisKendaraan, paketLayanan, isMember = false) {
  const jenis = (jenisKendaraan || '').toLowerCase();
  const paket = (paketLayanan || '').toLowerCase();

  if (!TARIF_DASAR[jenis] || !TARIF_DASAR[jenis][paket]) {
    throw new Error('Jenis kendaraan atau paket layanan tidak valid');
  }

  const hargaNormal = TARIF_DASAR[jenis][paket];
  // PERBAIKAN: Diskon member 10% mengurangi harga normal (hargaNormal - diskon)
  const diskon = isMember ? Math.round(hargaNormal * 0.10) : 0;
  const totalBayar = hargaNormal - diskon;

  return {
    jenisKendaraan: jenis,
    paketLayanan: paket,
    hargaNormal,
    diskon,
    totalBayar
  };
}

/**
 * Membuat tiket antrean pencucian kendaraan baru
 */
function buatTiketAntrean(nomorUrut, namaPelanggan, platNomor, jenisKendaraan, paketLayanan, isMember = false) {
  if (!namaPelanggan || !namaPelanggan.trim()) {
    throw new Error('Nama pelanggan wajib diisi');
  }
  if (!validasiPlatNomor(platNomor)) {
    throw new Error('Format plat nomor kendaraan tidak valid');
  }

  const rincianBiaya = hitungTarifCuci(jenisKendaraan, paketLayanan, isMember);
  const kodePrefix = jenisKendaraan.toLowerCase() === 'motor' ? 'MTR' : 'MBL';
  const kodeAntrean = `${kodePrefix}-${String(nomorUrut).padStart(3, '0')}`;

  return {
    kodeAntrean,
    namaPelanggan: namaPelanggan.trim(),
    platNomor: platNomor.trim().toUpperCase(),
    ...rincianBiaya,
    status: 'Menunggu Pencucian'
  };
}

module.exports = {
  TARIF_DASAR,
  validasiPlatNomor,
  hitungTarifCuci,
  buatTiketAntrean
};
