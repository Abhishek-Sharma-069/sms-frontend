# Student List Component

The `StudentListComponent` displays a comprehensive table of all students managed in the system.

## Features
- **Data Display**: Shows student details including Name, Email, Course, Marks, and Result.
- **Badges**: Uses color-coded badges for student results (Pass/Fail).
- **Actions**: Provides links to edit a student and a button to delete a student.
- **State Management**: Handles loading, error, and empty states gracefully.
- **Full-Width UI**: Styled to cover the maximum width of the screen for better data visibility.
- **Persistence Integration**: Uses `StudentService` to fetch and delete data from `localStorage`.

## Usage
Typically rendered within the `DashboardComponent`.

```html
<app-student-list />
```
