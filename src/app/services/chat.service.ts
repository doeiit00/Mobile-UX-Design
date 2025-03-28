import {EventEmitter, Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import {ApiService} from './api.service';
import {TokenService} from './token.service';
import { Chat } from '../interface/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  token: string | null = '';
  public chatSelected: EventEmitter<number> = new EventEmitter<number>();

  constructor(private readonly apiService: ApiService, private tokenService: TokenService) {
    this.token = this.tokenService.getToken();
  }

  public async init() {
    this.updateChats();
    this.startChatUpdate();
    console.log('ChatService initialized');

  }

  public chats: Chat[] = [];
  public selectedChatId: number | null = null;

  private startChatUpdate() {
    setInterval(() => {
      this.updateChats();
    }, 5000);
  }

  private async updateChats() {
    if (this.token && this.apiService.validateToken(this.token)) {
        this.apiService.getChats(this.token).subscribe((res: any) => {
        const newChats = res.chats;

        for (const newChat of newChats) {
          this.updateChat(newChat);
        }
        });
    }
  }

    private updateChat(chat: Chat) {
      const existingChatIndex = this.chats.findIndex(c => c.chatid === chat.chatid);
      if (existingChatIndex !== -1) {
        // Update existing chat
        this.chats[existingChatIndex] = {
          ...this.chats[existingChatIndex],
          chatname: chat.chatname,
          role: chat.role
        };
      } else {
        // Add new chat
        const newChat = {
          chatid: chat.chatid,
          chatname: chat.chatname,
          role: chat.role,
          messages: [],
          lastMessageId: -1
        };
        this.chats.push(newChat);
      }
    }

    public getChats(): Observable<Chat[]> {
      return of(this.chats);
    }

    public selectChat(chatid: number): void {
      this.selectedChatId = chatid;
      this.chatSelected.emit(chatid); // Notify that a chat has been selected
    }

    public getSelectedChatId(): number | null {
      return this.selectedChatId;
    }

}
