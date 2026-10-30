import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TECHS } from '../../../models/project.model';
import { TranslatePipe } from '../../../core/translate.pipe';
import { LightboxService } from '../../../core/lightbox.service';

export const BIDEX_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.pabnauts.bidex&pcampaignid=web_share';
export const BIDEX_WEB_URL = 'https://bidex.app';

@Component({
  selector: 'app-bidex-spotlight',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './bidex-spotlight-component.html',
  styleUrl: './bidex-spotlight-component.scss'
})
export class BidexSpotlightComponent {
  private lightboxService = inject(LightboxService);

  readonly playUrl = BIDEX_PLAY_URL;
  readonly webUrl = BIDEX_WEB_URL;

  readonly images = [
    'screenshots/003_bidex/app-1.webp',
    'screenshots/003_bidex/app-2.webp',
    'screenshots/003_bidex_web/1.webp',
    'screenshots/003_bidex_web/2.webp',
    'screenshots/003_bidex_web/3.webp',
  ];

  readonly stats = [
    { value: 'BIDEX.STAT_DOWNLOADS_VALUE', label: 'BIDEX.STAT_DOWNLOADS' },
    { value: 'BIDEX.STAT_RATING_VALUE',    label: 'BIDEX.STAT_RATING' },
    { value: 'BIDEX.STAT_USERS_VALUE',     label: 'BIDEX.STAT_USERS' },
  ];

  readonly techs = [
    TECHS['flutter'], TECHS['angular'], TECHS['supabase'],
    TECHS['postgresql'], TECHS['sqlite'], TECHS['cloudflare'],
  ];

  currentIndex = signal(0);

  select(index: number) {
    this.currentIndex.set(index);
  }

  openLightbox() {
    this.lightboxService.open(this.images, this.currentIndex());
  }
}
