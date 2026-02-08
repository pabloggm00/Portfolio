import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private currentLang = signal<string>('es');
  private translations = signal<Record<string, any>>({});
  public isLoaded = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  getCurrentLanguage(): string {
    return this.currentLang();
  }

  async setLanguage(lang: string) {
    if (lang === this.currentLang()) { return; }
    this.currentLang.set(lang);
    await this.loadTranslations(lang);
  }

  async loadTranslations(lang: string): Promise<void> {
    this.isLoaded.set(false);
    const path = `i18n/${lang}.json`;
    
    try {
      const data = await firstValueFrom(this.http.get<Record<string, any>>(path));
      this.translations.set(data || {});
      this.isLoaded.set(true);
    } catch {
      this.translations.set({});
      this.isLoaded.set(true);
    }
  }

  translate(key: string): string {
    const parts = key.split('.');
    let node: any = this.translations();
    
    for (const part of parts) {
      if (node && typeof node === 'object' && part in node) {
        node = node[part];
      } else {
        return key;
      }
    }
    
    return typeof node === 'string' ? node : key;
  }
}
