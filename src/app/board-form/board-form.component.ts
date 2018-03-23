import { Component, OnInit, Input } from '@angular/core';
import { Router }       from '@angular/router';
import { Board } from '../model/board';
import { BoardService } from '../shared/boardService/board.service';
import { Global } from '../shared/global';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as BoardActions from '../actions/board.action';
import { AppStore } from '../app.store';

@Component({
  selector: 'board-form',
  templateUrl: './board-form.component.html'
})
export class BoardFormComponent implements OnInit {
  @Input() showCreateBoard;
  @Input() newTitle: string;

  newBoard: Observable<Board>;
  board = new Board();
  errorMessage: string;
  hasError:boolean = false;
  isPublic = true;

  constructor(private store: Store<AppStore>, private router: Router, private boardSvc: BoardService, private global: Global) {
    this.newTitle = "New Board";
    this.newBoard = this.store.select('board');
   }

  ngOnInit() {

  }

// Close the form
  closeBoard(){
      this.showCreateBoard.isOn = !this.showCreateBoard.isOn;
  }
// Close the form by navigating back to home page
closeForm(){
  this.router.navigate(['']); // navigate to home
}
// Save new board from the form.
  onSubmit(form:any):void{
    this.isPublic = form.value["classification_id"];
    var classId = this.isPublic ? this.global.publicClassificationId : this.global.teamClassificationId;
console.log('form classid', form.value["classification_id"]);
console.log('classId', classId);
    //  cast to Board object
    this.board = <Board>{
       board_Id: null
      , owner_Id: window.localStorage.getItem("currentUserId")
      ,title: form.value["title"]
      , date_Created: new Date(Date.now())
      , classification_Id: classId
      , initial_Card_Id: null
    };

    this.boardSvc.create(this.board)
      .subscribe((data) => {
        this.store.dispatch(new BoardActions.AddBoard(data));
        
        this.board = data; 
        this.router.navigate(['/board', this.board.board_Id])
      }, err => this.errorMessage = <any>err);

      if(typeof this.errorMessage !='undefined' && this.errorMessage){
        this.hasError = true;
        this.errorMessage = 'Server Error: HttpRequest';
      }else{
        this.hasError = false;
        this.errorMessage = '';
        
      }

      // Close the form
     this.closeBoard();


    }


}