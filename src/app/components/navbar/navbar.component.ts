import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly auth = inject(AuthService);

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn;
  }

  get userName(): string {
    return this.auth.currentUser?.name ?? 'User';
  }

  logout(): void {
    this.auth.logout();
  }
}
