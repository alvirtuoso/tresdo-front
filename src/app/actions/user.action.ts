import { Action } from '@ngrx/store'
import { User } from '../model/user';

export const ADD_USER = '[User] AddUser'
export class AddUser implements Action {
    readonly type = ADD_USER;

    constructor(public payload: User){}
}

export const GET_USER = '[User] GetUser'
export class GetUser implements Action {
    readonly type = GET_USER;
  
    constructor(public payload: User) {}
}

export type Actions = AddUser | GetUser;