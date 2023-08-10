import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Import the FormsModule

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { authReducer } from './store/reducers/auth.reducer';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
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
    FormsModule,
    DialogModule,
    MessagesModule,
    HttpClientModule,
    CardModule,
    TableModule,
    MessageModule,
    InputTextModule,
    BrowserAnimationsModule,
    ToastModule,

    // ToastrModule.forRoot({
    //   positionClass: 'toast-bottom-right',
    // }),
    StoreModule.forRoot({ auth: authReducer, users: userReducer }),
    EffectsModule.forRoot([UserEffects]),
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
