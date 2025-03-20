import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router=inject(Router)

  userID: string = '';
  password: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  login() {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const params = {
      userid: this.userID,
      password: this.password,
    }

    this.http.get('https://www2.hs-esslingen.de/~melcher/map/chat/api/?request=login', { headers, params}).subscribe((res: any) => {
      console.log('Res is:', res);
      console.log('Token is:', res.token);
      const token = res.token; // Adjust this line based on the actual response structure
      this.authService.setToken(token);
      console.log('Token saved:', token);
    });

    this.router.navigateByUrl("home")
  }
}
