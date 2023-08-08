import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
} from '../actions/users.actions';
import { User } from '../../interfaces/user.interface';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.http.get<User[]>('https://reqres.in/api/users?page/2').pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
