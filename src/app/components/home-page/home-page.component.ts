import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ApiService} from '../../services/api.service';
import {TokenService} from '../../services/token.service'
import {ChatComponent} from '../chat/chat.component';

@Component({
  standalone: true,
  selector: 'app-landing-page',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, ChatComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  router=inject(Router)
  token: string | null = '';

  constructor(private apiService: ApiService, private tokenService: TokenService) {
    this.token = this.tokenService.getToken();
  }

  logout() {
    if (this.token) {
      this.apiService.logout(this.token).subscribe(() => {
          console.log('Logged out with token:', this.token);
          this.tokenService.clearToken();
          this.router.navigateByUrl("");
        },
        (error) => {
          this.tokenService.clearToken();
          console.error('Error logging out:', error);
        }
      );
    }
  }
}
