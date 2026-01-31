# Student Service

The `StudentService` handles all data operations related to students, acting as a bridge between the components and the data storage.

## Responsibilities
- **CRUD Operations**: Provides methods to Create, Read, Update, and Delete student records.
- **Persistence**: Currently uses `localStorage` (key `sms_students`) for data storage until the .NET Web API backend is ready.
- **Type Safety**: Ensures all data is correctly typed using the `Student` model and a `normalizeStudent` helper.
- **Mock Data**: (Previously supported) Designed to work seamlessly without a backend for UI testing.

## Methods
- `getAll()`: Returns an Observable of all students.
- `getById(id)`: Returns an Observable of a single student by their ID.
- `create(student)`: Adds a new student and assigns a unique ID.
- `update(id, student)`: Updates an existing student's details.
- `delete(id)`: Removes a student record.
