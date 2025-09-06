# eXXellent Nights! — Frontend (React + Vite + TypeScript)

Full-featured frontend for the Hotel Manager backend.

## Features
- Rooms list with filters (type, minibar, available) + pagination
- Create/Edit/Delete rooms
- React Query for data fetching & cache (with Devtools)
- React Hook Form + Zod for validation
- React Router for navigation
- TailwindCSS for styling

## Run
```bash
npm ci
cp .env.example .env   # optional
npm run dev
# open http://localhost:5173
```
Backend must be available at `VITE_API_BASE_URL` (default `http://localhost:8080`).
