import { Component, inject, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  form!: FormGroup;
  error: string | null = null;

  signupSuccess = output<void>();

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.error = null;
    const { name, email, password } = this.form.value;
    this.auth.signup(email, name, password);
    this.router.navigate(['/dashboard']);
    this.signupSuccess.emit();
  }
}
