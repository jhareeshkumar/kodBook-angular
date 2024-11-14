import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private baseApiUrl = 'http://localhost:8989/api/v1/user';

  login(loginForm: Object): Observable<Object> {
    return this.http.post(this.baseApiUrl + "/login", loginForm);
  }
}
