// src/app/home/home.component.ts
import { Component, ElementRef, signal, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from '../about/about-component';
import { ProjectsComponent } from '../projects/projects-component';
import { SkillsComponent } from '../skills/skills-component';
import { ContactModalComponent } from '../about//contact-modal-component/contact-modal-component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AboutComponent, ProjectsComponent, SkillsComponent, ContactModalComponent],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.scss']
})
export class HomeComponent {
  @ViewChild('aboutSection') aboutSection!: ElementRef;

  showContactModal = signal(false);
  showFloatingBtn = false;



  openContactModal() { this.showContactModal.set(true); }
  closeContactModal() { this.showContactModal.set(false); }
}
