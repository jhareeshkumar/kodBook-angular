import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private baseApiUrl = 'http://localhost:8989/api/v1/user';


  signup(signupForm: any) {
    return this.http.post(this.baseApiUrl + "/signup", signupForm);
  }

  login(loginForm: any): Observable<Object> {
    console.log('username:', loginForm.userName);
    return this.http.post(this.baseApiUrl + "/login", loginForm);
  }

  logout(): void {
    const logoutUserName = localStorage.removeItem('userName');
    console.log("logoutUserName:", logoutUserName);
  }
}
