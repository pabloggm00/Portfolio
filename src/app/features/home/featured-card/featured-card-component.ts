import { Component, Input, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../models/project.model';
import { TranslatePipe } from '../../../core/translate.pipe';
import { LightboxService } from '../../../core/lightbox.service';

@Component({
  selector: 'app-featured-card',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './featured-card-component.html',
  styleUrl: './featured-card-component.scss'
})
export class FeaturedCardComponent {
  @Input() project!: Project;

  private lightboxService = inject(LightboxService);

  currentIndex = signal(0);

  get images(): string[] {
    const imgs = this.project?.featuredImages;
    return imgs && imgs.length ? imgs : [this.project?.image];
  }

  get total(): number {
    return this.images.length;
  }

  prev() {
    this.currentIndex.update(i => (i - 1 + this.total) % this.total);
  }

  next() {
    this.currentIndex.update(i => (i + 1) % this.total);
  }

  goTo(i: number) {
    this.currentIndex.set(i);
  }

  openLightbox(index: number) {
    this.lightboxService.open(this.images, index);
  }
}
