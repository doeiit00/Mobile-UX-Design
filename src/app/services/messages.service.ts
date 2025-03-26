import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {ApiService} from './api.service';
import {TokenService} from './token.service';
import { Message } from '../interface/message';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  token: string | null = '';

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
      console.log('MessagesService initialized');
    } else {
      console.error('No chat selected');
    }
  }

  public Messages: Message[] = [];

  private startMessagesUpdate(chatid: number) {
    setInterval(() => {
      this.updateMessages(chatid);
    }, 5000);
  }

  private async updateMessages(chatid: number) {
    if (this.token && this.apiService.validateToken(this.token)) {
      this.apiService.getMessages(this.token, chatid).subscribe((res: any) => {
        const newMessages = res.messages;

        for (const newMessage of newMessages) {
          this.updateMessage(newMessage);
        }
      });
    }
  }

  private updateMessage(message: Message) {
    const existingMessageIndex = this.Messages.findIndex(c => c.id === message.id);
    if (existingMessageIndex !== -1) {
      this.Messages[existingMessageIndex] = {
        ...this.Messages[existingMessageIndex],
        text: message.text,
        userid: message.userid,
      };
    } else {
      // Add new chat
      const newMessage = {
        id: message.id,
        userid: message.userid,
        time: message.time,
        chatid: message.chatid,
        text: message.text,
        photoid: message.photoid,
        usernick: message.usernick,
        userhash: message.userhash
      };
      this.Messages.push(newMessage);
    }
  }

  private loadMessages(chatid: number) {
    this.updateMessages(chatid);
    this.startMessagesUpdate(chatid);
  }

  getMessages(): Observable<Message[]> {
    return of(this.Messages);
  }
}
