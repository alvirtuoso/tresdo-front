import {Observable} from "RxJS/Rx";
import { Response, RequestOptions, Headers, Http } from '@angular/http';

export class Repository {

    constructor(private http: Http) {

    }

    create(obj: Object): any{}
    getAll(): any{}
    updateRequest(obj: Object): any{}

    delete(apiUrl: string){
      return this.http.delete(apiUrl)
        .do(res => console.log('onDoing Delete:', apiUrl))
        .catch(this.handleError)
        .subscribe(res => console.log(res));
    }

    handleError(error: Response) {
     console.error('RestAPI error: ', error.toString());
     return Observable.throw(error);
  }

}