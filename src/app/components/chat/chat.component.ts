import {AfterViewChecked, Component, ElementRef, ViewChild} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatList} from "@angular/material/list";
import {ApiService} from '../../services/api.service';
import {TokenService} from '../../services/token.service';
import {MessagesService} from '../../services/messages.service';
import {Message} from '../../interface/message';
import {ChatService} from '../../services/chat.service';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgClass} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [
    MatIcon,
    MatIconButton,
    MatList,
    FormsModule,
    NgClass,
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [DatePipe]
})
export class ChatComponent implements AfterViewChecked{
  @ViewChild('chatWindow') private chatWindow!: ElementRef;

  message: Message[] = [];
  selectedChatName: string | null = '';

  token: string | null = '';
  text: string = '';
  photo: string = '';
  position: string = '';
  photos: { [key: string]: string } = {};


  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private messageService: MessagesService,
    private chatService: ChatService,
    private datePipe: DatePipe,
) {
    this.token = this.tokenService.getToken();
    this.messageService.getMessages().subscribe((data: Message[]) => { this.message = data});
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
        next: async (res: any) => {
          console.log('Message sent in:', chatid);
          console.log('Post message response:', res);
          await this.messageService.updateMessages(chatid); // Update messages after sending
          this.text = ''; // Clear the input field after sending
        },
        error: (err) => {
          console.error('Post message failure:', err);
        }
      });
    } else {
      console.error('Token is null or chatid is undefined');
    }
  }

  ngAfterViewChecked() {
    //this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.chatWindow.nativeElement.scrollTo({
        top: this.chatWindow.nativeElement.scrollHeight,
        behavior: 'smooth'
      });
    } catch(err) {
      console.error('Scroll to bottom failed:', err);
    }
  }

  onImageError(messageId: number) {
    this.photos[messageId] = 'assets/fallback-image.png';
  }

  formatMyDate(date: string): string | null {
    if (!date) return null;

    // Handle formats like "2025-04-01_17-27-37"
    const parts = date.split('_');
    if (parts.length !== 2) return null;

    const datePart = parts[0]; // "2025-04-01"
    const timePart = parts[1].replace(/-/g, ':'); // "17:27:37"

    const isoDate = `${datePart}T${timePart}`;

    const parsedDate = new Date(isoDate);
    if (isNaN(parsedDate.getTime())) {
      console.warn('Still invalid:', isoDate);
      return null;
    }

    return this.datePipe.transform(parsedDate, 'dd.MM.yyyy, HH:mm:ss');
  }
}
