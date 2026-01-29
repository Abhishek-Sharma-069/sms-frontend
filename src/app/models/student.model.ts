/**
 * Student model.
 * Matches the backend Students table (StudentId, Name, Email, Course, Marks, Result).
 */
export interface Student {
  studentId: number;
  name: string;
  email: string;
  course: string;
  marks: number;
  result: string;
}
