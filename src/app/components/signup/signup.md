# Signup Component

The `SignupComponent` allows new users to create an account in the Student Management System.

## Features
- **Reactive Form**: Built with `FormBuilder` for robust form management.
- **Validation**:
  - Name: Required and must be at least 2 characters long.
  - Email: Required and must be a valid email format.
  - Password: Required and must be at least 4 characters long.
- **Account Creation**: Calls `AuthService.signup()` to register the user.
- **Navigation**: Automatically redirects to the `/dashboard` after successful registration.
- **Output Event**: Emits `signupSuccess` upon completion.

## Usage
Integrated into the `HomeComponent` for user registration.

```html
<app-signup (signupSuccess)="onSignupSuccess()" />
```
