import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private user: any;

  constructor(private afAuth: AngularFireAuth) { }

  setUser(user) {
    this.user = user;
  }
  getAuthenticated(): Observable<any> {
    return this.afAuth.authState;
  }

}