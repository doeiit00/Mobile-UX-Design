import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import {ChatComponent} from './components/chat/chat.component';

export const routes: Routes = [
  { path: '', title: 'Login', component: LoginComponent},
  { path: 'register', title: 'Register', component: RegisterComponent},

  { path: 'home', title: 'Messenger', component: HomePageComponent }, //canActivate: [AuthGuard]
  {path: 'chats', component: HomePageComponent},
  {path: 'chat/:chatid', component: ChatComponent},
  //add homepage
];


