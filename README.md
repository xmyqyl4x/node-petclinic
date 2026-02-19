# Node Petclinic

Node Petclinic is a full-stack veterinary clinic web app with:
- **React frontend** in `pet-clinic/`
- **Express API backend** in `myserver/`
- **PostgreSQL** persistence for reservations

## Stack
- Frontend: React 18, React Router, Bootstrap, Font Awesome
- Backend: Node.js, Express, pg, dotenv, cors
- Database: PostgreSQL

## PostgreSQL configuration
The backend defaults are configured for:
- Database: `node-petclinic-db`
- Username: `pwere`
- Password: `pwere`

You can override values using environment variables in `myserver/.env`:

```env
PORT=5000
PGHOST=localhost
PGPORT=5432
PGDATABASE=node-petclinic-db
PGUSER=pwere
PGPASSWORD=pwere

# for db:create only
PGADMINUSER=postgres
PGADMINPASSWORD=postgres
PGADMINDATABASE=postgres
```

## Setup

### 1) Backend
```bash
cd myserver
npm install
cp .env.example .env
```

Initialize PostgreSQL artifacts:
```bash
npm run db:create
npm run db:migrate
# or: npm run db:init
```

Start API:
```bash
npm start
```

### 2) Frontend
```bash
cd pet-clinic
npm install
npm start
```

Optional frontend API base URL (`pet-clinic/.env`):
```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

## Database scripts and artifacts
- `myserver/scripts/create-database.js`: creates role/database (`pwere` / `node-petclinic-db`) if missing
- `myserver/scripts/run-migrations.js`: applies SQL migrations in `myserver/sql`
- `myserver/sql/001_create_reservations_table.sql`: creates `reservations` table and indexes

## API endpoints
- `GET /` - server status message
- `GET /api/health` - checks database connectivity
- `POST /api/reservations` - creates reservation
- `GET /api/reservations` - lists reservations

## Frontend ↔ Database connectivity
Frontend calls API endpoints (`/api/reservations`) from the booking component. The API persists and reads reservation data from PostgreSQL, so booking and reservation list UI now run on PostgreSQL-backed storage.
