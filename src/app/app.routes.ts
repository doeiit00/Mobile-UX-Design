import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';

export const routes: Routes = [
  { path: '', title: 'Messenger', component: LandingPageComponent },
  { path: 'register', title: 'Register', component: RegisterComponent},
  { path: 'login', title: 'Login', component: LoginComponent}, //canActivate: [AuthGuard]
  { path: 'logout', title: 'Logout', component: LogoutComponent},
  //add homepage
];
