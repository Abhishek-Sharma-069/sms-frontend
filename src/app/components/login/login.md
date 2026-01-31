# Login Component

The `LoginComponent` handles user authentication by providing a form for existing users to sign in.

## Features
- **Reactive Form**: Uses Angular's `ReactiveFormsModule` for form handling and validation.
- **Validation**: 
  - Email: Required and must be a valid email format.
  - Password: Required and must be at least 4 characters long.
- **Authentication**: Calls `AuthService.login()` upon successful form submission.
- **Navigation**: Redirects the user to the `/dashboard` page after a successful login.
- **Output Event**: Emits `loginSuccess` when the user logs in successfully.

## Usage
Used in the `HomeComponent` as part of the login/signup tabs.

```html
<app-login (loginSuccess)="onLoginSuccess()" />
```
