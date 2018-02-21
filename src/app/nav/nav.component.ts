import { Component, OnInit } from '@angular/core';
import { Board } from '../model/board';
import { BoardService } from '../shared/boardService/board.service';
import { UserService } from '../shared/userService/user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  showNewBoard: { isOn: boolean; } = { isOn: false };
  boards: Board[] = [];
  isLoggedIn: Boolean = true;
  titleHeader: String  = "Create Board";
  curUserEmail: String;
  constructor(private userSvc:UserService, private boardSvc: BoardService, private af: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    // Check user auth state
    this.af.auth.onAuthStateChanged(curUser => {
      if(curUser){
        this.isLoggedIn = true;
        // Fetch all boards with specified email
        this.boardSvc.getPrivateBoards(curUser.email)
            .subscribe(resp => { this.boards = resp });
        
        // Add the user to the database in the server(a copy from firebase)
        // User may still have an open logged in session from previously closed browser or so. Save to db if user exists
        this.userSvc.Add(curUser.email, curUser.displayName)
                    .do((usr)=> {window.localStorage.setItem("currentUserId", usr.user_Id)})
                    .subscribe((usr)=> {});
      }else
      {
        this.isLoggedIn = false;
        this.boardSvc.getPublicBoards()
            .subscribe(resp => this.boards = resp);
      }

    });
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
  login(){
    this.router.navigate(['/login']);
  }

}