import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from "./layout/navbar/navbar";
import { CommonModule } from '@angular/common';
import { TranslationService } from './core/translation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');
  currentLang: string = 'es';

  constructor(private router: Router, private translationService: TranslationService) {
    this.currentLang = this.translationService.getCurrentLanguage();
  }

  get showNavbar(): boolean {
    const hiddenPrefixes = ['/privacy-policy'];
    return !hiddenPrefixes.some(prefix => this.router.url.startsWith(prefix));
  }

  setLanguage(lang: string) {
    this.currentLang = lang;
    this.translationService.setLanguage(lang);
  }
}
