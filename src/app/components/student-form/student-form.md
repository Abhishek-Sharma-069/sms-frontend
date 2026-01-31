# Student Form Component

The `StudentFormComponent` is a versatile component used for both adding new students and editing existing student records.

## Features
- **Mode Switching**: Detects if it's in "Add" or "Edit" mode based on the presence of an `id` parameter in the route.
- **Reactive Form**: Manages student details (Name, Email, Course, Marks, Result) with full validation.
- **Data Fetching**: In edit mode, it fetches student data using `StudentService.getById()`.
- **Persistence**: Saves changes via `StudentService.create()` or `StudentService.update()`.
- **Navigation**: Redirects back to the `/dashboard` after a successful save or when clicking "Cancel".
- **Error Handling**: Displays clear error messages if data fails to load or save.

## Route Configuration
- Add Mode: `/students/add`
- Edit Mode: `/students/edit/:id`
