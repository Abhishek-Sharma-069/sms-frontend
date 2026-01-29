import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Student } from '../models/student.model';

/** localStorage key used to persist students. */
const STORAGE_KEY = 'sms_students';

/**
 * Student service.
 * Uses localStorage for persistence until the .NET Web API backend is ready.
 * All data comes from localStorage only (no mock data seeding).
 */
@Injectable({ providedIn: 'root' })
export class StudentService {
  /**
   * Reads students from localStorage.
   * Returns parsed array or empty array if missing/invalid.
   */
  private getFromStorage(): Student[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as Student[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  /**
   * Writes students to localStorage.
   */
  private saveToStorage(students: Student[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }

  /**
   * Ensures a student has correct types (e.g. studentId and marks as numbers).
   * JSON.parse can leave numbers as numbers, but form values may send marks as string.
   */
  private normalizeStudent(s: Student): Student {
    return {
      studentId: Number(s.studentId),
      name: String(s.name),
      email: String(s.email),
      course: String(s.course),
      marks: Number(s.marks),
      result: String(s.result),
    };
  }

  /**
   * Returns all students from localStorage.
   * Returns empty array if no students exist.
   */
  getAll(): Observable<Student[]> {
    const students = this.getFromStorage();
    return of(students);
  }

  /**
   * Returns a student by id from localStorage.
   * Throws (via throwError) if not found so the form can show an error.
   * Uses Number() so string ids from route params match numeric ids from storage.
   */
  getById(id: number): Observable<Student> {
    const students = this.getFromStorage();
    const numId = Number(id);
    const found = students.find((s) => Number(s.studentId) === numId);
    if (found) return of(this.normalizeStudent(found));
    return throwError(() => new Error('Student not found'));
  }

  /**
   * Creates a new student, assigns next studentId, persists to localStorage.
   */
  create(student: Omit<Student, 'studentId'>): Observable<Student> {
    const students = this.getFromStorage();
    const nextId =
      students.length > 0
        ? Math.max(...students.map((s) => Number(s.studentId))) + 1
        : 1;
    const created: Student = this.normalizeStudent({ ...student, studentId: nextId });
    students.push(created);
    this.saveToStorage(students);
    return of(created);
  }

  /**
   * Updates an existing student by id and persists to localStorage.
   * Normalizes id comparison (route param can be string) and ensures payload types.
   */
  update(id: number, student: Omit<Student, 'studentId'>): Observable<Student> {
    const students = this.getFromStorage();
    const numId = Number(id);
    const idx = students.findIndex((s) => Number(s.studentId) === numId);
    if (idx === -1) {
      return throwError(() => new Error('Student not found'));
    }
    const updated: Student = this.normalizeStudent({ ...student, studentId: numId });
    students[idx] = updated;
    this.saveToStorage(students);
    return of(updated);
  }

  /**
   * Deletes a student by id and persists to localStorage.
   */
  delete(id: number): Observable<void> {
    const numId = Number(id);
    const students = this.getFromStorage().filter((s) => Number(s.studentId) !== numId);
    this.saveToStorage(students);
    return of(void 0);
  }
}
