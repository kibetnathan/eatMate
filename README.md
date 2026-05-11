# eatMate

A simple calorie tracker with a TypeScript frontend and a Go backend.

## Structure

- `frontend/` — TypeScript + Tailwind CSS UI. Currently uses `localStorage` to persist the user profile and food entries.
- `backend/` — Go API scaffolded with GORM and SQLite (`calories.db`).

## Frontend

```bash
cd frontend
npm install
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
npx tsc --watch
```

Then open `index.html` in a browser.

## Backend

```bash
cd backend
go run .
```

Dependencies:
- `gorm.io/gorm` + `gorm.io/driver/sqlite`
- `github.com/mattn/go-sqlite3`

## Features

- Create a local user profile (name, username, date of birth)
- Add and delete food entries with calorie counts
- Running total of calories
- Clear all stored data via the opt-out button

## Status

Early stage. The backend is scaffolded but not yet wired to the frontend — data currently lives in `localStorage`.
