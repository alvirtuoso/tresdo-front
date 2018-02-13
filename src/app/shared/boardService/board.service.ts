import {Observable} from "RxJS/Rx";
import {Injectable} from '@angular/core';
import {Board} from '../../model/board';
import { Global } from '../../shared/global';
import { Repository } from '../../model/repository';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class BoardService extends Repository{

    constructor(private request: Http, private global: Global) {

        super(request);
    }
    apiUrl = this.global.apiBoardUrl; // 'http://localhost:5000/api/board';
    create(board: Board): Observable<Board>{
        // let bodyString = JSON.stringify(board);
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        let options       = new RequestOptions({ headers: headers });
        console.log('board.service Create bodyString: ', board);
        return this.request.post(`${this.apiUrl}/create`, board, options)
                        .do( res => console.log('board.service.create() HTTP response:', res))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);
    }
    // Retrieves all boards from the DB
    getAll(): Observable<Board[]>{
         return this.request.get(this.apiUrl)
                    .do( res => console.log('board.service.getAll() HTTP response:', res))
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }
    // Updates board to the database
    updateRequest(body: Board): Observable<Board>{
        let bodyString = JSON.stringify(body);
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
        let options       = new RequestOptions({ headers: headers });

        return this.request.put(`${this.apiUrl}/${body['id']}`, body, options)
                        .do( res => console.log('UpdateTodo HTTP response:', res))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);
    }

}
