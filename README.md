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

## 🚀 Live Demo

- **Frontend (Vercel)**: [https://hotel-manager-pi.vercel.app](https://hotel-manager-pi.vercel.app)
- **Backend API (Render)**: [https://hotel-manager-wtan.onrender.com/swagger-ui.html](https://hotel-manager-wtan.onrender.com/swagger-ui.html)

---

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
