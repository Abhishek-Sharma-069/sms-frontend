import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../../components/login/login.component';
import { SignupComponent } from '../../components/signup/signup.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent, SignupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  activeTab: 'login' | 'signup' = 'login';

  constructor() {
    if (this.auth.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

  setTab(tab: 'login' | 'signup'): void {
    this.activeTab = tab;
  }
}
