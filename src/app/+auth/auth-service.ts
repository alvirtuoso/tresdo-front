import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
// import { Http ,HttpModule} from '@angular/http';

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