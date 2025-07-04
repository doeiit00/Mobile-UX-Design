import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ApiService} from '../../services/api.service';
import {TokenService} from '../../services/token.service';
import {ChatService} from '../../services/chat.service';
import {MatList, MatListItem} from '@angular/material/list';
import { Chat } from '../../interface/chat';
import {ChatComponent} from '../chat/chat.component';
import {CreateChatComponent} from '../create-chat/create-chat.component';
import {PopupInvitesComponent} from '../popup-invites/popup-invites.component';
import {PopupHelperComponent} from '../popup-helper/popup-helper.component';
import {PopupDeregistrationComponent} from '../popup-deregistration/popup-deregistration.component';


@Component({
  standalone: true,
  selector: 'app-landing-page',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatList, MatListItem, RouterLink, /*ChatComponent,*/ CreateChatComponent, PopupDeregistrationComponent, PopupHelperComponent, /*PopupInvitesComponent*/],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  router = inject(Router)
  token: string | null = '';
  chats: any[] = [];
  invite: any[] = [];

  chatid: number | null = null;


  constructor(private apiService: ApiService, private tokenService: TokenService, public chatService: ChatService) {
    this.token = this.tokenService.getToken();
    this.chatService.getChats().subscribe((data: Chat[]) => {
      this.chats = data;
    });
    this.chatService.init();
    this.chatid = this.chatService.getSelectedChatId();
    //this.getInvites();
  }

  // getInvites() {
  //   if (this.token) {
  //     this.apiService.getInvites(this.token).subscribe((data: any[]) => {
  //       this.invite = data;
  //     });
  //   }
  // }


  logout() {
    if (this.token) {
      this.apiService.logout(this.token).subscribe(() => {
          console.log('Logged out with token:', this.token);
          this.tokenService.clearToken();
          this.router.navigateByUrl("").then(() => {
            window.location.reload(); // Seite neu laden
          });
        },
        (error) => {
          this.tokenService.clearToken();
          console.error('Error logging out:', error);
        }
      );
    }
  }

  isPopupCreateChatVisible = false;

  showPopupCreateChat() {
    this.isPopupCreateChatVisible = true;
  }

  hidePopupCreateChat() {
    this.isPopupCreateChatVisible = false;
  }

  isPopupInviteVisible = false;

  showPopupInvites() {
    this.isPopupInviteVisible = true;
  }

  hidePopupInvite() {
    this.isPopupInviteVisible = false;
  }

  isPopupHelperVisible = false;

  showPopupHelper() {
    this.isPopupHelperVisible = true;
  }

  hidePopupHelper() {
    this.isPopupHelperVisible = false;
  }

  isPopupDeregistrationVisible = false;

  showPopupDeregistration() {
    this.isPopupDeregistrationVisible = true;
    this.isPopupCreateChatVisible = false;
  }

  hidePopupDeregistration() {
    this.isPopupDeregistrationVisible = false;
  }

}
