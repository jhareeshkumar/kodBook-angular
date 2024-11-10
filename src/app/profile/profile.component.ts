import { Component } from '@angular/core';
import { DateService } from '../date.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  dateDto$!: Observable<any>;
  constructor(private dateService: DateService) {
    this.getDate();
  }

  getDate(): void {
    this.dateDto$ = this.dateService.getDate();
  }

}
