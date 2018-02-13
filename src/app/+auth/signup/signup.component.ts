import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html'
})

export class SignupComponent {

  constructor(private af: AngularFireAuth, private router: Router) {  }

  onSubmit(formData) {
    if(formData.valid) {
      // console.log(formData.value);
      this.af.auth.createUserWithEmailAndPassword(
        formData.value.email,
        formData.value.password
      ).then(
        (success) => {
        console.log('User Registration Success: ', success);
        this.router.navigate(['/login'])
      }).catch(
        (err) => {
        console.log('User Reg Error: ', err);
        this.router.navigate(['/login']);
      })
    }
  }
}