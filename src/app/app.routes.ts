import { Routes } from '@angular/router';

import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';

/** App routes: list, add, edit. */
export const routes: Routes = [
  { path: '', component: StudentListComponent },
  { path: 'students/add', component: StudentFormComponent },
  { path: 'students/edit/:id', component: StudentFormComponent },
  { path: '**', redirectTo: '' },
];
