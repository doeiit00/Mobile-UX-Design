import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userID: string = '';
  nickname: string = '';
  fullname: string = '';
  password: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  register() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = {
      userid: this.userID,
      password: this.password,
      nickname: this.nickname,
      fullname: this.fullname
    }

    this.http.get('https://www2.hs-esslingen.de/~melcher/map/chat/api/?request=register', { headers, params }).subscribe((res: any) => {
      const token = res.token; // Adjust this line based on the actual response structure
      this.authService.setToken(token);
      console.log('Token saved:', token);
    });
  }
}
