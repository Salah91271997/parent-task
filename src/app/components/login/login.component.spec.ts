import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { login } from 'src/app/store/actions/auth.actions';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthServiceService;
  let store: Store;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: AuthServiceService,
          useValue: {
            login: jasmine.createSpy('login').and.returnValue(
              of({
                token: 'fake-token',
              })
            ),
          },
        },
        {
          provide: Store,
          useValue: {
            dispatch: jasmine.createSpy('dispatch'),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthServiceService);
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login with correct credentials', () => {
    const username = 'eve.holt@reqres.in';
    const password = 'cityslicka';

    component.loginForm.setValue({
      username,
      password,
    });

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith(username, password);
  });

  it('should dispatch login action and route to UsersInfoComponent on successful login', () => {
    const username = 'eve.holt@reqres.in';
    const password = 'cityslicka';

    component.loginForm.setValue({
      username,
      password,
    });

    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(login({ username, password }));
    expect(component.router.url).toBe('/users');
  });
});
