import { Component, OnInit, OnChanges, AfterViewInit, ViewContainerRef, Renderer, ViewChild, ElementRef, Input, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Card } from '../model/card';
import { CardService } from '../shared/cardService/card.service';
import { ItemService } from '../shared/itemService/item.service';
import { Item } from '../model/item';
import { Global } from '../shared/global'
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
// import { Overlay } from 'angular2-modal';
// import { Modal } from 'angular2-modal/plugins/bootstrap';

import {IMyOptions, IMyDateModel} from 'mydatepicker';
import { Media_Data } from '../model/media_data';
import * as FileSaver from 'file-saver';
// import { Repository } from '../model/repository';

@Component({
  selector: 'card',
  templateUrl: './card.component.html'
  // styleUrls: ['./card.component.css']

})
export class CardComponent implements OnInit, AfterViewInit {
@Input() boardId:string;
@ViewChild('namebox') namebox: ElementRef;
showDatePicker: boolean = false;
showUploadInput: boolean = false;
enableTitleEdit: boolean = false;
date: string;
textDescription: string;
btnDateText: string = 'Due Date';
uploadText: string = 'Upload';
index: number;
cards: Card[] = [];
card: Card;
anItem: Item; // gets initialized at openItem()
items: Item[] = [];
itemAttachments: Media_Data[];
errorMessage: string;
cardNameOnEdit: string;
hideme:any = {};
isDelete: boolean = false;
deleteNow: boolean = false;
itemDlgIsOpen: boolean = false;
newCardName = '';
itemDlgTitle = '';
editableContent: string;
showEditor: boolean = false;
fileUploadParam:{itemId:string} = {itemId: ""};
fileUrl: SafeResourceUrl;

  constructor(
    vcRef: ViewContainerRef, 
    public modal: Modal, 
    private renderer: Renderer, 
    private cardSvc: CardService, 
    private itemSvc: ItemService, 
    private global: Global,
    private sanitizer: DomSanitizer)
  {
    // overlay.defaultViewContainer = vcRef;

    // const bag: any = this.dragulaService.find('bagOne');
    // if (bag !== undefined ) this.dragulaService.destroy('bagOne');
    // this.dragulaService.setOptions('bagOne', { revertOnSpill: true });
    // dragulaService.drop.subscribe((value) => {
    //   // this.onDrop(value.slice(1));
    // });

  }

private GetItemAttachmentsByItemId(item_Id: string): void{
  this.itemSvc.getAttachmentsMediaByItemId(item_Id).subscribe(
    attachments => { 
      this.itemAttachments = attachments; 
    },
    err => { this.itemSvc.handleErrorMsg(err.toString()) }
  );
}

private downloadFile(filename:string, file_ext:string, mediaId:string){
  this.itemSvc.getAttachmentBlob(mediaId, file_ext).subscribe( fileData => {

     let blob = new Blob([fileData], { type: this.global.dictionary[file_ext] }); // file_ext must match the Accept type in the http request header

    FileSaver.saveAs(fileData, filename);
  })
}

private removeMediaAttachment(item_Media_Data_Id:string): void{
  this.itemSvc.removeMediaAttachment(item_Media_Data_Id);
}
/**
 * Sets options for the date picker UI
 */
  private myDatePickerOptions: IMyOptions = {
      // other options...
      dateFormat: 'mm/dd/yyyy',
      inline: true,
      showTodayBtn: true,
  };
  
    /**
     * dateChanged callback function called when the user select the date. This is mandatory callback
     * in this option. There are also optional inputFieldChanged and calendarViewChanged callbacks.
     * @param event
     */
    private onDateChanged(event: IMyDateModel) {
      this.date = event.formatted;
      this.btnDateText = 'Close';
      console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
      console.log('thisanitem OndateChanged', this.anItem);
      if(this.anItem != null){
        this.anItem.due_Date = new Date(this.date);
        this.anItem.date_Modified = new Date();
        this.itemSvc.updateRequest(this.anItem).subscribe();
      }
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
       // console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    }

  /**
   * Opens and closes the date picker
   */
  private toggleDate(){
    if(this.btnDateText == 'Close'){
      this.btnDateText = 'Due Date';
    }
    else{
      this.btnDateText = 'Close';
    }
    this.showDatePicker = !this.showDatePicker;
  }

  private toggleUpload(){
    if(this.uploadText == 'Upload'){
      this.uploadText = 'Close';
    }
    else{
      this.uploadText = 'Upload';
    }
    this.showUploadInput = !this.showUploadInput;

  }

  // Edits a Card's name
  private onEnter(value: any) {
    this.card = new Card();
    // this.card.name = <string>value.namebox;
    // this.card.card_id = value.cardid;
    this.card.name = <string>value.namebox;
    this.card.card_Id = <string>value.cardid;
    this.card.active = true;
    this.card.owner_Id = window.localStorage.getItem('currentUserId'); //todo: Replace when login code is done
    this.card.board_Id = this.boardId;

    // Call card edit service
    // this.getCardsByBoardId(this.boardId);

    this.cardSvc.updateRequest(this.card);

}

  ngOnInit() {
  
  }

  ngOnChanges(){
    if(this.boardId){
     this.getCardsByBoardId(this.boardId);
    }
  }

  ngAfterViewInit(){
    // set the focus on the input box when component loads
    // this.renderer.invokeElementMethod(this.namebox.nativeElement, 'focus', []);
  }


/**
 * Saves edited description text
 * @param value Event data when content was changed
 */
private onTextUpdate(value){
  // if(this.anItem != null ){
  //   this.anItem.description = value.html;
  // }
  this.anItem.description = value; // or this.textDescription;
  console.log('description::', this.anItem.description);
  this.itemSvc.updateRequest(this.anItem).subscribe(item => this.reflectItemChangesToView);
}

/**
 * Updates an item in display when updated in the server.
 */
private reflectItemChangesToView(){
  console.log('reflectchanges', this.items[this.index].description);
  this.items[this.index].description = this.anItem.description;
    // for (var index = 0; index < this.items.length; index++) {
    //   if (index == this.index) {
    //     this.items[index].description = this.anItem.description;
    //     console.log('reflectItemChanges: Found it', this.items[index].title)
    //   }
    // }
}

/**
 * Opens the item dialog
 * @param item  Item. Item that's open
 * @param index number. Index position of the open item in the this.items array.
 */
private openItem(item:Item, index:number, card:Card):void{
  this.editableContent = item.description;
  this.index = index;
  this.itemDlgIsOpen = true;
  this.itemDlgTitle = item.title;
  this.textDescription = item.description;
  this.anItem = item;
  this.card = card;
  this.setDateDisplay(this.anItem);
  this.fileUploadParam.itemId = item.item_Id;
  this.GetItemAttachmentsByItemId(item.item_Id);
}

private  setDateDisplay(i: Item){
   if(i != null){
     if(i.due_Date.toString() == this.global.dbDefaultDate){
        this.date = "";
     }else{
        var date = new Date(i.due_Date);
        this.date = date.toLocaleDateString();
        // var y = date.getFullYear();
        // var m = date.getMonth();
        // var d = date.getDay();
        // this.dateModel = { date: { year: y, month: m, day: d } };
     }
   }
}

// /**
//  * Handles drag drop of an item in a card. Only saves the dropping of an item into different card. Saving the item's index order is done in item.component
//  * @param args
//  */
//   onDrop(args) {
//     let [el, target, source, sibling] = args;
//     let targetCardId = target.title;
//     let itemId = el.id;
//     console.log('target: ', target.title + ' src: ' + source.title);
//     // Update only when dropping into different card
//     if(target.title != source.title){
//       this.itemSvc.updateItemCardId(itemId, targetCardId).subscribe();
//     }
//   }

targetCard:Card;
SrcCard:Card;

private releaseDrop(event, cardSrc:Card){
  this.SrcCard = cardSrc;
  let item:Item = event;

  let index = cardSrc.items.indexOf(event);
  // Check if not dropping onto the same card
  if(this.targetCard.card_Id != this.SrcCard.card_Id){
    this.itemSvc.updateItemCardId(item.item_Id, this.targetCard.card_Id).subscribe();
    if (index >= 0){
      cardSrc.items.splice(index,1); // remove the item to drop
    }
  }else{
    // Dropping onto the same card so Update the sort order.
    if(index != item.sort_Order)
      this.itemSvc.updateRequest(item).subscribe();
  }
}

private addDropItem(event, cardTarget:Card){
  let item:Item = event;
  let itemExists = false;
  this.targetCard = cardTarget;

  for(var i = 0; i < cardTarget.items.length; i++){
    itemExists = cardTarget.items[i].item_Id == item.item_Id;
    if(itemExists) break;
  }
  if(!itemExists){
    cardTarget.items.push(event); // add the dragged item
  }

}

/**
 * Retrieves all cards
 */
 getCards(){
    this.cardSvc.getAll().subscribe(cardlist => {this.cards = cardlist; console.log('cards: ', this.cards)},
                                    err => this.errorMessage = <any>err);

 }

 /**
  * FInd cards by Board's Id
  * @param boardId
  */
  getCardsByBoardId(boardId:string){
    this.cardSvc.getCardsByBoardId(boardId)
      .subscribe(cardList => {this.cards = cardList},
                 err => this.errorMessage = err);

  }

 /**
  * Adds new Card by boarder id
  */
  addNew():void{
    // this.card = <Card>{name: form['name'].value, active: true, owner_id: "d705fa4d-23cc-46ca-8a23-e7257a72bca4", board_id: this.boardId};
    let card = new Card();
    card.name = "New Card";
    card.active = true;
    card.owner_Id = this.global.ownerid;
    card.board_Id = this.boardId;

    this.cardSvc.create(card).subscribe(newCard => this.cards.push(newCard), err => this.errorMessage = err);
  }

/**
 * Archives an item to the database.
 */
private ArchiveItem(): void{
  // The this.anItem is set at openItem() when modal dialog opens.
  this.itemSvc.archiveItem(this.anItem.item_Id);
  this.itemDlgIsOpen = false;
  this.card.items.splice(this.index, 1);
}

/**
 * Delete card by id
 * @param card_id
 * @param name
 * @param i
 */
deleteCard(card_id: string, name: string, i: number){
  this.deleteNow = false;

  var deleteByIdUrl = `${this.global.apiCardUrl}/delete/${card_id}`;
  const dialogRef = this.modal.confirm()
        .size('sm')
        .title('Confirm Deletion')
        .showClose(false)
        .body(`
           <h4>"${name}"</h4>
        `)
        .okBtn('Delete')
        .cancelBtn('Cancel')
        .open();

  dialogRef.result
  .catch(err => console.log('Deletion Error Occurred: ', err)) // catch error not related to the result (modal open...)
  .then(dialog => dialog.result) // dialog has more properties,lets just return the promise for a result.
  .then(result => {this.cardSvc.delete(deleteByIdUrl); this.cards.splice(i, 1)}) // if were here ok was clicked.
  .catch(err => console.log('Cancelled Deletion', err)); // if were here it was cancelled (click or non block click)
      
}
  /**
   * Add new Item to DB
   * @param form
   * @param card
   */
  onSubmit(form:any, card:Card):void{
    event.preventDefault;
    this.anItem = <Item>{title: form.value["title"], description: "", card_Id: form.value["card_Id"], owner_Id: "d705fa4d-23cc-46ca-8a23-e7257a72bca4", modified_By_Id: "d705fa4d-23cc-46ca-8a23-e7257a72bca4", status_Id: 1};
   // create item. List of items for card is returned .
    this.itemSvc.createItemForCard(this.anItem)
                                .do(data => { console.log('createItem OnSubmit:', data);
                                })
                                 .map(data => this.items = data)
                                 .subscribe(data => {card.items.push(data); console.log('items:', card.items)},   // add the new item to card's items
                                 err => this.errorMessage = <any>err);

    // close the form
    this.toggleNewItem(form.value["sort_order"]);

    if(typeof this.errorMessage !='undefined' && this.errorMessage){
        this.errorMessage = 'Server Error: HttpRequest';
      }else{
        this.errorMessage = '';
      }

  }
  // Returns new Guid. DON'T use this for database ID inserts. not Guarranteed. Merely uses math.random
  newGuid(){
    return Global.newGuid();

  }

  /**
   * Opens add new item box
   * @param itemId
   */
  toggleNewItem(itemId: number){
    this.hideme[itemId] = !this.hideme[itemId];
  }

  /**
   * Opens edit card box
   * @param i string
   */
  toggleEditTitle(i: string){
    this.hideme[i] = !this.hideme[i];

  }

}