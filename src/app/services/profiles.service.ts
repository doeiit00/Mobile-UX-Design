import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Profile } from '../interface/profile';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  private profilesSubject = new BehaviorSubject<Profile[]>([]);
  public profiles$ = this.profilesSubject.asObservable();
  token: string | null = '';

  constructor(private apiService: ApiService, private tokenService: TokenService) {
    this.token = this.tokenService.getToken();
  }

  loadProfiles(): void {
    if (this.token) {
      this.apiService.getProfiles(this.token).subscribe({
        next: (response: { profiles: Profile[] }) => {
          // Extrahiere das profiles Array und übergebe es an das Subject
          this.profilesSubject.next(response.profiles);
        },
        error: (err) => {
          console.error('Fehler beim Laden der Profile:', err);
          this.profilesSubject.next([]);
        },
      });
    }
  }

  getProfiles(): Observable<Profile[]> {
    return this.profiles$;
  }
}

