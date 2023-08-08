import { createReducer, on } from '@ngrx/store';
import { login } from './../actions/auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
}

export const initialState: AuthState = {
  isLoggedIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, isLoggedIn: true }))
);
