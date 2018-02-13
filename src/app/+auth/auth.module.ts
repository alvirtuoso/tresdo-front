import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'reset', component: ResetPassComponent }
    ])
  ],
 declarations:[ AuthComponent, LoginComponent, SignupComponent,
    ResetPassComponent
],
 exports: [LoginComponent, SignupComponent, ResetPassComponent],

})
// export const authComponents = [LoginComponent, SignupComponent];

export class AuthModule { }