import { Board } from './model/board';
import { User } from './model/user';
export interface AppStore {
    board: Board;
    user: User;
    // other properties...
}