import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {TokenService} from '../../services/token.service';
import {ApiService} from '../../services/api.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userID: string = '';
  nickname: string = '';
  fullname: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private tokenService: TokenService) {}

  register() {
    this.apiService.register(this.userID, this.password, this.nickname, this.fullname).subscribe((res: any) => {
      console.log('Register response:', res);
      const token = res.token;
      this.tokenService.setToken(token);
    });
  }
}
