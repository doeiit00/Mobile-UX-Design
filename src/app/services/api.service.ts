import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl= 'https://www2.hs-esslingen.de/~melcher/map/chat/api/';

  constructor(private http: HttpClient) {}

  private getHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    });
  }

  private getCasualHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  login(userID: string, password: string): Observable<any> {
    const headers = this.getHeader();
    const params = { userid: userID, password: password };
    return this.http.get(`${this.baseUrl}?request=login`, { headers, params });
  }

  logout(token: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token };
    return this.http.get(`${this.baseUrl}?request=logout`, { headers, params });
  }

  register(userID: string, password: string, nickname: string, fullname: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { userid: userID, password: password, nickname: nickname, fullname: fullname };
    return this.http.get(`${this.baseUrl}?request=register`, { headers, params });
  }

  deregister(token: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token };
    return this.http.get(`${this.baseUrl}?request=deregister`, { headers, params });
  }

  getMessages(token: string, fromid: number, chatid?: number): Observable<any> {
    const headers = this.getCasualHeader();
    const params: any = { token, fromid };
    if (chatid) {
      params.chatid = chatid;
    }
    return this.http.get(`${this.baseUrl}?request=getmessages`, { headers, params });
  }

  getPhoto(token: string, photoid: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token, photoid };
    return this.http.get(`${this.baseUrl}?request=getphoto`, { headers, params });
  }

  validateToken(token: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token };
    return this.http.get(`${this.baseUrl}?request=validatetoken`, { headers, params });
  }

  getProfiles(token: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token };
    return this.http.get(`${this.baseUrl}?request=getprofiles`, { headers, params });
  }

  getChats(token: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token };
    return this.http.get(`${this.baseUrl}?request=getchats`, { headers, params });
  }

  createChat(token: string, chatname: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token, chatname };
    return this.http.get(`${this.baseUrl}?request=createchat`, { headers, params });
  }

  deleteChat(token: string, chatid: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token, chatid };
    return this.http.get(`${this.baseUrl}?request=deletechat`, { headers, params });
  }

  invite(token: string, chatid: string, invitedhash: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token, chatid, invitedhash };
    return this.http.get(`${this.baseUrl}?request=invite`, { headers, params });
  }

  getInvites(token: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token };
    return this.http.get(`${this.baseUrl}?request=getinvites`, { headers, params });
  }

  joinChat(token: string, chatid: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token, chatid };
    return this.http.get(`${this.baseUrl}?request=joinchat`, { headers, params });
  }

  leaveChat(token: string, chatid: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token, chatid };
    return this.http.get(`${this.baseUrl}?request=leavechat`, { headers, params });
  }

}
