import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private readonly authToken = 'QpwL5tke4Pnpja7X4';
  private readonly apiUrl = 'https://reqres.in/api';
  constructor(private http: HttpClient) {}
  getAuthToken(): string {
    return this.authToken;
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(`${this.apiUrl}/login`, body).pipe(
      map((response) => {
        const token = response.token;
        localStorage.setItem('authToken', token);
        return response;
      })
    );
  }
}