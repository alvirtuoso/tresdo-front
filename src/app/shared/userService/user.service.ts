import {Observable} from "RxJS/Rx";
import {Injectable} from '@angular/core';
import {User} from '../../model/user';
import { Global } from '../global';
import { Repository } from '../../model/repository';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserService extends Repository{

    apiUrl = 'http://localhost:5000/api/user';
    constructor(private request: Http, private global:Global) {

        super(request);
    }
    // Adds a user to the database if it doesn't exist. 
    Add(email: string, displayName: string ): Observable<User>{
        let params = "email=" + email + "&displayName=" + displayName;
        let headers    = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options    = new RequestOptions({ headers: headers });
        
        return this.request.post(`${this.apiUrl}/add`, params, options)
                        .do( res => console.log('user.service.Add() HTTP response:', res.json()))
                         .map((res:Response) => res.json())
                         .catch(this.handleError);


    }
    // Retrieves all users
    getAll(): Observable<User[]>{
         return this.request.get(this.apiUrl)
                    .do( res => console.log('user.service.getAll() HTTP response:', res))
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }
    updateByUser(body: Object){
        let bodyString = JSON.stringify(body);
        let headers      = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
        let options       = new RequestOptions({ headers: headers });

        return this.request.put(`${this.apiUrl}/edit`, body, { headers: headers })
                        .catch(this.handleError)
                        .subscribe(data => console.log('user.Service updateyUser',data));

    }
    // Retrieves user by email
    getUserByEmail(email: string): Observable<User>{
        return this.request.get(`${this.apiUrl}/email/${email}`)
                    .do( res => console.log('getUserByEmail HTTP response:', res))
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }
    // Checks if user exists by email
    isExisting (email: string): Observable<Boolean>{
        return this.request.get(`${this.apiUrl}/isExisting/${email}`)
                    .do( res => console.log('user IsExisting HTTP response:', res))
                    .map((res: Response) => res.json());
        }

}