import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// export interface DateDto {
//   name: string;
//   date: Date;
// }


@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor(private http: HttpClient) { }

  getDate(): Observable<any> {
    return this.http.get<any>("http://localhost:8989/api/v1/date");
  }
}
