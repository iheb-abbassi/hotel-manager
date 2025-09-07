# Hotel Manager – Backend

Spring Boot REST API for Hotel Manager.

## ✨ Features
- Manage rooms (create, read by number, update, delete **soft**)
- List rooms with optional filters (type, minibar, availability) — pagination-ready
- Soft delete with `deleted` flag and `deleted_at` timestamp
- Swagger/OpenAPI at `/swagger-ui.html`
- Dev/test data seeder (3 rooms on boot)


## The architecture of the web service is built with the following components:
- DataTransferObjects: Objects which are used for outside communication via the API
- Controller: Implements the processing logic of the web service, parsing of parameters and validation of in- and outputs.
- Service: Implements the business logic and handles the access to the DataAccessObjects.
- DataAccessObjects: Interface for the database. Inserts, updates, deletes and reads objects from the database.
- DomainObjects: Functional Objects which might be persisted in the database.

## 🚀 Tech Stack
- Java 21
- Spring Boot 3
- PostgreSQL
- JPA + Hibernate
- Swagger / OpenAPI
- JUnit 5 + Mockito
- Flyway migrations


## 🚀 Run locally (Docker Compose)
```bash
- first time run:
- docker compose -f infra/docker-compose.yml up --build
- Subsequent runs
- docker compose -f infra/docker-compose.yml up
# App: http://localhost:8080/swagger-ui.html
```


