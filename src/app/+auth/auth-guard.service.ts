import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import {AuthService} from '../+auth/auth-service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate{
  public allowed: boolean;

  constructor(private af: AngularFireAuth, private router: Router, private authService : AuthService) { 
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.getAuthenticated().map(user => {
      this.authService.setUser(user);
      return user ? true : false;
    });
    // return this.af.auth.map((auth) =>  { 
    //   if(auth == null) {
    //     this.router.navigate(['/login']);
    //     return false;
    //   } else {
    //     return true;

    //   }
    // }).first()
  }
}

// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// @Injectable()
// export class AuthGuard implements CanActivate {

//     constructor(private router: Router) { }

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//       console.log('canActivateher');
//         if (localStorage.getItem('currentUser')) {
//             // logged in so return true
//             return true;
//         }

//         // not logged in so redirect to login page with the return url
//         this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
//         return false;
//     }
// }