import { Component } from '@angular/core';
import { TranslatePipe } from '../../core/translate.pipe';

@Component({
  selector: 'app-notfound',
  imports: [TranslatePipe],
  templateUrl: './notfound.html',
  styleUrl: './notfound.scss'
})
export class NotFoundComponent {

}
