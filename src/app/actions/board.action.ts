import { Action } from '@ngrx/store'
import { Board } from '../model/board';

export const ADD_BOARD = '[Board] AddBoard'
export class AddBoard implements Action {
    readonly type = ADD_BOARD;

    constructor(public payload: Board){}
}

export const LOAD_BOARDS = '[Board] LoadBoard'
export class LoadBoards implements Action {
    readonly type = LOAD_BOARDS;
  
    constructor(public payload: Board[]) {}
}

export type Actions = AddBoard | LoadBoards;