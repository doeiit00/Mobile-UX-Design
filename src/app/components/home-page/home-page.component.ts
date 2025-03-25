import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';


@Component({
  standalone: true,
  selector: 'app-landing-page',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  router=inject(Router)

  token: string | null = '';

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  logout() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params: any = {};

    if(this.authService.getToken()) {
      params.token = this.authService.getToken();
      console.log('Get Token:', params.token);
    }
this.http.get('https://www2.hs-esslingen.de/~melcher/map/chat/api/?request=logout', { headers, params }).subscribe(
  (res: any) => {
    console.log('Hello World');
    this.authService.clearToken();
  },
  (error: any) => {
    this.authService.clearToken();
    console.error('Error occurred:', error);
  }
);

    this.router.navigateByUrl("")
  }
}
