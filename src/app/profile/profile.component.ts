import { Component, inject } from '@angular/core';
import { SignupService } from '../signup.service';
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
  greeting: string = '';
  message$!: Observable<string>;

  private signUpservice = inject(SignupService);

  constructor() {
    this.greet();
    this.hello();
  }

  greet(): void {
    this.signUpservice.greet().subscribe({
      next: (resp) => (this.greeting = resp),
      error: (err) => console.log('Error', err),
    });
  }

  hello(): void {
    this.message$ = this.signUpservice.greet();
  }
}
