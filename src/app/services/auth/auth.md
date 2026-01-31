# Auth Service

The `AuthService` manages the authentication state of the user and provides methods for login, signup, and logout.

## Responsibilities
- **State Management**: Keeps track of the `currentUser` and `isLoggedIn` status.
- **Persistence**: Stores user information in `localStorage` under the key `sms_auth_user` to persist sessions across page reloads.
- **Login**: Simulates a login process and stores user data.
- **Signup**: Simulates a registration process and stores user data.
- **Logout**: Clears user data from memory and `localStorage`, then redirects to the home page.

## Methods
- `login(email, password)`: Authenticates the user.
- `signup(email, name, password)`: Registers a new user.
- `logout()`: Ends the user session.
