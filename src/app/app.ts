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

  constructor(private router: Router) { }

  get showNavbar(): boolean {
    const hiddenPrefixes = ['/privacy-policy'];
    return !hiddenPrefixes.some(prefix => this.router.url.startsWith(prefix));
  }
}
