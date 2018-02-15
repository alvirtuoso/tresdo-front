import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/userService/user.service';
import { AngularFireAuth, AUTH_PROVIDERS } from 'angularfire2/auth';
import * as firebase from 'firebase/app';;

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router, private userSvc: UserService) {
     
   }

  ngOnInit() {
  }

// Login with username and password
  loginPassword(formData) {
    if(formData.valid) {
      console.log("formdata login: ", formData.value);
      this.afAuth.auth.signInWithEmailAndPassword(
       formData.value.email,
       formData.value.password
      ).then(
        (success) => {
        console.log('Login Success: ', success);
        this.saveUserToDb(); // Saves to database only if user does not exists and redirects to home
      }).catch(
        (err) => {
        console.log('Login Error: ', err);
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
        console.log('Login Success: ', success);
        this.saveUserToDb(); // Save to db if user does not exists and redirect to home
      }).catch(
        (err) => {
        console.log('Login Error: ', err);
        this.router.navigate(['/login']);
      });
}

// Logout user. Applies to both google or email-pwd authentication
  logout() {
    this.afAuth.auth.signOut();
  }

 // Saves user to the Db if it doesn't exist then redirects to home.
  private saveUserToDb():void{
        this.userSvc.Add(this.afAuth.auth.currentUser.email, this.afAuth.auth.currentUser.displayName)
        .finally(() => this.router.navigate([''])) // redirect to home
        .subscribe((usr)=> {console.log('saveUserToDb in nav.component', usr)});
        this.router.navigate(['']);// Redirect to home
  }
}