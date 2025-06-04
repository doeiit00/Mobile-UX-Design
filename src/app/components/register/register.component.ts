import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {TokenService} from '../../services/token.service';
import {ApiService} from '../../services/api.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [RouterOutlet, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  router = inject(Router);
  userID: string = '';
  nickname: string = '';
  fullname: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private tokenService: TokenService) {}

  register() {
    this.apiService.register(this.userID, this.password, this.nickname, this.fullname).subscribe({
      next: (res: any) => {
        if (res.token) {
          this.tokenService.setToken(res.token);
          this.router.navigateByUrl('/home');
        } else {
          console.error('Register failed: No token received');
        }
      },
      error: (err) => {
        console.error('Registration-Failure:', err);
      },
    });
  }
}
