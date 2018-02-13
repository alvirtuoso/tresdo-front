import {Observable} from "RxJS/Rx";
import {Injectable} from '@angular/core';
import {Todo} from '../../model/todo';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// import 'rxjs/add/operator/map';    see src/app/vendor.ts
// import 'rxjs/add/operator/catch';

@Injectable()
export class TodoService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId: number = 0;
  subtitle: string = "this is todotitle";
  // Placeholder for todo's
  todos: Todo[] = [];

  result: Array<Object>;
  todoUrl = 'http://localhost:5000/api/item';//'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: Http) {

   }

  // Simulate POST /todos. ok
   addTodo (body: Object): Observable<Todo[]> {
        let bodyString = JSON.stringify(body);
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        let options       = new RequestOptions({ headers: headers });

        return this.http.post(this.todoUrl, bodyString, options)
                        .do( res => console.log('addTodo HTTP response:', res))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);

    }

  // Simulate DELETE /todos/:id
   deleteTodoById(id: number | string){

        let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
        });

		return this.http.delete(`${this.todoUrl}/${id}`,options)
      .do( res => console.log('DeleteTodoById HTTP response:', res))
			.map((res:Response) => res.json())
			.catch(this.handleError);
	}

  // Simulate PUT /todos/:id
    // Update a todo
    updateTodo (body: Object): Observable<Todo[]> {
        let bodyString = JSON.stringify(body);
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
        let options       = new RequestOptions({ headers: headers });

        return this.http.put(`${this.todoUrl}/${body['id']}`, body, options)
                        .do( res => console.log('UpdateTodo HTTP response:', res))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);
    }

    // Delete a comment
    removeComment (id:string): Observable<Comment[]> {
        return this.http.delete(`${this.todoUrl}/${id}`)
                         .map((res:Response) => res.json())
                         .catch(this.handleError);
    }

  // Simulate GET /todos/:id . ok
  loadTodo(id: number | string): Observable<Todo[]> {
    return  this.http.get(`${this.todoUrl}/${id}`)
     .do( res => console.log('loadTodo HTTP response:', res))
      .map((resp: Response) => resp.json())
      .catch(this.handleError);
  }

// Fetch all existing items. ok
    getTodos() : Observable<Todo[]> {
         // ...using get request
         return this.http.get(this.todoUrl)
                    .do( res => console.log('getTodo HTTP response:', res))
                    .map((res: Response) => res.json())
                    .catch(this.handleError);

     }
  private extractData(res: Response) {
    let body = res.json();
    console.log(body.data || {});
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // Enhance: Use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
