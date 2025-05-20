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
import { CameraService } from '../../services/camera.service';
import {CameraOverlayComponent} from '../camera-overlay/camera-overlay.component';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {Router} from '@angular/router';
import {ProfilesService} from '../../services/profiles.service';
import {Profile} from '../../interface/profile';
import {Observable} from 'rxjs';
import {UserService} from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [
    MatIcon,
    MatIconButton,
    MatList,
    FormsModule,
    NgClass,
    CameraOverlayComponent,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [DatePipe]
})
export class ChatComponent implements AfterViewChecked{
  @ViewChild('chatWindow') private chatWindow!: ElementRef;
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  message: Message[] = [];
  selectedChatName: string | null = '';
  chatid: number | null = null;

  token: string | null = '';
  text: string = '';
  photo: string = '';
  position: string = '';
  photos: { [key: string]: string } = {};
  profile: Profile[] = [];
  userID: string | null = '';

  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private messageService: MessagesService,
    private chatService: ChatService,
    private profilesService: ProfilesService,
    private datePipe: DatePipe,
    private cameraService: CameraService,
    private router: Router,
    private userService: UserService,

) {
    this.token = this.tokenService.getToken();
    this.messageService.getMessages().subscribe((data: Message[]) => { this.message = data});
    this.messageService.init();
    this.selectedChatName = this.chatService.getSelectedChatName();
    console.log(this.selectedChatName);
    this.photos = this.messageService.photos;
    this.chatid = this.chatService.getSelectedChatId();
    this.userID = this.userService.getUser();

    this.chatService.chatSelected.subscribe(chatid => {
      this.selectedChatName = this.chatService.getSelectedChatName();
    });

    this.profilesService.loadProfiles();

    this.profilesService.getProfiles().subscribe((data: Profile[]) => {
      this.profile = data;
      console.log(data);
    });

    setTimeout(() => this.dataRequest(), 2000); // Verzögerung von 2 Sekunden

  }


  dataRequest() {
    console.log('Data request initiated', this.profile);
  }

  isCameraOverlayVisible: boolean = false;

  openCameraOverlay(): void {
    this.isCameraOverlayVisible = true;
  }

  handlePhotoCaptured(photo: string): void {
    this.photo = photo;
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
          this.photo = ''; // Foto nach dem Senden zurücksetzen
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
    console.log('Image error for message ID:', messageId);
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

    return this.datePipe.transform(parsedDate, 'HH:mm'); //'dd.MM.yyyy, HH:mm:ss'
  }

  leaveChat() {
    if (this.token && this.chatid !== null) {
      this.apiService.leaveChat(this.token, this.chatid).subscribe({
        next: (res: any) => {
          console.log('Left chat:', this.chatid);
          console.log('Leave chat response:', res);
        },
        error: (err) => {
          console.error('Leave chat failure:', err);
        }
      });
    } else {
      console.error('Token is null or chatid is undefined');
    }
  }

  invite(hash: string) {
    if (this.token && this.chatid !== null) {
      console.log('Inviting profile:', hash);
      this.apiService.invite(this.token, this.chatid, hash).subscribe({
        next: (res: any) => {
          console.log('Invite response:', res);
        },
        error: (err) => {
          console.error('Fehler beim Einladen des Profils:', err);
        }
      });
    } else {
      console.error('Token ist null oder chatid ist undefined');
    }
  }

  deleteChat() {
    if (this.token && this.chatid !== null) {
      this.apiService.deleteChat(this.token, this.chatid.toString()).subscribe({
        next: async (res: any) => {
          console.log('Deleted chat:', this.chatid);
          console.log('Delete chat response:', res);
          await this.router.navigate(['/home'], { replaceUrl: true });
          window.location.reload();
        },
        error: (err) => {
          console.error('Delete chat failure:', err);
        }
      });
    } else {
      console.error('Token is null or chatid is undefined');
    }
  }

  goBack() {
    this.router.navigate(['/home'], { replaceUrl: true }).then(() => {
      window.location.reload();
    });
  }

}
