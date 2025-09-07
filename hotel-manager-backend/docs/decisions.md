# 📝 Development Decisions – Hotel Manager

This document records the **basic decisions** made during the development of the Hotel Manager application.  
It serves as a reference for new colleagues who will further develop and maintain the project.

---

## 1. Database Choice
- **Decision**: Use **PostgreSQL** (SQL) instead of MongoDB (NoSQL).
- **Reasoning**: The hotel domain is relational (rooms, bookings in the future) and requires strong consistency and structured queries. SQL makes reporting and filtering easier.

---

## 2. Domain & DTO Separation
- **Decision**: Distinguish between **RoomDO** (domain object, persisted in DB) and **RoomDTO** (data transfer object for API).
- **Reasoning**: Keeps internal persistence details separate from API representation. Easier to evolve API without breaking DB schema.

---

## 3. Deletion Strategy
- **Decision**: Implement **soft delete** (`deleted = true`) instead of physical deletion.
- **Reasoning**: Preserves history and prevents accidental data loss. Deleted rooms remain in the database for auditing or restoration.

---

## 4. Project Structure
- **Decision**: Follow layered architecture with clear separation:
    - `controller` – REST endpoints
    - `service` – business logic
    - `dataaccessobject` – repositories
    - `domainobject` – persisted entities
    - `datatransferobject` – API-facing objects
    - `mapper` – conversions between DO and DTO

---

## 5. Testing Strategy
- **Decision**: Apply testing at three levels:
    - **Unit tests** (Service layer, business logic)
    - **Integration tests** (DB + API flows using Spring Boot Test)
    - **E2E tests** (Playwright for full user flows)

---

## 6. CI/CD Pipeline
- **Decision**: Use **GitHub Actions** for Continuous Integration, **Render** for backend deployment, **Vercel** for frontend deployment.

---

## 7. Future Considerations
- Add authentication & authorization (JWT or OAuth2).
- Improve monitoring & observability (logging, metrics, tracing).
- Extend domain model to support bookings, pricing, and guests.  
