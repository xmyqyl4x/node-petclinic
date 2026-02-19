# Node Petclinic

Node Petclinic is a full-stack veterinary clinic web application composed of:
- a **React frontend** in `pet-clinic/`
- an **Express API backend** in `myserver/`
- a **PostgreSQL** database used to persist reservation data

This README reflects the current PostgreSQL architecture (MongoDB is no longer used).

## Architecture Overview

### Frontend (`pet-clinic`)
- React 18 application with React Router
- Booking UI in `src/components/BookOnline.js`
- Calls backend APIs using `REACT_APP_API_BASE_URL` (defaults to `http://localhost:5000`)

### Backend (`myserver`)
- Node.js + Express REST API
- PostgreSQL access via `pg` connection pool (`myserver/config/db.js`)
- Environment variables managed through `dotenv`

### Database
- PostgreSQL database name: **`node-petclinic-db`**
- PostgreSQL user: **`pwere`**
- PostgreSQL password: **`pwere`**
- Reservation schema managed through SQL migration files in `myserver/sql/`

---

## Tech Stack

- **Frontend**: React, React Router, Bootstrap, Font Awesome
- **Backend**: Express, pg, dotenv, cors
- **Database**: PostgreSQL

---

## Repository Structure

```text
node-petclinic/
├── pet-clinic/                 # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── myserver/                   # Express + PostgreSQL backend
│   ├── config/db.js            # pg Pool configuration
│   ├── scripts/
│   │   ├── create-database.js  # creates DB role/database artifacts
│   │   └── run-migrations.js   # executes SQL migrations
│   ├── sql/
│   │   └── 001_create_reservations_table.sql
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── README.md
```

---

## PostgreSQL Configuration

Backend defaults are configured for:
- `PGDATABASE=node-petclinic-db`
- `PGUSER=pwere`
- `PGPASSWORD=pwere`

Create `myserver/.env` from the example:

```bash
cd myserver
cp .env.example .env
```

Example values:

```env
PORT=5000

PGHOST=localhost
PGPORT=5432
PGDATABASE=node-petclinic-db
PGUSER=pwere
PGPASSWORD=pwere

# Admin connection used for db:create only
PGADMINUSER=postgres
PGADMINPASSWORD=postgres
PGADMINDATABASE=postgres
```

---

## Local Setup

## 1) Backend setup

```bash
cd myserver
npm install
cp .env.example .env
```

Create DB role/database and schema:

```bash
npm run db:create
npm run db:migrate
# or run both:
npm run db:init
```

Start backend API:

```bash
npm start
```

API runs on `http://localhost:5000` by default.

## 2) Frontend setup

```bash
cd pet-clinic
npm install
npm start
```

Optional frontend `.env` (`pet-clinic/.env`):

```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

Frontend runs on `http://localhost:3000` by default.

---

## Build

### Frontend production build

```bash
cd pet-clinic
npm run build
```

Build output is generated in `pet-clinic/build/`.

### Backend

Backend is plain Node.js and does not require transpilation.

---

## Database Artifacts and Scripts

### SQL Migration
- `myserver/sql/001_create_reservations_table.sql`
  - Creates `reservations` table
  - Creates indexes:
    - `idx_reservations_appointment_date`
    - `idx_reservations_created_at`

### Script Commands (`myserver/package.json`)
- `npm run db:create` – creates role/database artifacts
- `npm run db:migrate` – applies SQL migrations
- `npm run db:init` – runs create + migrate

---

## API Endpoints

- `GET /`
  - Basic server message
- `GET /api/health`
  - Reports database connectivity
- `POST /api/reservations`
  - Inserts reservation into PostgreSQL
- `GET /api/reservations`
  - Returns reservations ordered by most recent

---

## Frontend ↔ Database Flow

1. User submits the booking form in `BookOnline`.
2. Frontend sends request to `POST /api/reservations`.
3. Backend writes reservation to PostgreSQL (`reservations` table).
4. Frontend loads latest reservations via `GET /api/reservations` and displays recent items.

---

## Notes

- MongoDB-related architecture has been replaced by PostgreSQL.
- Ensure PostgreSQL is running and accessible before starting the API.
- If using non-local or managed PostgreSQL, set `PGHOST`, `PGPORT`, and credentials accordingly.
