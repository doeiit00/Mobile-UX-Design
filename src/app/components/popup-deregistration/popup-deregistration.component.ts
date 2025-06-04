import {Component, EventEmitter, inject, Output} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {TokenService} from '../../services/token.service';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-popup-deregistration',
  imports: [],
  templateUrl: './popup-deregistration.component.html',
  styleUrl: './popup-deregistration.component.css'
})
export class PopupDeregistrationComponent {
  token: string | null = '';
  router = inject(Router)

  constructor(private apiService: ApiService, private tokenService: TokenService) {
    this.token = this.tokenService.getToken();
  }

  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }

  deregister() {
    if (this.token) {
      this.apiService.deregister(this.token).subscribe(() => {
          console.log('Deregistered with token:', this.token);
          this.tokenService.clearToken();
          this.router.navigateByUrl("");
        },
        (error) => {
          this.tokenService.clearToken();
          console.error('Error deregistering:', error);
        }
      );
    }
  }

}
