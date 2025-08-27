import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EMAIL_MAILTO, EMAIL_GMAIL, WHATSAPP_URL } from '../../../../constants';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-modal-component.html',
  styleUrls: ['./contact-modal-component.scss']
})
export class ContactModalComponent {
  @Output() close = new EventEmitter<void>();

  copied = false;

  emailDefault = EMAIL_MAILTO;
  emailGmail = EMAIL_GMAIL;
  whatsappUrl = WHATSAPP_URL;

  onClose() {
    this.close.emit();
  }

  copyEmail() {
    const email = 'pabloggm00@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    }).catch(() => {
      alert('No se pudo copiar el correo');
    });
  }

}
