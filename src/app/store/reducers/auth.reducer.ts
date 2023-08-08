import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure } from '../actions/auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  user: any;
  errorMessage: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, { username, password }) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    errorMessage: null,
  })),
  on(loginSuccess, (state, { data }) => ({
    ...state,
    isAuthenticated: true,
    user: data,
    errorMessage: null,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    errorMessage: error,
  }))
);
