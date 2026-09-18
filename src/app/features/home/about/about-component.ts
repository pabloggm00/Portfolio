// src/app/home/about/about.component.ts
import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GITHUB_URL, LINKEDIN_URL, CV_URL } from '../../../constants';
import gsap from 'gsap';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../../core/translate.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './about-component.html',
  styleUrls: ['./about-component.scss']
})
export class AboutComponent {
  @Output() contactClick = new EventEmitter<void>();
  @ViewChild('aboutContainer') aboutContainer!: ElementRef<HTMLDivElement>;

  @Output() contactVisible = new EventEmitter<boolean>();
  @ViewChild('contactBtn') contactBtn!: ElementRef<HTMLButtonElement>;

  githubUrl = GITHUB_URL;
  linkedinUrl = LINKEDIN_URL;
  cvUrl = CV_URL;

  private readonly FORM_SUBMIT_URL = 'https://formsubmit.co/ajax/pabloggm00@gmail.com';

  ngAfterViewInit() {
    // Animación de fade + slide para todos los hijos
    gsap.from(this.aboutContainer.nativeElement.children, {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.5,
      ease: 'power2.out'
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        this.contactVisible.emit(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(this.contactBtn.nativeElement);
    this.newView();
  }

  openContact() {
    this.contactClick.emit();
    this.buttonContact();
  }

  private sendNotification(subject: string, message: string = 'Interacción en el portfolio') {
    // 1. Buscamos el parámetro '?ref=' en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlRef = urlParams.get('ref');

    // 2. Definimos el origen (Prioridad: Parámetro URL > Referrer > Desconocido)
    const referrer = urlRef || document.referrer || 'Acceso directo o desconocido';

    // Resto del contexto técnico
    const currentPath = window.location.pathname;

    const detailedMessage = `
      ${message}
      
      Detalles técnicos de la visita:
      -----------------------------------
      Fecha: ${new Date().toLocaleString('es-ES')}
      Ruta exacta: ${currentPath}
      Origen: ${referrer}
    `;

    const payload = {
      access_key: '58384660-ca14-4e2a-8886-ea7db6c8b8be',
      subject: subject,
      message: detailedMessage
    };

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    }).catch(err => console.error('Error registrando evento', err));
  }

  private sendDownloadNotification() {
    this.sendNotification('CV Descargado');
  }

  private sendContactNotification() {
    this.sendNotification('Clic en Contacto');
  }

  private sendViewNotification() {
    this.sendNotification('Nueva Visita al Portfolio');
  }


  buttonDownload(event: MouseEvent) {
    this.sendDownloadNotification();
  }

  buttonContact() {
    this.sendContactNotification();
  }

  newView() {
    this.sendViewNotification();
  }

}
