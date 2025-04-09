import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, concatMap, EMPTY, from, Observable, tap} from 'rxjs';
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

  public photos: { [messageId: number]: string} = {};

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
  public async updateMessages(chatid: number) {
    //console.log('updateMessages called for chatid:', chatid);
    if (this.token && this.apiService.validateToken(this.token)) {
      const lastMessageId = this.messagesSubject.getValue().length > 0
        ? this.messagesSubject.getValue().slice(-1)[0].id
        : 0;

      this.apiService.getMessages(this.token, lastMessageId, chatid).subscribe((res: any) => {
        const newMessages = res.messages.filter((message: Message) => message.chatid === chatid);

        if (newMessages.length > 0) {
          const existingMessages = this.messagesSubject.getValue();
          const combinedMessages = [
            ...existingMessages,
            ...newMessages.filter((message: Message) => !existingMessages.some((existing: Message) => existing.id === message.id))
          ];

          // Bilder sequentiell laden
          from(newMessages as Message[])
            .pipe(
              concatMap(async (message: Message) => {
                if (message.photoid) {
                  try {
                    const imageBlob = await this.apiService.getPhoto(this.token!, message.photoid).toPromise();
                    const imageUrl = URL.createObjectURL(imageBlob);
                    this.photos[message.id] = imageUrl;
                    //console.log(`Photo loaded for message ID: ${message.id} and photo ID: ${message.photoid}`);
                    //console.log('Message:', message);
                  } catch (error) {
                    console.error(`Failed to load photo for message ID: ${message.id}`, error);
                    this.photos[message.id] = 'assets/fallback-image.png'; // Fallback-Bild
                  }
                  // Verzögerung von 1 Sekunde
                  await new Promise(resolve => setTimeout(resolve, 500));
                }
              })
            )
            .subscribe();

          this.messagesSubject.next(combinedMessages);
        } else {
          //console.log('No new messages found');
        }
      }, error => {
        console.error('Failed to fetch messages:', error);
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
