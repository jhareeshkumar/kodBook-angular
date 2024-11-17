import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiUrl = fetch(environment.apiUrl);


  signup(signupForm: any) {
    return this.http.post(this.apiUrl + "user/signup", signupForm);
  }

  login(loginForm: any): Observable<Object> {
    console.log('username:', loginForm.userName);
    return this.http.post(this.apiUrl + "user/login", loginForm);
  }

  logout(): void {
    const logoutUserName = localStorage.removeItem('userName');
    console.log("logoutUserName:", logoutUserName);
  }
}
