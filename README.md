## Introduction

API ini memungkinkan pengguna untuk mengelola daftar tugas mereka. Pengguna perlu mengautentikasi menggunakan JWT sebelum mengakses titik akhir tugas.

## Authentication

Untuk mengakses titik akhir yang dilindungi, Pengguna perlu menyertakan token JWT yang valid di header Otorisasi dengan awalan "Bearer" pada beberapa endpoint yaitu todo dan user.

## Endpoints

### Register

- **Endpoint:** `/register`
- **Method:** `POST`
- **Deskripisi:** Register user dengan memasukkan data name, email, password, dan konfirmasi_password.
- **Authentication:** Tidak ada

### Login

- **Endpoint:** `/login`
- **Method:** `POST`
- **Deskripisi:** Login user dengan memasukkan data name, dan password.
- **Authentication:** Tidak ada

### Logout

- **Endpoint:** `/logout`
- **Method:** `GET`
- **Deskripisi:** Logout user yang diautentikasi dan membatalkan token JWT
- **Authentication:** Wajib ada token

### Get User by Token

- **Endpoint:** `/user`
- **Method:** `GET`
- **Deskripisi:** Mengambil data user berdasarkan token JWT
- **Authentication:** Wajib ada token

### Get All Todo

- **Endpoint:** `/todos`
- **Method:** `GET`
- **Deskripsi:**:Mengambil data todo berdasarkan user dari token JWT
- **Authentication:** Wajib ada token

### Get Todo by ID

- **Endpoint:** `/todos/:id`
- **Method:** `GET`
- **Deskripsi:** Mengambil data todo user berdasarkan id pada todo
- **Authentication:** Wajib ada token

### Create Todo

- **Endpoint:** `/todos`
- **Method:** `POST`
- **Deskripsi:** Menambahkan todo dengan memasukan data title dan is_completed
- **Authentication:** Wajib ada token

### Update Todo

- **Endpoint:** `/todos/:id`
- **Method:** `PUT`
- **Deskripsi:** Mengubah todo berdarkan id dengan memasukan data title dan is_completed
- **Authentication:** Wajib ada token

### Delete Todo

- **Endpoint:** `/todos/:id`
- **Method:** `DELETE`
- **Deskripsi:** Menghapus todo berdasarkan id
- **Authentication:** Wajib ada token

### Delete All Todo

- **Endpoint:** `/todos`
- **Method:** `DELETE`
- **Deskripsi:** Menghapus semua todo
- **Authentication:** Wajib ada token

## Installation

- Clone repositori.
- Install dependensi: `npm install` dan sequelize-cli secara global : `npm install -g sequelize-cli`
- Membuat database dengan perintah : `sequelize-cli db:create`
- Migrasi table dengan perintah : `sequelize-cli db:migrate`
- Jalankan aplikasi: `npm start`

## Usage

- Dapatkan token JWT dengan mengautentikasi menggunakan endpoint `/login`.
- Sertakan token yang diperoleh di header Otorisasi untuk endpoint yang dilindungi.
- Gunakan endpoint yang disediakan untuk mengelola daftar tugas Anda pada `/todos` dan `/user`.