import { Component } from '@angular/core';

import { StudentListComponent } from '../../components/student-list/student-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StudentListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
