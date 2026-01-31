import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'students/add',
    component: StudentFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'students/edit/:id',
    component: StudentFormComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/home' },
];
