import {Observable} from "RxJS/Rx";
import {Injectable} from '@angular/core';
import {Card} from '../../model/card';
import { Global } from '../../shared/global';
import { Repository } from '../../model/repository';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CardService extends Repository{

    constructor(private request: Http, private global: Global) {

        super(request);
    }

    cards:Card[] = [];
    apiUrl = this.global.apiCardUrl;// 'http://localhost:5000/api/card';

    // Creates new card with no item
    create(card: Card): Observable<Card>{
        // let bodyString = JSON.stringify(card);
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        let options       = new RequestOptions({ headers: headers });
        return this.request.post(`${this.apiUrl}/create`, card, options)
                        .do( res => console.log('card.service.create() HTTP response:', res))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);
    }
    getAll(): Observable<Card[]>{
         return this.request.get(this.apiUrl)
                    .do( res => console.log('card.service.getAll() HTTP response:', res))
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }

    getCardsByBoardId(boardId:string): Observable<Card[]>{
         return this.request.get(`${this.apiUrl}/${boardId}`)
                    .do( res => {})
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }

    updateRequest(body: Card){
        let bodyString = JSON.stringify(body);
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
        let options       = new RequestOptions({ headers: headers });
       return this.request.put(`${this.apiUrl}/update`, bodyString, { headers: headers })
                          .do( res => console.log('cardservice Update HTTP response:', res))
                        // .map(resp => resp.json)
                         .catch(this.handleError)
                          .subscribe(data => console.log(data));
    }

}
