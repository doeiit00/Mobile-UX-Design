import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl= 'https://www2.hs-esslingen.de/~melcher/map/chat/api/';

  constructor(private http: HttpClient) {}

  private getCasualHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  login(userID: string, password: string): Observable<any> {
    const params = {userid: userID, password: password, _t: new Date().getTime()};
    return this.http.get(`${this.baseUrl}?request=login`, { params });
  }

  logout(token: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token, _t: new Date().getTime() };
    return this.http.get(`${this.baseUrl}?request=logout`, { headers, params });
  }

  register(userID: string, password: string, nickname: string, fullname: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { userid: userID, password: password, nickname: nickname, fullname: fullname, _t: new Date().getTime() };
    return this.http.get(`${this.baseUrl}?request=register`, { headers, params });
  }

  deregister(token: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token, _t: new Date().getTime() };
    return this.http.get(`${this.baseUrl}?request=deregister`, { headers, params });
  }

  getMessages(token: string, fromid: number, chatid?: number): Observable<any> {
    const headers = this.getCasualHeader();
    const params: any = { token, fromid, _t: new Date().getTime() };
    if (chatid) {
      params.chatid = chatid;
    }
    return this.http.get(`${this.baseUrl}?request=getmessages`, { headers, params });
  }

  getPhoto(token: string, photoid: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token, photoid, _t: new Date().getTime() };
    return this.http.get(`${this.baseUrl}?request=getphoto`, { params, responseType: 'blob'});
  }

  validateToken(token: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token, _t: new Date().getTime() };
    return this.http.get(`${this.baseUrl}?request=validatetoken`, { headers, params });
  }

  getProfiles(token: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token, _t: new Date().getTime() };
    return this.http.get(`${this.baseUrl}?request=getprofiles`, { headers, params });
  }

  getChats(token: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token, _t: new Date().getTime() };
    return this.http.get(`${this.baseUrl}?request=getchats`, { headers, params});
  }

  createChat(token: string, chatname: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token, chatname, _t: new Date().getTime() };
    return this.http.get(`${this.baseUrl}?request=createchat`, { headers, params });
  }

  deleteChat(token: string, chatid: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token, chatid, _t: new Date().getTime() };
    return this.http.get(`${this.baseUrl}?request=deletechat`, { headers, params });
  }

  invite(token: string, chatid: string, invitedhash: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token, chatid, invitedhash, _t: new Date().getTime() };
    return this.http.get(`${this.baseUrl}?request=invite`, { headers, params });
  }

  getInvites(token: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token, _t: new Date().getTime() };
    return this.http.get(`${this.baseUrl}?request=getinvites`, { headers, params });
  }

  joinChat(token: string, chatid: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token, chatid, _t: new Date().getTime() };
    return this.http.get(`${this.baseUrl}?request=joinchat`, { headers, params });
  }

  leaveChat(token: string, chatid: string): Observable<any> {
    const headers = this.getCasualHeader();
    const params = { token, chatid, _t: new Date().getTime() };
    return this.http.get(`${this.baseUrl}?request=leavechat`, { headers, params });
  }

  postMessage(token: string, text?: string, photo?: string, position?: string, chatid?: number): Observable<any> {
    const headers = this.getCasualHeader();
    const body: any = { request: "postmessage", token, text, photo, position, chatid, _t: new Date().getTime() };
    return this.http.post(`${this.baseUrl}/`, body, { headers });
  }
}
