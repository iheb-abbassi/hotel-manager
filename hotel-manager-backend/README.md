# eXXellent Nights! — Hotel Manager (Backend)

Spring Boot backend for managing hotel rooms at **eXXellent Nights!**  
Includes CRUD, filtering, **soft delete**, Swagger docs, seed data, and Docker setup.

## ✨ Features
- Manage rooms (create, read by number, update, delete **soft**)
- List rooms with optional filters (type, minibar, availability) — pagination-ready
- **Single DTO:** `RoomDTO` used for both input and output
- Soft delete with `deleted` flag and `deleted_at` timestamp
- Swagger/OpenAPI at `/swagger-ui.html`
- Dev/test data seeder (3 rooms on boot)
- Flyway migration, clean layered architecture
- Docker Compose for one-command run (Postgres + app)

## 🧱 Stack
- Java 21, Spring Boot 3 (Web, Validation, Data JPA, Actuator)
- PostgreSQL 16, Flyway
- springdoc-openapi
- JUnit 5

## 📦 Package layout
```
com.freenow
├─ config/             # OpenAPI config, seeders
├─ controller/         # REST endpoints
│  └─ mapper/          # RoomMapper (DTO<->DO)
├─ dataaccessobject/   # RoomRepository (Spring Data)
├─ datatransferobject/ # RoomDTO (single DTO)
├─ domainobject/       # RoomDO (JPA entity with soft delete)
├─ domainvalue/        # RoomType enum
├─ exception/          # Global error handling, NotFound
├─ service/            # RoomService, RoomServiceImpl
└─ util/               # (reserved)
```

## 🗄 Database schema
- Table name: **`room`** (singular)
- Partial unique index on `number` **where `deleted=false`**

## 🚀 Run locally (Docker Compose)
```bash
docker compose -f infra/docker-compose.yml up --build
# App: http://localhost:8080/swagger-ui.html
# DB:  localhost:5432  (user/pass: postgres/postgres, db: hotel)
```

Or run manually (without Docker):
```bash
docker run -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=hotel -p 5432:5432 -d postgres:16
mvn spring-boot:run
```

## 🧪 Quick API examples (also see Postman collection in /postman)
```http
POST /api/rooms
{
  "number": 101,
  "type": "DOUBLE",
  "hasMinibar": true,
  "available": true
}

GET /api/rooms/101

PUT /api/rooms/101
{
  "number": 101,
  "type": "DOUBLE",
  "hasMinibar": false,
  "available": true
}

DELETE /api/rooms/101   # soft delete
```

## 📝 Decisions
- **DTOs**: single `RoomDTO` for simplicity in this challenge.
- **Soft delete**: `@SQLDelete` + `@Where` + partial unique index.
- **Mapper naming**: `RoomMapper.makeRoomDTO(...)` / `RoomMapper.makeRoomDO(...)`
- **Singular table names**: `room`

## 🧭 Next steps (optional)
- Add dynamic filtering & pagination using `Pageable` and Specifications.
- Add Testcontainers-based integration tests.
- Add GitHub Actions CI.
