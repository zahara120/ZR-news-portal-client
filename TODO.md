# P2-Challenge-2 (Client Side)

- Tema Aplikasi: ...

Struktur Folder:

- server (PORT: 3000)
- client-public
- client-cms

## W2D1

### Web Layouting

Buatlah web layouting menggunakan HTML dan CSS (boleh menggunakan CSS framework) untuk aplikasi client kamu meliputi halaman:

- [ ] **Public site**
  - [ ] Halaman Home/Landing Page
    - Halaman yang berfungsi untuk menampilkan data Entitas Utama berbentuk Card, tambahkan input search/filter dan pagination pada halaman ini, buatlah halaman ini dengan layout yang rapi dan semenarik mungkin.
  - [ ] Halaman Detail
    - Buatlah Halaman yang berisi detail dari Entitas Utama.

- [ ] **CMS site**
  - [ ] Halaman Login
    Pada halaman ini buatlah sebuah form untuk menampung input email dan password user yang digunakan untuk masuk ke CMS
  - [ ] Halaman list entitas utama . Tampilkan data entity dalam bentuk Tabel .
  - [ ] Navbar / Sidebar yang berfungsi sebagai navigasi halaman.
  - [ ] Halaman create entitas utama
    - Buatlah form yang berfungsi sebagai penampung input data entitas utama yang akan dibuat, sesuaikanlah input dengan dengan tipe yang sesuai. Untuk imgUrl buatlah input bertipe text saja.
  - [ ] Halaman edit entitas utama
    - Buatlah form yang sama persis seperti pada halaman create dengan Judul halaman/form yang berbeda.
  - [ ] Halaman upload image entitas utama
    - Buatlah sebuah halaman yang menampilkan nama/title entitas utama + gambar (yang akan diubah), beserta sebuah input berupa select File untuk property imgUrl.
  - [ ] Halaman list untuk entitas kedua. Tampilkan data entity dalam bentuk Tabel .
  - [ ] Halaman register staff
    - Pada halaman ini buatlah sebuah form untuk menampung input semua data user yang akan didaftarkan oleh admin.

## W2D2

### Generate React Project dengan build tools

Convert layout atau slicing template yang sudah dibuat ke dalam React.js:

- [ ] Coba buat React pada project hasil generate Vite
- [ ] Public site
  - [ ] Halaman Home/Landing Page
  - [ ] Halaman Detail (Public)

- [ ] CMS site
  - [ ] Halaman Login
  - [ ] Halaman list entitas utama
  - [ ] Halaman create entitas utama
  - [ ] Halaman edit entitas utama
  - [ ] Halaman upload image entitas utama
  - [ ] Halaman list untuk entitas kedua
  - [ ] Halaman register staff

## W2D3

### React Lifecycle

Integrasikan Halaman Web dengan server yang sudah kalian buat pada Challenge/Project 1 menggunakan `axios` sebagai HTTP Client. Jangan lupa untuk tampilkan pesan error dari server jika terjadi error di halaman web kalian. Untuk menampilkan pesan error / success bisa menggunakan package seperti SweetAlert dll.

Pastikan setiap pergantian tampilan terjadi secara reaktif dengan tidak me-refresh web browser mu. Pasca login berhasil, user akan dinavigasikan ke tampilan home/list.

- [ ] Public site
  - [ ] GET data entitas utama pada halaman Home/Landing Page (include: pagination, filter dan sort)
  - [ ] GET data detail entitas utama pada halaman Detail

- [ ] CMS site
  - [ ] POST pada halaman Login
  - [ ] GET data entitas utama pada halaman list entitas utama (include: pagination, filter dan sort)
  - [ ] POST pada halaman create entitas utama
  - [ ] PUT pada halaman edit entitas utama
  - [ ] DELETE untuk menghapus entitas utama
  - [ ] PATCH untuk mengupload image / mengupdate imgUrl entitas utama
  - [ ] GET data entitas kedua pada Halaman list entitas kedua
  - [ ] POST pada Halaman register staff

## W2D4

### React Router

Project web-client kalian akan terdiri dari beberapa page/route. Silahkan Implementasikan routing pada project web-client kalian:

- [ ] Public site
  - [ ] Halaman Home/Landing Page
  - [ ] Halaman Detail
- [ ] CMS site
  - [ ] Halaman Login
  - [ ] Halaman list entitas utama
  - [ ] Halaman create entitas utama (boleh menggunakan modal)
  - [ ] Halaman edit entitas utama (boleh menggunakan modal)
  - [ ] Halaman upload image untuk entitas utama (boleh menggunakan modal)
  - [ ] Halaman list untuk entitas kedua
  - [ ] Halaman register staff

### Deploy Client

Coba lakukan deployment untuk client (bisa coba deploy hal sederhana terlebih dahulu seperti halaman yang menampilkan ‘hello world’) menggunakan Firebase

- [ ] Deploy client
