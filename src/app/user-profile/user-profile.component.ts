import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../shared/userService/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})

export class UserProfileComponent implements OnInit {
  userForm: FormGroup;
    display_name: string;
  email: string;
  user_id: string;
  private observe: any;
  // userForm: any;
  usr: User;
  first: string;
   aUser = {first: '', last: '', email: '', display: '', cell: ''};
  constructor(private router: Router, private route: ActivatedRoute, private userSvc: UserService) {
            this.userForm = new FormGroup({
            fname: new FormControl('', CustomValidators.rangeLength([0, 50])),
            lname: new FormControl('', CustomValidators.rangeLength([0, 50])),
            cell: new FormControl('',  CustomValidators.phone('en-US')),
            email: new FormControl('', Validators.compose([Validators.required, CustomValidators.email])),
            displayName: new FormControl('',Validators.required)
        });
  }
  ngOnDestroy(){
    this.observe.unsubscribe();
  }
  ngOnInit() {
  
    this.observe = this.route.params
      .switchMap((param: Params) => this.userSvc.getUserByEmail('wedneer@yahoo.com'))//param['user']))
      // Somehow the this.usr doesn't get bound when used in the template. Have to create another object userObj to hold values
      // Perhaps, the this.usr is still subscribed to an observable of ActiveRoute or maybe the switchMap is the culprit by locking in this.usr??
     .subscribe((usr:User) => {
       this.usr = usr;  
       this.aUser.first = this.usr.first_Name;
       this.aUser.last = this.usr.last_Name;
       this.aUser.email = this.usr.email;
      this.aUser.display = this.usr.display_Name;
       this.aUser.cell = this.usr.cell;
      });

  }
  // Save info. Performs validation first.
  saveUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      // Save to database
      this.usr.first_Name = this.aUser.first;
      this.usr.last_Name = this.aUser.last;
      this.usr.email = this.aUser.email;
      this.usr.cell = this.aUser.cell;
      this.usr.display_Name = this.aUser.display;
      // Save to  database
      this.userSvc.updateByUser(this.usr);

    }
  }

// Close the form by navigating back to home page
  closeForm(){
     this.router.navigate(['']); // navigate to home
  }
}