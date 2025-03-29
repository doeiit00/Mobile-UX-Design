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

@Component({
  standalone: true,
  selector: 'app-chat',
    imports: [
        MatIcon,
        MatIconButton,
        MatList,
    ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  token: string | null = '';
  message: any[] = [];
  selectedChatName: string | null = '';

  constructor(private apiService: ApiService, private tokenService: TokenService, private messageService: MessagesService, private chatService: ChatService) {
    this.token = this.tokenService.getToken();
    this.messageService.getMessages().subscribe((data: Message[]) => { this.message = data; });
    this.messageService.init(); // Ensure init is called
    this.selectedChatName = this.chatService.getSelectedChatName();
  }
}
