import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from '@angular/material/icon';
import {ApiService} from '../../services/api.service';
import {TokenService} from '../../services/token.service';
import {ChatService} from '../../services/chat.service';

@Component({
  standalone: true,
  selector: 'app-popup-invites',
    imports: [
        FormsModule,
        MatIcon,
        ReactiveFormsModule
    ],
  templateUrl: './popup-invites.component.html',
  styleUrl: './popup-invites.component.css'
})
export class PopupInvitesComponent {
  token: string | null = '';
  text: string = '';

  constructor(private apiService: ApiService, private tokenService: TokenService, private chatService: ChatService) {
    this.token = this.tokenService.getToken();
  }

  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }

  createChat() {
    if (this.token && this.text) {
      this.apiService.createChat(this.token, this.text).subscribe(
        (response) => {
          console.log('Chat created:', response);
          this.chatService.init();
          this.closePopup();
        },
        (error) => {
          console.error('Error creating chat:', error);
        }
      );
    }
  }
}
