import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.interface';
import { loadUsersSuccess } from '../actions/users.actions';

export interface UserState {
  users: User[];
  loaded: boolean;
}

export const initialState: UserState = {
  users: [],
  loaded: false,
};

export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loaded: true,
  }))
);
