# project_bank_sampah
# UAS Pengembangan Perangkat Lunak(CIE515)
Dosen: Bp. Munawar, S.TP, MM, Ph.D
Kelas: EU101

Kelompok:
Novana         20230801276
Naily Syaroya  20230801381
Najwa Shafikah 20230801461


# Aplikasi Bank Sampah Sekolah Dasar

Aplikasi web untuk mengelola bank sampah di lingkungan sekolah dasar dengan menggunakan database lokal yang dijalankan di server sekolah. 
Sistem ini membantu pencatatan transaksi setoran dan penjualan sampah secara digital, memungkinkan pengelolaan data transaksi, customer, dan stok secara terpusat. 

# Fitur Utama
- Login Admin
- Dashboard Monitoring
- Kelola Data Master (Akun Customer, Pengepul, Jenis Sampah)
- Transaksi Setoran Sampah (Input)
- Cetak Struk & Kupon
- Transaksi Penjualan Sampah (Output)
- Laporan Transaksi & Laporan Stok
- Logout

# Teknologi Pengembangan
- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL Lts 8.4
- **Container:** Docker Desktop

# Instalasi

## Prasyarat:
1. Install [Node.js](https://nodejs.org)
2. Install [Docker Desktop](https://docker.com)
3. Browser (Chrome/Edge/Firefox)

## Langkah:
1. Buat folder yang memuat backend dan frontend secara terpisah
2. Buat file docker-compose.yml dan simpan di folder backend
3. Buka aplikasi Docker Desktop dan sign in
4. Buka command prompt, ketik cd dan masukkan lokasi folder backend
5. Ketik npm install untuk install node module
6. Sinkronisasi dengan Docker dengan ketik: docker-compose up -d
7. Tunggu phpMyAdmin dan MySQL selesai pulled
8. Buka Docker Desktop pilih containers
9. Buka browser, ketik localhost:8090 untuk membuka phpMyAdmin
10. Masukkan username: admin dan password: 1234
11. Import file database bank sampah ke phpMyAdmin
12. Buka admin, gunakan data username dan password untuk mengakses halaman login
13. Buka command prompt, ketik node index.js untuk menjalankan backend
14. Buka folder frontend dan klik login
15. Masukkan username: admin1 dan password: 1234 (sesuai data admin di phpMyAdmin)

# Cara Login untuk user:
1. Buka aplikasi Docker Desktop dan sign in
2. Buka command prompt, ketik cd lalu masukkan lokasi folder backend
3. Ketik node index.js
4. Buka folder frontend, klik login
5. Masukkan username: admin1 dan password: 1234
**Catatan**:
Selama menjalankan aplikasi, jangan logout atau menutup Docker Desktop dan jangan menutup jendela command prompt.
Karena selama aplikasi berjalan, data yang diinput akan terupdate otomatis pada database, jika ditutup maka database tidak akan terupdate.

# Manual Operasi
1. Login dengan username: admin1 dan password: 1234
2. Tambahkan data customer pada Kelola Akun dengan:
   - mengisi nama siswa atau guru
   - pilih kategori: siswa atau guru
   - input kelas: siswa ketik angka antara 1 - 6, guru ketik N/A
   - status: aktif
   - simpan
   Klik edit, jika terjadi kekeliruan dalam mengisi data
4. Tambahkan data pengepul pada Kelola Pengepul dengan:
   - mengisi nama pengepul
   - mengisi nomor telepon
   - status: aktif
   - simpan
   Klik edit, jika terjadi kekeliruan dalam mengisi data
5. Tambahkan data jenis sampah pada Kelola Jenis Sampah dengan:
   - mengisi nama jenis sampah
   - masukkan data stok awal
   - masukkan harga sampah (untuk harga pada Transaksi Input)
   - status: aktif 
   - simpan
   Klik edit, jika terjadi kekeliruan dalam mengisi data
6. Pada Transaksi Input:
   - pilih ID Customer
   - input berat
   - simpan
   - muncul struk dan kupon hasil transaksi
   - cetak struk dan kupon
7. Pada Transaksi Output:
   - pilih ID Pengepul
   - input berat dan harga jual (berubah-ubah)
   - simpan
8. Klik Dashboard untuk menampilkan ringkasan transaksi secara real-time
9. Lihat Laporan Transaksi:
   - lihat laporan transaksi
   - lakukan pencarian berdasarkan keyword ID Transaksi, ID Customer, atau jenis sampah (jika diperlukan)
   - lakukan filter berdasarkan tanggal/bulan/tahun (jika diperlukan)
   - cetak laporan
10. Lihat Laporan Stok:
   - lihat laporan stok
   - lakukan filter berdasarkan bulan dan tahun, klik tampilkan (jika diperlukan)
   - reset jika ingin melihat bulan dan tahun lain
   - cetak laporan
11. Klik logout untuk keluar dari sesi aplikasi
