import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';

const AUTH_KEY = 'sms_auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _currentUser: User | null = null;

  constructor(private router: Router) {
    this._loadFromStorage();
  }

  private _loadFromStorage(): void {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) {
        this._currentUser = JSON.parse(raw) as User;
      }
    } catch {
      this._currentUser = null;
    }
  }

  get currentUser(): User | null {
    return this._currentUser;
  }

  get isLoggedIn(): boolean {
    return this._currentUser !== null;
  }

  login(email: string, password: string): boolean {
    // Basic auth: store user. In real app, validate against backend.
    const user: User = { email, name: email.split('@')[0] };
    this._currentUser = user;
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return true;
  }

  signup(email: string, name: string, password: string): boolean {
    // Basic signup: store user. In real app, call backend API.
    const user: User = { email, name };
    this._currentUser = user;
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return true;
  }

  logout(): void {
    this._currentUser = null;
    localStorage.removeItem(AUTH_KEY);
    this.router.navigate(['/home']);
  }
}
