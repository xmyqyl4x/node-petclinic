# Node Petclinic Functional Design

## Overview
Node Petclinic is a full-stack clinic website and booking application.

- Frontend (`pet-clinic`): marketing pages + online booking UI
- Backend (`myserver`): REST API for reservations
- Database: PostgreSQL (`node-petclinic-db`) using credentials `pwere` / `pwere`

## Core functional modules

### 1. Site content and navigation
- Home, services, locations, and privacy policy content pages.
- Service detail pages rendered via client routes.

### 2. Booking module
- Users submit pet reservation data from the `BookOnline` form.
- Required functional data captured:
  - pet name/type
  - email
  - service type
  - doctor
  - appointment date/time
  - reminder preference

### 3. Reservation retrieval module
- Frontend loads and renders latest reservations from API.
- Displays recent reservation list under booking form.

### 4. API module
- `POST /api/reservations`: inserts a reservation row in PostgreSQL.
- `GET /api/reservations`: returns reservations sorted by creation time.
- `GET /api/health`: validates DB connectivity.

## Data design

### Database
- Name: `node-petclinic-db`
- User: `pwere`
- Password: `pwere`

### Table: `reservations`
- `id BIGSERIAL PRIMARY KEY`
- `pet_name VARCHAR(120) NOT NULL`
- `pet_type VARCHAR(60) NOT NULL`
- `email VARCHAR(255) NOT NULL`
- `service_type VARCHAR(120)`
- `doctor VARCHAR(120)`
- `appointment_date DATE NOT NULL`
- `appointment_time TIME NOT NULL`
- `reminder BOOLEAN NOT NULL DEFAULT FALSE`
- `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`

Indexes:
- `idx_reservations_appointment_date`
- `idx_reservations_created_at`

## Runtime flow
1. User opens frontend and fills booking form.
2. Frontend POSTs payload to backend API.
3. Backend inserts into PostgreSQL.
4. Frontend refreshes recent reservations list from GET API.

## DB provisioning and migrations
- `npm run db:create`: creates DB role/database artifacts.
- `npm run db:migrate`: creates required schema objects.
- `npm run db:init`: runs both in sequence.

## Configuration
All backend DB configuration is environment-driven with defaults to:
- `PGDATABASE=node-petclinic-db`
- `PGUSER=pwere`
- `PGPASSWORD=pwere`

See `myserver/.env.example` for full configuration.
