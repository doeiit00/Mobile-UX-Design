import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {ApiService} from '../../services/api.service';
import {FormsModule} from '@angular/forms';
import {sha256} from 'crypto-hash';
import {UserService} from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router=inject(Router)
  userID: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private tokenService: TokenService, private userService: UserService) {}

  login() {
    this.tokenService.clearToken();

    this.userService.setUserID(this.userID);

    this.apiService.login(this.userID, this.password).subscribe({
      next: (res: any) => {
        console.log('Login response:', res);
        if (res.token) {
          this.tokenService.setToken(res.token);
          this.router.navigateByUrl('/home');
        } else {
          console.error('Login failed: No token received');
        }
      },
      error: (err) => {
        console.error('Login-Failure:', err);
      },
    });
  }

}
