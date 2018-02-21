import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from '../shared/cardService/card.service';
import { Card } from '../model/card';
import { ActivatedRoute, Params } from '@angular/router';
import {Observable} from "RxJS/Rx";

@Component({
  selector: 'board',
  templateUrl: './board.component.html'
  // styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  cards: Card[] = [];
  errorBoardMsg:string;
  private observe: any;
  id: string;

  ngOnInit() {
    // pass this.id to card.component's boardId input directive. Load the cards in the card.component
      this.observe = this.route.params
                    .do(params => {})
                     .subscribe(params => {this.id = params['id']});  // (+) converts string 'id' to a number
   }

   ngOnDestroy() {
    // this.observe.unsubscribe();
  }
}