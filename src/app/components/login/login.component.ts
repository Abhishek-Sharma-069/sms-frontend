import { Component, inject, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  form!: FormGroup;
  error: string | null = null;

  loginSuccess = output<void>();

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.error = null;
    const { email, password } = this.form.value;
    this.auth.login(email, password);
    this.router.navigate(['/dashboard']);
    this.loginSuccess.emit();
  }
}
