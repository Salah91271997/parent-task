import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, first, finalize } from 'rxjs/operators';
import { selectUsersLoaded } from '../store/selectors/users.selctors';
import { loadUsers } from '../store/actions/users.actions';

@Injectable({
  providedIn: 'root',
})
export class UsersResolver implements Resolve<boolean> {
  loading: boolean = false;

  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(selectUsersLoaded),
      tap((loaded) => {
        if (!this.loading && !loaded) {
          this.loading = true;
          this.store.dispatch(loadUsers());
        }
      }),
      first(),
      finalize(() => {
        this.loading = false;
      })
    );
  }
}
