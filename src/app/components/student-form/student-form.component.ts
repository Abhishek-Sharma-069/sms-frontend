import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

/**
 * Student add/edit form component.
 * Uses Reactive Forms with validation. Loads student in edit mode via route param.
 * Persists via StudentService (localStorage + mock data).
 */
@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css',
})
export class StudentFormComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly studentService = inject(StudentService);
  private readonly destroy$ = new Subject<void>();

  /** Reactive form instance. */
  form!: FormGroup;
  /** True when editing an existing student. */
  isEdit = false;
  /** Student id in edit mode. */
  studentId: number | null = null;
  /** True while submit request is in progress. */
  loading = false;
  /** True while loading student data in edit mode. */
  loadingData = true;
  /** Error message to display, if any. */
  error: string | null = null;

  ngOnInit(): void {
    this.buildForm();
    // Handle initial route param immediately (snapshot) for fast initial load.
    const initialId = this.route.snapshot.paramMap.get('id');
    if (initialId !== null && initialId !== '') {
      this.isEdit = true;
      this.studentId = Number(initialId);
      this.loadingData = true;
      this.loadStudent();
    } else {
      this.isEdit = false;
      this.studentId = null;
      this.loadingData = false;
    }
    // Subscribe to route param changes (handles component reuse when navigating between students).
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id !== null && id !== '') {
        const numId = Number(id);
        // Only reload if id actually changed (avoid double load on initial).
        if (this.studentId !== numId) {
          this.isEdit = true;
          this.studentId = numId;
          this.error = null;
          this.loadingData = true;
          this.loadStudent();
        }
      } else {
        // No id = add mode.
        if (this.isEdit) {
          this.isEdit = false;
          this.studentId = null;
          this.loadingData = false;
          this.error = null;
          this.form.reset();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Builds the reactive form with validators. */
  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      course: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      marks: [null as number | null, [Validators.required, Validators.min(0), Validators.max(100)]],
      result: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  /** Loads student by id and patches form (edit mode only). */
  private loadStudent(): void {
    if (!this.studentId) {
      this.loadingData = false;
      return;
    }
    this.error = null;
    this.studentService.getById(this.studentId).subscribe({
      next: (s) => {
        if (s && s.studentId) {
          this.form.patchValue({
            name: s.name,
            email: s.email,
            course: s.course,
            marks: s.marks,
            result: s.result,
          });
          this.loadingData = false;
        } else {
          this.error = 'Student not found.';
          this.loadingData = false;
        }
      },
      error: (err) => {
        this.error = err?.message ?? 'Failed to load student. Please check if the student exists.';
        this.loadingData = false;
      },
    });
  }

  /** Returns true if the given control has the given validation error (and is dirty/touched). */
  hasError(control: string, error: string): boolean {
    const c = this.form.get(control);
    return !!(c && c.hasError(error) && (c.dirty || c.touched));
  }

  /** Submits the form: create or update via service, then navigate to list. */
  onSubmit(): void {
    if (this.form.invalid || this.loading) return;
    this.loading = true;
    this.error = null;
    const value = this.form.value;

    if (this.isEdit && this.studentId != null) {
      this.studentService.update(this.studentId, value).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.error = err?.message ?? 'Failed to update student.';
          this.loading = false;
        },
      });
    } else {
      this.studentService.create(value).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.error = err?.message ?? 'Failed to add student.';
          this.loading = false;
        },
      });
    }
  }
}
