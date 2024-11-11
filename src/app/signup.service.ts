import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private baseApiUrl = 'http://localhost:8989/api/v1/user'

  constructor(private http: HttpClient) { }


  greet(): Observable<any> {
    return this.http.get<string>(this.baseApiUrl + '/greet', {
      responseType: 'text' as 'json'
    });
  }


  signup(signupForm: any) {
    return this.http.post(this.baseApiUrl + "/signup", signupForm);
  }
}
