import { Component, OnInit } from '@angular/core';
import { Board } from '../model/board';
import { BoardService } from '../shared/boardService/board.service';
import { UserService } from '../shared/userService/user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav.component.html'
  // styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  showNewBoard: { isOn: boolean; } = { isOn: false };
  boards: Board[] = [];
  isLoggedIn: Boolean = true;
  titleHeader: string  = "Create Board";
  constructor(private userSvc:UserService, private boardSvc: BoardService, private af: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.boardSvc.getAll()
    .do(resp => {this.boards = resp; console.log('boards: ', resp)})
    .subscribe(resp => this.boards = resp);

    // Check user auth state
    // this.af.auth.subscribe(authState => {
    //   if(authState){
    //     this.isLoggedIn = true;
    //     this.userSvc.Add(authState.auth.email, authState.auth.displayName)
    //                 // .do((usr)=> {this.router.navigate(['/profile', authState.auth.email ])})
    //                 .finally(() => this.router.navigate(['/profile', authState.auth.email]))
    //                 .subscribe((usr)=> {console.log('user in nav.component', usr)});
    //   }else
    //   {
    //     this.isLoggedIn = false;
    //   }
    // });
  }

  toggleNewBoard(){
    this.showNewBoard.isOn = !this.showNewBoard.isOn;
  }

 // Navigate to user' profile page
 goProfile(){
   this.af.auth.onAuthStateChanged(currentUser => {
     // If logged in go to profile page
     if(currentUser){
       this.router.navigate(['/profile', currentUser.email ]);
     }
   })
 }
 goHome(){
   this.router.navigate(['']);
 }
 goAbout(){
   this.router.navigate(['/about']);
 }
  logout(){
    this.af.auth.signOut();
    this.router.navigate(['/login']);
  }

}