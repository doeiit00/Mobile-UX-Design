import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TokenService } from './token.service';
import { Message } from '../interface/message';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messagesSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  public messages$: Observable<Message[]> = this.messagesSubject.asObservable();
  token: string | null = '';
  private updateIntervalId: any = null;

  constructor(private readonly apiService: ApiService, private tokenService: TokenService, private chatService: ChatService) {
    this.token = this.tokenService.getToken();
    this.chatService.chatSelected.subscribe(chatid => this.loadMessages(chatid));
    console.log('MessagesService created');
  }

  public async init() {
    const chatid = this.chatService.getSelectedChatId();
    if (chatid !== null) {
      this.updateMessages(chatid);
      this.startMessagesUpdate(chatid);
      //console.log('MessagesService initialized with chatid:', chatid);
    } else {
      //console.error('No chat selected');
    }
  }

  private startMessagesUpdate(chatid: number) {
    if (this.updateIntervalId) {
      //console.log('Clearing previous interval:', this.updateIntervalId);
      clearInterval(this.updateIntervalId);
    }
    //console.log('Starting new interval for chatid:', chatid);
    this.updateIntervalId = setInterval(() => {
      //console.log('Updating messages for chatid:', chatid);
      this.updateMessages(chatid);
    }, 5000);
  }

  private async updateMessages(chatid: number) {
    if (this.token && this.apiService.validateToken(this.token)) {
      //console.log('Fetching messages for chatid:', chatid);
      this.apiService.getMessages(this.token, chatid).subscribe((res: any) => {
        const newMessages = res.messages.filter((message: Message) => message.chatid === chatid);
        //console.log('Received messages for chatid', chatid, ':', newMessages);
        this.messagesSubject.next(newMessages);
      });
    }
  }

  private loadMessages(chatid: number) {
    //console.log('Loading messages for chatid:', chatid);
    this.messagesSubject.next([]);
    this.updateMessages(chatid);
    this.startMessagesUpdate(chatid);
  }

  getMessages(): Observable<Message[]> {
    return this.messages$;
  }
}
