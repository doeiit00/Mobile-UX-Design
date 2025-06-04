import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: string | null = null;

  setUserID(userID: string): void {
    this.user = userID;
    console.log('UserID is', userID);
    localStorage.setItem('UserID', userID);
  }

  getUser(): string | null {
    if (!this.user) {
      this.user = localStorage.getItem('UserID');
    }
    console.log('User is', this.user);
    return this.user;
  }
}
