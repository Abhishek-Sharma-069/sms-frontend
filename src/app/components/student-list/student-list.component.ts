import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

/**
 * Student list component.
 * Shows a table of students with edit/delete actions.
 * Uses StudentService (localStorage + mock data) for data.
 */
@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
})
export class StudentListComponent implements OnInit {
  private readonly studentService = inject(StudentService);

  /** All students (from service). */
  students: Student[] = [];
  /** True while loading. */
  loading = true;
  /** Error message to display, if any. */
  error: string | null = null;

  ngOnInit(): void {
    this.loadStudents();
  }

  /** Fetches students from the service and updates local state. */
  loadStudents(): void {
    this.loading = true;
    this.error = null;
    this.studentService.getAll().subscribe({
      next: (data) => {
        this.students = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message ?? 'Failed to load students.';
        this.loading = false;
      },
    });
  }

  /** Deletes a student after confirm. Reloads list on success. */
  deleteStudent(student: Student): void {
    if (!confirm(`Delete "${student.name}"?`)) return;
    this.studentService.delete(student.studentId).subscribe({
      next: () => this.loadStudents(),
      error: (err) => (this.error = err?.message ?? 'Failed to delete student.'),
    });
  }
}
