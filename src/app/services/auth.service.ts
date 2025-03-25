import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('authToken', token);
    //console.log('Token set:', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('authToken');
    }
    //console.log('Token retrieved:', this.token);
    return this.token;
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('authToken');
    //console.log('Token cleared');
  }
}
