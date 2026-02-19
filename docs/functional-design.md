# Node Petclinic Functional Design Document

## 1. Purpose and scope

This document describes the functional design of the Node Petclinic application as implemented in this repository. It covers user-facing behavior, major modules, runtime interactions, data flow, and current functional constraints.

Scope includes:
- React frontend in `pet-clinic/`
- Express/MongoDB backend in `myserver/`

Out of scope:
- Deep non-functional architecture (SRE, infra as code)
- Regulatory/compliance implementation details

## 2. Product intent

Node Petclinic provides a public-facing clinic website plus online appointment booking. It is designed as a lightweight full-stack application where prospective pet owners can discover services and submit reservation requests.

## 3. Actors and user goals

### Primary actors
- **Pet owner / visitor**
  - Browse clinic information
  - Review promotions and services
  - Submit an online booking request
  - Find location/contact details

- **Clinic staff (indirect actor via API consumption)**
  - Retrieve submitted reservation records (through API)

## 4. Functional modules

## 4.1 Frontend shell and navigation

**Responsibilities**
- Render global page shell (navbar, footer).
- Render a mixed one-page/route-driven experience.

**Key behaviors**
- Main app displays `Navbar`, `Home`, `SpecialOffers`, `Services`, `BookOnline`, `Locations`, and `Footer` on the root view.
- Route-based detail pages are exposed for:
  - `/spa-and-wellness`
  - `/surgery`
  - `/privacy-policy`

**Primary files**
- `pet-clinic/src/App.js`
- `pet-clinic/src/components/Navbar.js`
- `pet-clinic/src/components/Footer.js`

## 4.2 Marketing/content modules

### Home
- Presents clinic positioning and call-to-action.
- “Book Online” button anchors to booking section.

### Special Offers
- Displays promotional cards and pricing/content blocks.

### Services
- Bootstrap carousel with two highlighted services.
- Uses client-side links to detail routes.

### Service detail pages
- Dedicated long-form pages for Spa/Wellness and Surgery.
- Include descriptive service content, images, and review blocks.

### Locations
- Shows address/phone details and embedded Google Maps iframes.

**Primary files**
- `pet-clinic/src/components/Home.js`
- `pet-clinic/src/components/SpecialOffers.js`
- `pet-clinic/src/components/Services.js`
- `pet-clinic/src/components/SpaAndWellness.js`
- `pet-clinic/src/components/Surgery.js`
- `pet-clinic/src/components/Locations.js`

## 4.3 Booking and reservation submission module

**Responsibilities**
- Collect booking details from users.
- Send reservation data to backend API.
- Inform user of submission success/failure.

**Input fields (current UI)**
- Pet name
- Pet type
- Email
- Service type
- Preferred doctor
- Appointment date
- Appointment time
- Reminder preference

**Workflow**
1. User fills out booking form.
2. On submit, frontend performs `POST` to `http://localhost:5000/api/reservations` with JSON payload.
3. On success (`2xx`), success alert is shown.
4. On failure, error alert is shown.

**Primary file**
- `pet-clinic/src/components/BookOnline.js`

## 4.4 Privacy and policy module

- Provides static terms/privacy content available at `/privacy-policy`.

**Primary file**
- `pet-clinic/src/components/PrivacyPolicy.js`

## 4.5 Backend API module

**Responsibilities**
- Accept reservation submissions.
- Persist records in MongoDB.
- Return reservation list.

**Endpoints**
- `GET /`
  - Basic service response used as lightweight health check.

- `POST /api/reservations`
  - Accepts JSON payload and inserts into MongoDB collection `reservations`.
  - Returns Mongo insert result.

- `GET /api/reservations`
  - Returns all reservation documents.

**Primary file**
- `myserver/server.js`

## 5. Data design

## 5.1 Reservation entity (as submitted)

The effective reservation document shape is flexible (schemaless insert), but intended fields include:
- `pet_name: string`
- `pet_type: string`
- `email: string`
- `service_type: string`
- `doctor: string`
- `appointment_date: string (date)`
- `appointment_time: string (time)`
- `reminder: boolean`

## 5.2 Storage
- Database: `test`
- Collection: `reservations`
- Data store: MongoDB

## 6. Runtime interaction design

## 6.1 Successful booking flow
1. Browser loads frontend.
2. User navigates to “Book Online”.
3. User submits form.
4. Frontend sends JSON to backend endpoint.
5. Backend validates request shape minimally (implicit) and inserts into MongoDB.
6. Backend returns success response.
7. Frontend shows success alert.

## 6.2 Reservation retrieval flow
1. Client/tool calls `GET /api/reservations`.
2. Backend reads all records from MongoDB.
3. API returns JSON array.

## 7. Dependencies between modules

- Booking module depends on backend API reachability at hardcoded localhost URL.
- API module depends on MongoDB connectivity during startup.
- Service pages and carousel depend on static assets in `public/`.
- Routing behavior depends on BrowserRouter setup in `src/index.js`.

## 8. Functional limitations and risks (as-is)

- Backend MongoDB URI is embedded as placeholder text; runtime requires manual replacement.
- No explicit server-side validation/sanitization for reservation payloads.
- Frontend booking model has naming mismatch (`appointmentm_time` init key vs `appointment_time` input key).
- Form reset object in booking component does not align with submitted field model.
- No authentication/authorization on reservation retrieval endpoint.
- CORS is permissive by default.

## 9. Recommended near-term functional improvements

1. **Configuration hygiene**
   - Externalize DB URI and API base URL into environment variables.

2. **Data quality**
   - Introduce frontend validation + backend schema validation.
   - Normalize reservation field names.

3. **Operational usability**
   - Add API health endpoint with dependency checks.
   - Add structured logging and error IDs.

4. **Security**
   - Restrict CORS to trusted origins.
   - Add rate limiting for reservation submission.

5. **Product capability**
   - Add admin-facing reservation list UI.
   - Add statuses (new/confirmed/cancelled) for appointments.

## 10. Acceptance criteria for this functional baseline

The current system functionally satisfies baseline behavior when:
- Frontend loads and renders all major sections.
- User can navigate to service detail pages and privacy page.
- Booking form submission reaches backend.
- Reservation record is inserted into MongoDB.
- Reservations can be retrieved via GET API.
