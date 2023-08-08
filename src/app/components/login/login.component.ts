import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AuthServiceService } from 'src/app/services/user/auth-service.service';
import { login } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  loading = false;
  error!: string;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    // Perform authentication and dispatch the login action
    this.authService.login(username, password).subscribe(
      (data) => {
        this.store.dispatch(login({ username, password }));
      },
      (error) => {
        this.error = 'Invalid credentials';
      }
    );
  }
}
