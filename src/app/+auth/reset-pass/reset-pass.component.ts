import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';;

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  public auth: any;
  public message: any;
  passsword:string;
  email:string;
  constructor(private af: AngularFireAuth) {
    this.auth = af.auth;
    console.log(this.auth);
  }

  ngOnInit() {
  }
  // Handle Reset submission
  onSubmit(formData) {
     if(formData.valid) {
       console.log('Submission worked');
       this.auth.sendPasswordResetEmail(formData.value.email)
         .then( (response) => {
           console.log('Reset pass Sent successfully', response);
           this.message = 'Check your email for reset link';
         })
         .catch( (error) => {
           this.message = error;
           console.log('Reset password error: ', error);
         })
     }
  }
}