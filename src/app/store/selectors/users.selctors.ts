import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../interfaces/user.interface';
import { UserState } from '../reducers/users.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectUsersLoaded = createSelector(
  selectUserState,
  (state) => state.loaded
);
