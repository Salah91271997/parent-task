import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth/auth.guard';
import { LoginGuard } from './guards/auth/login.guard';
import { LoginComponent } from './components/login/login.component';
import { UsersInfoComponent } from './components/users-info/users-info.component';
import { UsersResolver } from './resolver/users.resolver';

// i am out of time to make lazy loading xD
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: 'users',
    component: UsersInfoComponent,
    resolve: { users: UsersResolver },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
