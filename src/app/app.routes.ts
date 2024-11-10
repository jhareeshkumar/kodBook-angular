import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {path:"profile",component:ProfileComponent},
    {path:"signup",component:SignupComponent}
];
