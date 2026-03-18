import { Injectable, signal } from '@angular/core';

export interface LightboxState {
  images: string[];
  index: number;
}

@Injectable({ providedIn: 'root' })
export class LightboxService {
  private _state = signal<LightboxState | null>(null);

  readonly state = this._state.asReadonly();

  open(images: string[], index: number) {
    this._state.set({ images, index });
    document.body.style.overflow = 'hidden';
  }

  close() {
    this._state.set(null);
    document.body.style.overflow = '';
  }

  prev() {
    const s = this._state();
    if (!s) return;
    const i = (s.index - 1 + s.images.length) % s.images.length;
    this._state.set({ ...s, index: i });
  }

  next() {
    const s = this._state();
    if (!s) return;
    const i = (s.index + 1) % s.images.length;
    this._state.set({ ...s, index: i });
  }

  goTo(index: number) {
    const s = this._state();
    if (!s) return;
    this._state.set({ ...s, index });
  }
}
