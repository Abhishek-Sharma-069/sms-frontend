import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';

/**
 * Root app component.
 * Renders navbar and main router outlet.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
