import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {ApiService} from '../../services/api.service';
import {FormsModule} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  imports:[FormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router=inject(Router)
  userID: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private tokenService: TokenService) {}

  login() {
    this.tokenService.clearToken();
    this.apiService.login(this.userID, this.password).subscribe((res: any) => {
      console.log('Login response:', res);
      const token = res.token;
      this.tokenService.setToken(token);
      this.router.navigateByUrl("home");
    });
  }
}
