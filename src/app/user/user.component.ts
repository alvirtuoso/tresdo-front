import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import {Observable} from "RxJS/Rx";
import { UserService } from '../shared/userService/user.service';

@Component({
  selector: 'user-list',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

  users: User[] = [];
  errorMessage: string = '';
  constructor(private userSvc: UserService) { }

  ngOnInit() {
     // called after the constructor and called  after the first ngOnChanges()
    this.getUsers();
  }

  getUsers() {
     this.userSvc.getAll()
                      .subscribe(
                       usersData => {this.users = usersData},
                       error =>  {this.errorMessage = <any>error});
  }

}