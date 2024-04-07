Holiday
Exercise Human Resource
Study Case
“Anda merupakan seorang Fullstack Developer yang tergabung kedalam tim yang akan mendevelop sebuah project aplikasi HR untuk sebuah perusahaan.”

Tech Stack
1.Frontend
-NextJS as UI Framework
-TailwindCSS as CSS Library
-React Query with Axios for Network Call
-React Toastify

2.Backend
-ExpressTypescript as REST API Framework
-MySQL as Database Management
-Prisma as ORM Database

Specification
1.HR
-Buatlah Akun HR dengan Memasukan Datanya Secara Langsung ke Dalam Database
-HR Dapat Melakukan Registrasi untuk Karyawan Baru. Setiap Karyawan Memiliki Jabatan, Gaji dan Shift Kerja yang Berbeda-Beda.

Jabatan & Gaji:

1. Manager (Salary: Rp. 25.000.000, 00.-)
2. Project/Product Manager (Salary: Rp. 17.500.000, 00.-)
3. Programmer (Salary: Rp. 15.000.000, 00.-)

   Shift Kerja:

   1. Shift-01 (09:00-18:00)
   2. Shift-02 (13:00-22:00)

-HR Dapat Merubah ataupun Menghapus Data Karyawan.
-HR Dapat Meng-ACC Cuti Karyawan. Setelah ACC Cuti, Maka Saldo Cuti Karyawan Tersebut Otomatis Berkurang. (Default Jumlah Cuti: 12 Hari)

2.Karyawan
-Karyawan Dapat Melakukan Presensi Masuk (Clock-In) & Presensi Pulang (Clock-Out) Sesuai dengan Tanggal dan Jam yang Dipilih. Lakukan Deduction Gaji Apabila Karyawan Mengalami Keterlambatan/Pulang Lebih Cepat/Tidak Hadir Sama Sekali. Untuk Setiap 30 Menit Jam Kerja yang Hilang Akan Dipotong Sebesar 0.1% dari Gajinya. Deduction Gaji Juga Harus Tercatat Day per Day nya Seperti Berikut:

Name : Immanuel Janis
Salary : Rp. 15.000.000, 00.-
Shift : 01
Total Deduc : Rp. 45.000, 00.-
Attendance :

Date Clock-In Clock-Out Deduction
01-01-2024 08:55 18:01 0
01-02-2024 09:15 18:00 0
01-03-2024 09:33 18:01 15000
01-04-2024 09:00 17:30 15000
01-05-2024 09:15 17:45 15000

-Karyawan Dapat Mengajukan Cuti Berdasarkan Tanggal yang Dipilih. Apabila Cuti di ACC, Maka Clock-In dan Clock-Out di Tgl Pengajuan Cuti Karyawan Tersebut Akan Autocomplete by System.
