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
        //MatIcon,
        ReactiveFormsModule
    ],
  templateUrl: './popup-invites.component.html',
  styleUrl: './popup-invites.component.css'
})
export class PopupInvitesComponent {
  token: string | null = '';
  invite: any[] = [];

  constructor(private apiService: ApiService, private tokenService: TokenService, ) {
    this.token = this.tokenService.getToken();
    this.getInvites();
  }

  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }

  getInvites() {
    if (this.token) {
      this.apiService.getInvites(this.token).subscribe((data: any[]) => {
        this.invite = data;
      });
    }
  }
}
