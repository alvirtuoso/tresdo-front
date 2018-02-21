import {Observable} from "RxJS/Rx";
import {Injectable} from '@angular/core';
import {Item} from '../../model/item';
import { Global } from '../../shared/global';
import { Repository } from '../../model/repository';
import { Media_Data } from '../../model/media_data';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// New in since angular4
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ItemService extends Repository{

constructor(private request: Http, private reqClient: HttpClient, private global: Global) {
    super(request);
 }

    items:Item[] = [];
    apiUrl = this.global.apiItemUrl;// 'http://localhost:5000/api/item';
    apiMediaUrl = this.global.apiMediaUrl;
    create(item: Item): Observable<Item>{
        // let bodyString = JSON.stringify(item);
        let headers    = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        let options    = new RequestOptions({ headers: headers });

        return this.request.post(`${this.apiUrl}/create`, item, options)
                        .do( res => console.log('item.service.create() HTTP response:', res))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);
    }
    // Retrieves all Item by Card Id
    getAll(): Observable<Item[]>{
         return this.request.get(`${this.apiUrl}`)
                    .do( res => console.log('item.service.getAll() HTTP response:', res))
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }

    getAttachmentsMediaByItemId(itemId: string): Observable<Media_Data[]>{
        console.log('getAttachmentsMediaByItemId start:', `${this.apiMediaUrl}/${itemId}`)
        return this.request.get(`${this.apiMediaUrl}/${itemId}`)
        .do( res => { }) //--> todo: do some logging
        .map((res: Response) => res.json())
        .catch(this.handleError);
    }

    removeMediaAttachment(item_Media_Data_Id: string):void{
        let apiUrl = `${this.global.apiMediaUrl}/deletemedia/${item_Media_Data_Id}`;
        console.log('itemSvc removeMediaAttachment item_Media_Data_Id:', item_Media_Data_Id);
        this.request.delete(apiUrl)
            .do(res => {}) //--> todo: do some logging
            .catch(this.handleError)
            .subscribe(res => console.log(res));
    }

  // Find an Item by its Id
    getItemById(itemId: string): Observable<Item>{
        return this.request.get(`${this.apiUrl}/${itemId}`)
                    .do( res => console.log('getItemById HTTP response:', res))
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }
  // Updates an Item to the database
    updateRequest(item: Item): Observable<Item>{
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
        let options       = new RequestOptions({ headers: headers });
        console.log('item.updateRequest', item);
        return this.request.put(`${this.apiUrl}/edit`, item, options)
                        .do( res => console.log('ItemService updateRequest HTTP response:', res))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);
    }
    // Updates an Item's Card that it belongs to by itemID and cardId
    updateItemCardId(item_id: string, card_id: string): Observable<Response>{
        let headers    = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options    = new RequestOptions({ headers: headers });
        let params = "item_id=" + item_id + "&card_id=" + card_id;
        return this.request.put(`${this.apiUrl}/editItemCard/`, params, options)
                    .do(res => console.log('ItemSvc.updateItemCardId: ', res))
                    .map((res: Response) => res)
                    .catch(this.handleError);
    }
    
    updateItemIdInMedia(item_id: string, media_id: string){

        let headers    = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options    = new RequestOptions({ headers: headers });
        let params = "item_id=" + item_id + "&media_id=" + media_id;
        
        return this.request.post(`${this.apiMediaUrl}/updateItemId`, params, options)
                    .do(res => console.log('do ItemSvc.updateItemIdInMedia: ', res))
                    .subscribe((res: Response) => {
                         res 
                        }, err => {
                            console.log('Err updateItemIdInMedia: ', err)
                        }
                    );
               
    }

    createItemForCard(item: Item): Observable<Item[]>{
        let headers    = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        let options    = new RequestOptions({ headers: headers });
        console.log("createItemForCard item", item);
        console.log("createItemForCard url", this.apiUrl);
        return this.request.post(`${this.apiUrl}/createforcard`, item, options)
                        .do( res => console.log('item.service.createItemForCard() HTTP response:', res))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);
    }

    archiveItem(item_id: string){
        let apiUrl = `${this.global.apiItemUrl}/archive/${item_id}`;
        this.request.delete(apiUrl)
            .do(res => console.log('itemSvc archiveItem:', apiUrl))
            .catch(this.handleError)
            .subscribe(res => console.log(res));
    }

}