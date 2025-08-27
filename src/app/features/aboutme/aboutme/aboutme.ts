import { Component, ElementRef, EventEmitter, Output, signal, ViewChild } from '@angular/core';
import { CV_URL, GITHUB_URL, LINKEDIN_URL } from '../../../constants';
import { ContactModalComponent } from "../../home/about/contact-modal-component/contact-modal-component";
import { gsap } from 'gsap/gsap-core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aboutme',
  imports: [CommonModule, ContactModalComponent],
  templateUrl: './aboutme.html',
  styleUrl: './aboutme.scss'
})
export class AboutMeComponent {

  @ViewChild('aboutContainer') aboutContainer!: ElementRef<HTMLDivElement>;

  showContactModal = signal(false);

  githubUrl = GITHUB_URL;
  linkedinUrl = LINKEDIN_URL;
  cvUrl = CV_URL;

  ngAfterViewInit() {
    // Animación de fade + slide de los elementos
    gsap.from(this.aboutContainer.nativeElement.children, {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power2.out'
    });
  }

  openContactModal() { this.showContactModal.set(true); }
  closeContactModal() { this.showContactModal.set(false); }


}
