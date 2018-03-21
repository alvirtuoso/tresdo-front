import * as BoardActions from '../actions/board.action';
import { Board } from '../model/board';
// import { Action } from 'rxjs/scheduler/Action';

export type Action = BoardActions.Actions;

const defaultState: Board = new Board();

const newState = (state, newData) => {
    return Object.assign({}, state, newData)
}

export function board(state: Board = defaultState, action: Action){
    console.log(action.type, state);

    switch(action.type){
        case BoardActions.ADD_BOARD:
            return newState(state, action.payload);
        default:
            return state;
    }
}
