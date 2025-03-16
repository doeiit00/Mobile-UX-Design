import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LogoutComponent } from './components/logout/logout.component';

export const routes: Routes = [
  { path: '', title: 'Login', component: LoginComponent},
  { path: 'register', title: 'Register', component: RegisterComponent},

  { path: 'home', title: 'Messenger', component: HomePageComponent }, //canActivate: [AuthGuard]
  { path: 'logout', title: 'Logout', component: LogoutComponent}, //canActivate: [AuthGuard]
  //add homepage
];


