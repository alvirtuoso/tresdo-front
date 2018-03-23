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
        console.log('create board', board);
        let bodyString = JSON.stringify(board);
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.request.post(`${this.apiUrl}/create`, board, { headers: headers })
                        .do( res => { console.log('create request', board); }) // TODO: add some logging
                        .map((res:Response) => res.json())
                        .catch(this.handleError);
    }

    // Retrieves all public boards from the DB
    getPublicBoards(): Observable<Board[]>{
         return this.request.get(this.apiUrl + '/public')
                    .do( res => {})
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }

    // Retrieves all private boards by owner_id from the DB
    getPrivateBoards(userEmail:String): Observable<Board[]>{
            return this.request.get(`${this.apiUrl}/private/${userEmail}`)
                    .do( res => { })
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
