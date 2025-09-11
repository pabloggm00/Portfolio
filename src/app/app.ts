import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from "./layout/navbar/navbar";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');

  constructor(private router: Router) {}

  get showNavbar(): boolean {
    const hiddenRoutes = ['/privacy-policy'];
    return !hiddenRoutes.includes(this.router.url);
  }
}
