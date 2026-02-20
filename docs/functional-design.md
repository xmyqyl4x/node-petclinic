# Node Petclinic Functional Design

## Overview
Node Petclinic is a lightweight clinic website application.

- Frontend (`pet-clinic`): home + privacy policy experience
- Backend (`myserver`): basic API service and health endpoint
- Database: PostgreSQL (`node-petclinic-db`) using credentials `pwere` / `pwere`

## Core functional modules

### 1. Site content and navigation
- Home page content
- Privacy policy page
- Footer links and social links

### 2. API module
- `GET /`: server status message
- `GET /api/health`: validates PostgreSQL connectivity

## Runtime flow
1. User opens frontend and browses informational content.
2. Operators can use API health endpoint to validate database connectivity.

## Configuration
Backend DB configuration defaults:
- `PGDATABASE=node-petclinic-db`
- `PGUSER=pwere`
- `PGPASSWORD=pwere`

See `myserver/.env.example` for full configuration.
