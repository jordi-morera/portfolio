# My To-Do List App

A small full-stack to-do list app built with Spring Boot. It serves a server-rendered web UI (Thymeleaf) backed by a REST API, so you can manage tasks from the browser or by calling the API directly.

## Features

- Create tasks with a title, description, and ETA (due date/time)
- List all tasks, or filter by status
- Mark tasks as finished
- Delete tasks

## Tech Stack

- **Java 25**
- **Spring Boot 4.1.1** (Spring Framework 7, Jakarta EE)
- **Spring Data JPA** + **Hibernate** for persistence
- **H2** in-memory database
- **Thymeleaf** for server-rendered views
- Vanilla HTML/CSS/JavaScript (`fetch`) for the frontend

## Prerequisites

- JDK 25+
- No local Maven install required — the project ships with the Maven Wrapper (`./mvnw`)

## Getting Started

```bash
git clone https://github.com/jordimorerachamorro/mytodolistapp.git
cd mytodolistapp
./mvnw spring-boot:run
```

The app starts on **http://localhost:8080**:

- `/` — task list
- `/new` — create a new task

The H2 console is available at `/h2-console` (JDBC URL `jdbc:h2:mem:todoapp`, user `admin`, password `admin`). Data is stored in memory and reset every time the app restarts.

### Running tests

```bash
./mvnw test
```

## REST API

| Method | Endpoint                        | Description                          |
|--------|----------------------------------|---------------------------------------|
| GET    | `/tasks`                        | List all tasks                        |
| GET    | `/tasks/status/{status}`        | List tasks by status (`ON_TIME`, `LATE`) |
| POST   | `/tasks`                        | Create a task (JSON body: `title`, `description`, `eta`) |
| PATCH  | `/tasks/mark_as_finished/{id}`  | Mark a task as finished               |
| DELETE | `/tasks/{id}`                   | Delete a task                         |

Example:

```bash
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk","description":"2%","eta":"2026-09-20T10:00:00"}'
```

## Project Structure

```
src/main/java/com/jordimorera/mytodolistapp/
├── controller/     REST API (TaskController) and page controller (TaskViewController)
├── service/        Business logic (TaskService) and request DTOs
├── mapper/         DTO -> entity mapping
├── persistence/    JPA entity, enum, and repository
└── exceptions/     Custom exception + global exception handler
```
