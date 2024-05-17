# Binar Car Rental

## Entity Relation Diagram

![ERD](docs/ERD.png)

## Initializing Environment

1. Update data `.env` dari `.env.example`
2. Menjalankan `npm i`
3. Default URL: `http://localhost:5000`

Command used:

* Migrate data: `npx knex migrate:latest`
* Seed data: `npx knex seed:run`
* Menjalankan server: `npm run dev`

## Route Lists

Berikut adalah list rute yang tersedia pada project ini:

| Method | URI | Link |
| :--: | --- | --- |
| GET | /cars | [Get cars](#get-cars) |
| GET | /cars/:id | [Get cars by id](#get-carsid) |
| POST | /cars | [Add cars](#post-cars) |
| PUT | /cars/:id | [Update cars](#put-carsid) |
| DELETE | /cars/:id | [Delete cars](#delete-carsid) |

---

### GET `/cars`

Request:

```json
-
```

Response:

```json
[
    {
        "id": 1,
        "name": "Toyota",
        "price": 100000,
        "photo": "https://via.placeholder.com/150",
        "category": 1,
        "start_rent": "2024-05-16T13:10:16.065Z",
        "finish_rent": "2024-05-16T13:10:16.065Z",
        "created_at": "2024-05-16T13:10:16.066Z",
        "updated_at": "2024-05-16T13:10:16.066Z"
    }
]
```

---

### GET `/cars/:id`

Contoh: GET `/cars/3`

Request

```json
-
```

Response:

```json
{
    "id": 3,
    "name": "Suzuki",
    "price": 300000,
    "photo": "https://via.placeholder.com/150",
    "category": 3,
    "start_rent": "2024-05-16T13:10:16.065Z",
    "finish_rent": "2024-05-16T13:10:16.065Z",
    "created_at": "2024-05-16T13:10:16.066Z",
    "updated_at": "2024-05-16T13:10:16.066Z"
}
```

---

### POST `/cars`

Request `body/form-data`: (dalam bentuk bulk edit)

```json
name:Avanza
price:19000
category:2
start_rent:2024-05-19
finish_rent:2024-05-30
photo (file)
```

Response:

```json
{
    "name": "Avanza",
    "price": 19000,
    "category": 2,
    "start_rent": "2024-05-19T00:00:00.000Z",
    "finish_rent": "2024-05-30T00:00:00.000Z",
    "photo": "http://res.cloudinary.com/dboyttglo/image/upload/v1715948950/lxwspooprfiwqnjfwpiz.png",
    "id": 12,
    "created_at": "2024-05-17T12:29:10.562Z",
    "updated_at": "2024-05-17T12:29:10.562Z"
}
```

---

### PUT `/cars/:id`

Contoh: PUT `/cars/3`

Request `body/form-data`: (dalam bentuk bulk edit)

```json
name:Avanza 11
price:3000
category:1
start_rent:2024-05-19
finish_rent:2024-05-20
photo (file)
```

Response:

```json
{
    "message": "Data telah diupdate",
    "data": {
        "id": 3,
        "name": "Avanza 11",
        "price": 3000,
        "photo": "http://res.cloudinary.com/dboyttglo/image/upload/v1715949104/mxhart7bgzdgizlesa8x.png",
        "category": 1,
        "start_rent": "2024-05-19T00:00:00.000Z",
        "finish_rent": "2024-05-20T00:00:00.000Z",
        "created_at": "2024-05-16T13:10:16.066Z",
        "updated_at": "2024-05-17T12:31:44.096Z"
    }
}
```

---

### DELETE `/cars/:id`

Contoh: DELETE `/cars/3`

Request:

```json
-
```

Response:

```json
{
    "message": "Data telah dihapus"
}
```