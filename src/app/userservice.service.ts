import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private baseUrl = "http://localhost:8989/api/v1";

  constructor(private http: HttpClient) { }

  signUp(formData: any): Observable<any> {
    return this.http.post(this.baseUrl + "/user/signup", formData);
  }
}
