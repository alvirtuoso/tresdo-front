import { Component, OnInit } from '@angular/core';
import { Board } from '../model/board';
import { User } from '../model/user';
import { BoardService } from '../shared/boardService/board.service';
import { UserService } from '../shared/userService/user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppStore } from '../app.store';
import * as UserActions from '../actions/user.action';
@Component({
  selector: 'nav-menu',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  // Store variables
  newBoard: Observable<Board>;
  curUser: Observable<User>;

  showNewBoard: { isOn: boolean; } = { isOn: false };
  boards: Board[] = [];
  board: Board;

  isLoggedIn: Boolean = true;
  titleHeader: String  = "Create Board";
  curUserEmail: String;
  constructor(private store: Store<AppStore>, private userSvc:UserService, private boardSvc: BoardService, private af: AngularFireAuth, private router: Router) {
    this.newBoard = this.store.select('board');
    this.curUser = this.store.select('new_user');
  
   }

  ngOnInit() {
    console.log('herefrom nav.component Init');
    // Check user auth state
    this.af.auth.onAuthStateChanged(curUser => {
      // Check user if user is logged in
      if(curUser){
        this.isLoggedIn = true;
        let testUser = new User('123Test', true, 'email@test.com', '', '', '', '', '', '', '', '', 'testuser');
        testUser.user_Id = '123test';
        testUser.first_Name = 'TestUser';
        // this.store.dispatch(new UserActions.AddUser(testUser));
        // Fetch all boards with specified email
        this.boardSvc.getPrivateBoards(curUser.email)
            .subscribe(resp => { this.boards = resp });
        
        // Add the user to the database in the server(a copy from firebase)
        // User may still have an open logged in session from previously closed browser or so. Save to db if user exists
        this.userSvc.Add(curUser.email, curUser.displayName)
                    .do((usr)=> {window.localStorage.setItem("currentUserId", usr.user_Id)})
                    .subscribe((usr)=> {
                      // Dispatch action that user is added. Importantly, we need the user_Id for currently logged in user.
                      this.store.dispatch(new UserActions.AddUser(usr));
                    });
      }else
      {
        this.isLoggedIn = false;
        this.boardSvc.getPublicBoards()
            .subscribe(resp => this.boards = resp);
      }

    });
  }

  // Event when user mouse over the boards dropdown list.
  onMouseEnter(){
    this.curUser.subscribe((u) => {console.log('onMouseEnter user state:', u);});
    // Listen or subscribe to when a new board is created
    this.newBoard.subscribe((boardData) => {
      console.log('onmouseenter', this.boards);
      if(boardData && !this.isExistingBoard(boardData)){
        this.boards.push(boardData);
      }
        
    })
  }

  isExistingBoard(board: Board){
    if(board){
      for (let index = 0; index < this.boards.length; index++) {
        const b = this.boards[index];
        if (b.board_Id === board.board_Id) {
          return true;
        }
    }
     }
     return false;
  }
  // Open and close new board form.
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