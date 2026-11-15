/**
 * Skrip Pengujian Otomatis (Automated Unit & Integration Test)
 * Sistem Manajemen Pencucian Kendaraan - Pipeline CI
 */

const {
  validasiPlatNomor,
  hitungTarifCuci,
  buatTiketAntrean
} = require('./app');

let passed = 0;
let failed = 0;

function assertEqual(actual, expected, testName) {
  if (actual === expected) {
    console.log(`  ✓ PASS: ${testName} (Nilai: ${actual})`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${testName} | Diharapkan: ${expected}, Diperoleh: ${actual}`);
    failed++;
  }
}

function assertThrows(fn, expectedMessagePart, testName) {
  try {
    fn();
    console.error(`  ✗ FAIL: ${testName} | Seharusnya melempar error tetapi berhasil`);
    failed++;
  } catch (err) {
    if (err.message.includes(expectedMessagePart)) {
      console.log(`  ✓ PASS: ${testName} (Error tertangkap: "${err.message}")`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${testName} | Pesan error tidak sesuai: "${err.message}"`);
      failed++;
    }
  }
}

console.log('========================================================');
console.log('SISTEM PENCUCIAN KENDARAAN - AUTOMATED CI TEST RUNNER');
console.log('========================================================\n');

// Test Case 1: Perhitungan Tarif Cuci Normal (Non-Member)
console.log('[TC-01] Pengujian Perhitungan Tarif Cuci Normal (Non-Member)');
const tarifMotor = hitungTarifCuci('motor', 'salju', false);
assertEqual(tarifMotor.hargaNormal, 20000, 'Harga cuci salju motor Rp20.000');
assertEqual(tarifMotor.diskon, 0, 'Non-member tidak mendapat diskon (Rp0)');
assertEqual(tarifMotor.totalBayar, 20000, 'Total bayar cuci salju motor Rp20.000');

// Test Case 2: Perhitungan Tarif Cuci Member (Diskon 10%)
console.log('\n[TC-02] Pengujian Perhitungan Diskon Member 10% (Mobil Cuci Salju)');
const tarifMobilMember = hitungTarifCuci('mobil', 'salju', true);
assertEqual(tarifMobilMember.hargaNormal, 60000, 'Harga normal cuci salju mobil Rp60.000');
assertEqual(tarifMobilMember.diskon, 6000, 'Potongan diskon member 10% sebesar Rp6.000');
assertEqual(tarifMobilMember.totalBayar, 54000, 'Total bayar setelah diskon member Rp54.000');

// Test Case 3: Validasi Format Plat Nomor Kendaraan (Sulawesi Tengah - DN)
console.log('\n[TC-03] Pengujian Validasi Plat Nomor Kendaraan');
assertEqual(validasiPlatNomor('DN 1234 AB'), true, 'Plat nomor valid "DN 1234 AB" diterima');
assertEqual(validasiPlatNomor('INVALID-123'), false, 'Plat nomor salah format "INVALID-123" ditolak');

// Test Case 4: Pembuatan Tiket Antrean Pencucian Kendaraan Valid
console.log('\n[TC-04] Pengujian Pembuatan Tiket Antrean Kendaraan');
const tiket = buatTiketAntrean(1, 'Budi Santoso', 'dn 4567 xy', 'suv', 'detailing', true);
assertEqual(tiket.kodeAntrean, 'MBL-001', 'Kode antrean otomatis terformat MBL-001');
assertEqual(tiket.platNomor, 'DN 4567 XY', 'Plat nomor otomatis dinormalisasi ke huruf kapital');
assertEqual(tiket.totalBayar, 135000, 'Total bayar SUV detailing member (Rp150.000 - Rp15.000 = Rp135.000)');
assertEqual(tiket.status, 'Menunggu Pencucian', 'Status awal tiket adalah Menunggu Pencucian');

// Test Case 5: Penanganan Error pada Input Tidak Valid
console.log('\n[TC-05] Pengujian Penanganan Error (Negative Test)');
assertThrows(
  () => hitungTarifCuci('pesawat', 'reguler', false),
  'tidak valid',
  'Menolak jenis kendaraan yang tidak terdaftar'
);
assertThrows(
  () => buatTiketAntrean(2, 'Andi', '12345', 'motor', 'reguler', false),
  'Format plat nomor',
  'Menolak pembuatan tiket jika plat nomor tidak valid'
);

const total = passed + failed;
const rate = ((passed / total) * 100).toFixed(1);
console.log('\n========================================================');
console.log('RINGKASAN HASIL PENGUJIAN CI (TEST SUMMARY)');
console.log('========================================================');
console.log(`Total Assertions : ${total}`);
console.log(`Passed           : ${passed} ✓`);
console.log(`Failed           : ${failed} ✗`);
console.log(`Success Rate     : ${rate}%`);
console.log('========================================================');

process.exit(failed > 0 ? 1 : 0);
