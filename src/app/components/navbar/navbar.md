# Navbar Component

The `NavbarComponent` provides the primary navigation for the application, adapting its content based on the user's authentication state.

## Features
- **Dynamic Links**:
  - **Authenticated**: Shows "Students" (Dashboard), "Add Student", the user's name, and a "Logout" button.
  - **Guest**: Shows a "Home" link.
- **Active State**: Uses `routerLinkActive` to highlight the current route.
- **Authentication Integration**: Injects `AuthService` to check login status and handle logout.
- **Responsive Design**: Styled with CSS to be responsive and consistent with the SMS color palette.

## Usage
Placed at the top of the `App` component's template.

```html
<app-navbar />
```
