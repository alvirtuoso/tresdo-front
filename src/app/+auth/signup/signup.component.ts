import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../../shared/userService/user.service';
import * as firebase from 'firebase/app';
import { AppStore } from '../../app.store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/user';
import * as UserActions from '../../actions/user.action';

// import { AlertService } from '../../shared/alertService/alert.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html'
})

export class SignupComponent {

  constructor(private store: Store<AppStore>, private af: AngularFireAuth, private userService: UserService, private router: Router) { 
    this.curUser = store.select('user');
   }

  curUser:Observable<User>;
  email:string;
  password:string;
  message = '';
  onSubmit(formData) {
    if(formData.valid) {
      this.af.auth.createUserWithEmailAndPassword(
        formData.value.email,
        formData.value.password
      ).then(
        (success) => {
        console.log('User Registration Success: ', success);
        this.saveUserToDb();
        this.router.navigate(['/login']);
      }).catch(
        (err) => {
        console.log('User Reg Error: ', err);
        this.message = err;
      })
    }
  }
   // Saves user to the Db if it doesn't exist then redirects to home.
   private saveUserToDb():void{
    this.userService.Add(this.af.auth.currentUser.email, this.af.auth.currentUser.displayName)
      .finally(()=> {
        this.router.navigate(['']);
      }) // redirect to home
      .do((usr) => {
        // Todo: do some loggin.
      }) 
      .subscribe((usr)=> {
        window.localStorage.setItem("currentUserId", usr.user_Id);
        this.store.dispatch(new UserActions.AddUser(usr));
      });
  }

}