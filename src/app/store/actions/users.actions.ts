import { createAction, props } from '@ngrx/store';
import { User, UserResponse } from '../../interfaces/user.interface';

export const loadUsers = createAction('[User] Load Users');

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: UserResponse }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);
export const addUserToData = createAction(
  '[User] Add User To Data',
  props<{ user: { id: string; name: string; createdAt: Date; job: string } }>()
);

// create remove user action here
export const removeUser = createAction(
  '[User] Remove User',
  props<{ id: number }>()
);

// update user action here
export const updateUser = createAction(
  '[User] Update User',
  props<{ user: User }>()
);
