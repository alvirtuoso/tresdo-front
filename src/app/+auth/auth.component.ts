import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AngularFireAuth  } from 'angularfire2/auth';

@Component({
  selector: 'auth',
  template: `<login></login>
            <signup></signup>
  `
})

export class AuthComponent {

  constructor() {  }

}