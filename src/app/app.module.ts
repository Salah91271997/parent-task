import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { authReducer } from './store/reducers/auth.reducer';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/interceptor/auth.interceptor';
import { UsersInfoComponent } from './components/users-info/users-info.component';
import { userReducer } from './store/reducers/users.reducer';
import { UserEffects } from './store/effects/users.effects';

@NgModule({
  declarations: [AppComponent, LoginComponent, UsersInfoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    MessagesModule,
    HttpClientModule,
    MessageModule,
    InputTextModule,
    StoreModule.forRoot({ auth: authReducer, users: userReducer }),
    EffectsModule.forRoot([UserEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
