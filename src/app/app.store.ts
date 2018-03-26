import { Board } from './model/board';
import { User } from './model/user';
export interface AppStore {
    board: Board;
    new_user: User;
    // other properties...
}