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
      this.chatSelected.emit(this.selectedChatId); // Notify that a chat has been selected
      console.log("Chat selected: " + chatid);
    }

    public getSelectedChatId(): number | null {
      return this.selectedChatId;
      //console.log("getChatId: " + this.selectedChatId);
    }

  public getSelectedChatName(): string {
    // Prüfen, ob selectedChatId null ist
    if (this.selectedChatId === null) {
      return 'Kein Chat ausgewählt';
    }

    // Umwandeln von selectedChatId zu number (falls es ein string ist)
    const chatIdNumber = typeof this.selectedChatId === 'string' ? Number(this.selectedChatId) : this.selectedChatId;

    // Überprüfen, ob chatIdNumber eine gültige Zahl ist
    if (isNaN(chatIdNumber)) {
      return 'Ungültige Chat-ID';
    }

    // Suchen des Chats anhand der chatid
    const chat = this.chats.find(c => Number(c.chatid) === chatIdNumber);

    return chat ? chat.chatname : 'Kein Chat gefunden';
  }

}
