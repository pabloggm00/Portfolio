// src/app/home/about/about.component.ts
import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GITHUB_URL, LINKEDIN_URL, CV_URL } from '../../../constants';
import gsap from 'gsap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
  }

  openContact() {
    this.contactClick.emit();
  }


}
