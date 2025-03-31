import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatList, MatListItem} from "@angular/material/list";
import {RouterLink} from "@angular/router";
import {ApiService} from '../../services/api.service';
import {TokenService} from '../../services/token.service';
import {MessagesService} from '../../services/messages.service';
import {Message} from '../../interface/message';
import {ChatService} from '../../services/chat.service';
import {FormsModule} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [
    MatIcon,
    MatIconButton,
    MatList,
    FormsModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  message: Message[] = [];
  selectedChatName: string | null = '';

  token: string | null = '';
  text: string = '';
  photo: string = '';
  position: string = '';


  constructor(private apiService: ApiService, private tokenService: TokenService, private messageService: MessagesService, private chatService: ChatService) {
    this.token = this.tokenService.getToken();
    this.messageService.getMessages().subscribe((data: Message[]) => { this.message = data; });
    this.messageService.init(); // Ensure init is called
    this.selectedChatName = this.chatService.getSelectedChatName();
    console.log(this.selectedChatName);

    this.chatService.chatSelected.subscribe(chatid => {
      this.selectedChatName = this.chatService.getSelectedChatName();
    });
  }

  sendMessage() {
    const chatid = this.chatService.getSelectedChatId();
    if (this.token && chatid !== null) {
      this.apiService.postMessage(this.token, this.text, this.photo, this.position, chatid).subscribe({
        next: (res: any) => {
          console.log('Message sent in:', chatid);
          console.log('Post message response:', res);
          this.messageService.init();
        },
        error: (err) => {
          console.error('Post message failure:', err);
        }
      });
    } else {
      console.error('Token is null or chatid is undefined');
    }
  }
}
