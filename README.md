# Node Petclinic

Node Petclinic is a simplified clinic website composed of:
- **React frontend** in `pet-clinic/`
- **Express backend** in `myserver/`
- **PostgreSQL** connectivity for backend health checks

## Current frontend scope
- Home page
- Privacy Policy page
- Footer links/social links

## Current backend scope
- `GET /` basic server message
- `GET /api/health` database connectivity check

## PostgreSQL defaults
- Database: `node-petclinic-db`
- Username: `pwere`
- Password: `pwere`

Environment variables (`myserver/.env`):
```env
PORT=5000
PGHOST=localhost
PGPORT=5432
PGDATABASE=node-petclinic-db
PGUSER=pwere
PGPASSWORD=pwere
```

## Run locally
### Backend
```bash
cd myserver
npm install
cp .env.example .env
npm start
```

### Frontend
```bash
cd pet-clinic
npm install
npm start
```
