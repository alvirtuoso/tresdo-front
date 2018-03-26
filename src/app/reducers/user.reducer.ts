import * as UserActions from '../actions/user.action';
import { User } from '../model/user';
// import { Action } from 'rxjs/scheduler/Action';

export type Action = UserActions.Actions;

const defaultState: User = null;

const newState = (state, newData) => {
    let newUser = Object.assign({}, state, newData);
    console.log('newState user.reducer', newUser);
    return newUser;//Object.assign({}, state, newData)
}

export function user(state: User = defaultState, action: Action){
    console.log(`user reducer: ${action.type}`, state);

    switch(action.type){
        case UserActions.ADD_USER:
            return newState(state, action.payload);
        default:
            return state;
    }
}
