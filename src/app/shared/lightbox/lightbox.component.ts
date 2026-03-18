import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxService } from '../../core/lightbox.service';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.scss'
})
export class LightboxComponent {
  lightbox = inject(LightboxService);

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (!this.lightbox.state()) return;
    if (e.key === 'Escape')      this.lightbox.close();
    if (e.key === 'ArrowLeft')   this.lightbox.prev();
    if (e.key === 'ArrowRight')  this.lightbox.next();
  }
}
