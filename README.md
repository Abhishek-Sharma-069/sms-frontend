# Student Management System (Frontend)

Angular frontend for the Student Management System full‑stack project. Uses Angular 21+, TypeScript, Tailwind CSS, and Bootstrap Icons.

## Features

- **Student list** – View all students in a table with Edit/Delete actions
- **Add / Edit student** – Reactive forms with validation (name, email, course, marks, result)
- **Mock data + localStorage** – `StudentService` uses localStorage for persistence and seeds mock students on first load (no backend required for testing)
- **Color palette** – UI uses `#1A3263`, `#547792`, `#FAB95B`, `#E8E2DB` (see `src/styles.css`)
- **API-ready** – When the .NET Web API backend is ready, switch `StudentService` back to HTTP; environment and endpoints are documented below

## Project structure

```
src/app
├── components/
│   ├── student-list/     # List view + delete
│   └── student-form/     # Add & edit form (Reactive Forms)
├── services/
│   └── student.service.ts
├── models/
│   └── student.model.ts
├── app.routes.ts
└── app.config.ts
```

## Mock data and localStorage

`StudentService` currently uses **localStorage** (key `sms_students`) for persistence. On first load, if storage is empty, it seeds **mock students** so you can test the UI without a backend. To reset data, clear `localStorage` for the app origin (e.g. DevTools → Application → Local Storage → remove `sms_students`).

## API base URL (when using backend)

Configure the backend base URL in `src/environments/environment.ts` (development) and `src/environments/environment.prod.ts` (production). Default dev URL: `https://localhost:5000/api`. Expected endpoints:

- `GET /api/students` – list all
- `GET /api/students/:id` – get one
- `POST /api/students` – create
- `PUT /api/students/:id` – update
- `DELETE /api/students/:id` – delete

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
