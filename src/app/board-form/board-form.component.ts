import { Component, OnInit, Input } from '@angular/core';
import { Router }       from '@angular/router';
import { Board } from '../model/board';
import { BoardService } from '../shared/boardService/board.service';
import { Global } from '../shared/global';
@Component({
  selector: 'board-form',
  templateUrl: './board-form.component.html'
})
export class BoardFormComponent implements OnInit {
  @Input() showCreateBoard;
  @Input() newTitle: string;
  // showCreateBoard: { isOn: boolean; } = { isOn: true };

  board = new Board();
  errorMessage: string;
  hasError:boolean = false;
  isPublic = true;

  constructor(private router: Router, private boardSvc: BoardService, private global: Global) {
    this.newTitle = "New Board";
   }

  ngOnInit() {

  }

// Close the form
  closeBoard(){
      this.showCreateBoard.isOn = !this.showCreateBoard.isOn;
  }

// Save new board from the form.
  onSubmit(form:any):void{
    var classId = this.isPublic ? this.global.publicClassificationId : this.global.teamClassificationId;

    //  cast to Board object
    this.board = <Board>{title: form.value["title"], owner_Id: this.global.ownerid, classification_Id: classId};

    this.boardSvc.create(this.board)
      .subscribe((data) => {this.board = data; this.router.navigate(['/board', this.board.board_Id])}, err => this.errorMessage = <any>err);

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