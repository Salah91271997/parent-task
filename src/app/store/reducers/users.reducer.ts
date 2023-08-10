import { createReducer, on } from '@ngrx/store';
import { User, UserResponse } from 'src/app/interfaces/user.interface';
import {
  addUserToData,
  loadUsersSuccess,
  removeUser,
  updateUser,
} from '../actions/users.actions';

export interface UserState {
  users: UserResponse;
  loaded: boolean;
}

export const initialState: UserState = {
  users: {} as UserResponse,
  loaded: false,
};

export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loaded: true,
  })),
  on(addUserToData, (state, { user }) => {
    console.log('user', user);

    const newData = [
      ...state.users.data,
      {
        id: parseInt(user.id),
        email: '',
        first_name: user.name,
        last_name: '',
        avatar: '',
        job: user.job,
        createdAt: user.createdAt,
      },
    ] as User[];
    return { ...state, users: { ...state.users, data: newData } };
  }),
  on(updateUser, (state, { user }) => {
    const updatedUsers = state.users.data.map((u) =>
      u.id === user.id ? user : u
    );
    const updatedUserResponse = { ...state.users, data: updatedUsers };
    return { ...state, users: updatedUserResponse };
  }),
  // create remove user reducer here
  on(removeUser, (state, { id }) => {
    const newData = state.users.data.filter((user) => user.id !== id);
    return { ...state, users: { ...state.users, data: newData } };
  })
);
