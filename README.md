# Hotel Manager

Full-stack demo project for hotel room management.  
Built with **React + Vite (frontend)** and **Spring Boot + PostgreSQL (backend)**.

## ✨ Features
- List all hotel rooms
- Create, update, delete rooms (soft delete)
- Filter rooms (by type, availability, minibar)
- API documented with Swagger
- CI/CD with GitHub Actions
- Deployed on Render (BE) + Vercel (FE)

## 🏗 Project Structure
```
hotel-manager/
  ├── hotel-manager-frontend/   # React + Vite app
  ├── hotel-manager-backend/    # Spring Boot API
  └── docs/                     # ADRs, architecture diagrams
```

### Backend
```bash
cd hotel-manager-backend
mvn spring-boot:run
```
Runs at: http://localhost:8080

### Frontend
```bash
cd hotel-manager-frontend
npm install
npm run dev
```
Runs at: http://localhost:5173

## 🧪 Testing
- Backend: `mvn test`
- E2E: `npx playwright test`