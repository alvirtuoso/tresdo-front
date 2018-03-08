import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/userService/user.service';
import { AngularFireAuth, AUTH_PROVIDERS } from 'angularfire2/auth';
import * as firebase from 'firebase/app';;
import {Observable} from "RxJS/Rx";
import { Response } from '@angular/http';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  errMsg: string;

  constructor(private afAuth: AngularFireAuth, private router: Router, private userSvc: UserService) {
     
   }

  ngOnInit() {
    this.errMsg = '';
  }


// Login with username and password
  loginPassword(formData) {
    if(formData.valid) {
      this.afAuth.auth.signInWithEmailAndPassword(
       formData.value.email,
       formData.value.password
      ).then(
        (success) => {
        this.saveUserToDb(); // Saves to database only if user does not exists and redirects to home
      }).catch(
        (err) => {
          this.handleError(err);
        this.router.navigate(['/login']);
      })
    }
  }

  // Login using Google account
  loginGoogle() {
    console.log('login starts');
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(
        (success) => {
        this.saveUserToDb(); // Save to db if user does not exists and redirect to home
      }).catch(
        (err) => {
          this.handleError(err);
        this.router.navigate(['/login']);
      });
}

// Logout user. Applies to both google or email-pwd authentication
  logout() {
    this.afAuth.auth.signOut();
  }

  private handleError (error: Response | any) {
    // Enhance: Use a remote logging infrastructure
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      this.errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      this.errMsg = error.message ? error.message : error.toString();
    }
    if(this.errMsg){
      toast(this.errMsg, 4000, 'alert-danger');
    }
    return Observable.throw(this.errMsg);
  }

 // Saves user to the Db if it doesn't exist then redirects to home.
  private saveUserToDb():void{
        this.userSvc.Add(this.afAuth.auth.currentUser.email, this.afAuth.auth.currentUser.displayName)
        .finally(() => this.router.navigate([''])) // redirect to home
        .subscribe((usr)=> {console.log('saveUserToDb in nav.component', usr)});
        this.router.navigate(['']);// Redirect to home
  }
}