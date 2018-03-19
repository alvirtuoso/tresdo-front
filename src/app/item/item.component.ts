import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../shared/itemService/item.service';
import { Item } from '../model/item';

@Component({
  selector: 'item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {
    constructor(private itemSvc:ItemService) {}

  private _index: number;

  @Input()item: Item;

  @Input()
    set index(i: number) {
      // Only update index when item was moved by drag/drop which only happens at card.component. 
      // Without this flag check, itemSvc.update gets called when the component loads or on browser refresh.
    // if (this.item.sort_Order != i) {
    //   console.log('item index changed so save it', this.item.title + ' ' + i);
    //   this.item.sort_Order = i;
    //   this.itemSvc.updateRequest(this.item).subscribe();
    // }
  }

  // Getter for the index Input property
  get index(): number{
    return this._index;
  }


  ngOnInit() {
  }

}