import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
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
    public store: Store,
    private authService: AuthServiceService,
    public router: Router
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
    this.authService.login(username, password).subscribe({
      next: (data) => {
        console.log('data', data);

        this.store.dispatch(login({ username, password }));
        // route to UsersInfoComponent component
        this.router.navigate(['/users']);
      },
      error: (error) => {
        this.error = 'Invalid credentials';
      },
    });
  }
}
