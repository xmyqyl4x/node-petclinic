# Node Petclinic

Node Petclinic is a portfolio-style full-stack web application for a veterinary clinic. It combines a React single-page frontend (`pet-clinic`) with a Node.js/Express API server (`myserver`) that persists online reservation submissions in MongoDB. The app includes marketing content, service detail pages, location maps, and an online booking workflow.

## 1) Key frameworks, technologies, and libraries

### Frontend (`pet-clinic`)
- **React 18** for component-driven UI composition.
- **React Router DOM v6** for route-based pages such as `/spa-and-wellness`, `/surgery`, and `/privacy-policy`.
- **React Scripts (Create React App)** for local dev server and production bundling.
- **Bootstrap CSS/JS** for layout and carousel behavior.
- **Font Awesome** icons for social media links in the footer.
- **Custom CSS** in `src/assets/style.css` for branding and page-specific styling.

### Backend (`myserver`)
- **Node.js + Express** for REST endpoints.
- **MongoDB Node Driver** (`mongodb`) to connect to MongoDB Atlas and persist reservation records.
- **body-parser** for JSON request parsing.
- **cors** to allow cross-origin requests from the frontend.

### Data layer
- **MongoDB Atlas (or compatible MongoDB instance)**.
- Uses database `test` and collection `reservations`.

## 2) Repository layout

```text
node-petclinic/
├── pet-clinic/              # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── myserver/                # Express API backend
│   ├── server.js
│   └── package.json
├── package.json             # Root dependencies (currently API-oriented)
└── README.md
```

## 3) Functional overview

- The frontend renders a landing-style clinic website with sections for:
  - Home and value proposition
  - Special offers
  - Service carousel and deep-link pages (Spa/Wellness, Surgery)
  - Booking form
  - Locations and embedded maps
  - Footer with privacy policy and social links
- The booking form submits JSON to `POST /api/reservations`.
- The backend inserts submitted payloads into MongoDB.
- `GET /api/reservations` returns all reservation records.

## 4) Setup and local development

## Prerequisites
- Node.js 18+ (recommended)
- npm 9+
- Access to a MongoDB instance (Atlas recommended)

### A. Backend setup (`myserver`)

1. Install dependencies (from the backend folder):
   ```bash
   cd myserver
   npm install express mongodb body-parser cors
   ```

2. Configure MongoDB connection in `myserver/server.js`.
   - Replace the placeholder URI string (`"secret"`) with a real MongoDB connection string.
   - Recommended: move the URI to an environment variable (e.g., `MONGODB_URI`) and read it from `process.env`.

3. Run API server:
   ```bash
   npm start
   ```

4. Verify service:
   - `GET http://localhost:5000/` should return a health response.

### B. Frontend setup (`pet-clinic`)

1. Install dependencies:
   ```bash
   cd pet-clinic
   npm install
   ```

2. Ensure CSS dependencies are present (if missing in your lockfile/environment):
   ```bash
   npm install bootstrap
   ```

3. Start development server:
   ```bash
   npm start
   ```

4. Open:
   - `http://localhost:3000`

### C. Run full stack locally

Use two terminals:

- Terminal 1: run backend on port `5000` from `myserver`
- Terminal 2: run frontend on port `3000` from `pet-clinic`

The booking form sends requests to `http://localhost:5000/api/reservations`.

## 5) Build process

### Frontend production build
```bash
cd pet-clinic
npm run build
```
- Output is generated in `pet-clinic/build/`.

### Backend
- The backend is plain Node.js and does not require transpilation.
- Deploy by shipping `myserver` source with production dependencies.

## 6) Deployment guidance

## Frontend deployment (static hosting)
You can deploy `pet-clinic/build` to static hosts such as Netlify, Vercel, S3+CloudFront, or GitHub Pages.

Notes:
- `pet-clinic/public/_redirects` exists and can be used for SPA route fallback on Netlify-style hosts.
- Ensure all client-side routes resolve to `index.html`.

## Backend deployment (Node host)
Deploy `myserver` to a Node-capable platform (Render, Railway, Fly.io, Heroku alternatives, etc.).

Minimum configuration:
- `PORT` environment variable (if platform assigns one)
- MongoDB connection string (recommended via `MONGODB_URI`)
- Install backend dependencies (`express`, `mongodb`, `body-parser`, `cors`)
- Start command: `node server.js`

## Production architecture recommendation
- Host frontend as static assets on CDN.
- Host backend as a separate API service.
- Restrict CORS to the frontend domain(s).
- Protect Mongo credentials in secrets manager / environment variables.

## 7) Current implementation caveats observed during review

- MongoDB URI is hardcoded as a placeholder in backend source.
- Backend package manifest does not currently declare all runtime dependencies used by `server.js`.
- Booking form state includes naming inconsistencies (`appointmentm_time` vs `appointment_time`; reset fields do not match initial shape), which may affect data quality.
- No automated test suite is currently defined at repository root or backend package level.

## 8) Quick command reference

```bash
# Backend
cd myserver
npm install express mongodb body-parser cors
npm start

# Frontend
cd pet-clinic
npm install
npm run build
npm start
```
