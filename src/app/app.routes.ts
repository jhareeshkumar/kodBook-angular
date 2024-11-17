import { Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { FeedComponent } from './components/feed/feed.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'feed', component: FeedComponent, canActivate: [authGuard] },
    { path: 'profile', component: ProfileComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: PagenotfoundComponent },
];
