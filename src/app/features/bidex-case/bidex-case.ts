import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../core/translate.pipe';
import { LightboxService } from '../../core/lightbox.service';

const SHOT = (name: string) => `screenshots/bidex_case/${name}.webp`;

interface CaseSection {
  key: string;
  id: string;
  points: string[];
  images: string[];
}

@Component({
  selector: 'app-bidex-case',
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './bidex-case.html',
  styleUrl: './bidex-case.scss'
})
export class BidexCaseComponent {
  private lightboxService = inject(LightboxService);

  readonly features = [
    { key: 'POKEDEX',   image: SHOT('pokedex') },
    { key: 'DETAIL',    image: SHOT('detail') },
    { key: 'TEAMS',     image: SHOT('teams') },
    { key: 'COVERAGE',  image: SHOT('coverage') },
    { key: 'MYBOX',     image: SHOT('mybox') },
    { key: 'EVSETS',    image: SHOT('evsets') },
    { key: 'EXPLORE',   image: SHOT('explore') },
    { key: 'GAMEDEX',   image: SHOT('gamedex') },
    { key: 'MOVES',     image: SHOT('moves_list') },
    { key: 'ABILITIES', image: SHOT('abilities') },
    { key: 'ITEMS',     image: SHOT('items') },
    { key: 'TYPECALC',  image: SHOT('typecalc') },
    { key: 'COMPARE',   image: SHOT('compare') },
    { key: 'SHARE',     image: SHOT('share') },
    { key: 'PROFILE',   image: SHOT('profile') },
    { key: 'AVATAR',    image: SHOT('avatar') },
  ];

  readonly flows = [
    { title: 'FLOW_USER', steps: ['U1', 'U2', 'U3', 'U4', 'U5'] },
    { title: 'FLOW_DEX',  steps: ['D1', 'D2', 'D3', 'D4'] },
  ];

  readonly sections: CaseSection[] = [
    { key: 'SYNC',     id: 'sync',     points: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'], images: [SHOT('teams')] },
    { key: 'CONTENT',  id: 'content',  points: ['P1', 'P2', 'P3', 'P4', 'P5'],       images: [SHOT('stats')] },
    { key: 'IMAGES',   id: 'images',   points: ['P1', 'P2', 'P3', 'P4', 'P5'],       images: [SHOT('offline')] },
    { key: 'ACCOUNTS', id: 'accounts', points: ['P1', 'P2', 'P3'],                   images: [SHOT('profile')] },
    { key: 'DEXSYNC',  id: 'dexsync',  points: ['P1', 'P2', 'P3', 'P4'],             images: [SHOT('gamedex')] },
    { key: 'SHARING',  id: 'sharing',  points: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'], images: [SHOT('import')] },
    { key: 'ENGINE',   id: 'engine',   points: ['P1', 'P2', 'P3'],                   images: [SHOT('coverage')] },
    { key: 'MESSAGES', id: 'messages', points: ['P1', 'P2', 'P3', 'P4', 'P5'],       images: [SHOT('reports')] },
  ];

  readonly index = [
    { id: 'overview', title: 'BIDEX_CASE.OVERVIEW.TITLE' },
    { id: 'features', title: 'BIDEX_CASE.FEATURES.TITLE' },
    ...this.sections.map(s => ({ id: s.id, title: `BIDEX_CASE.${s.key}.TITLE` })),
    { id: 'web', title: 'BIDEX_CASE.WEB.TITLE' },
  ];

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  open(images: string[], index = 0) {
    this.lightboxService.open(images, index);
  }

  get featureImages(): string[] {
    return this.features.map(f => f.image);
  }
}
