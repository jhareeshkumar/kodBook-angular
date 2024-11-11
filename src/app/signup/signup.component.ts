import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupService } from '../signup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  private signupService = inject(SignupService);

  // Add properties to store messages
  successMessage: string | null = null;
  errorMessage: string | null = null;

  signup: any = {
    userName: "john",
    email: "",
    bio: "",
    city: "",
    dob: "",
    college: "",
    gender: "",
    gitHub: "",
    linkedIn: "",
    password: ""
  };

  private formBuilder = inject(FormBuilder);
  signupForm = this.formBuilder.group({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    dob: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  onSignup(): void {
    if (this.signupForm.valid) {
      this.signupService.signup(this.signupForm.value)
        .subscribe({
          next: (response: any) => {
            // Success callback
            this.successMessage = "SignUp Successfull";
            this.errorMessage = null;
            console.log('Success:', response); // Display success message in the console
            // Clear success message after 3 seconds
            setTimeout(() => {
              this.successMessage = null;
            }, 3000);
          },
          error: (error: any) => {
            // Error callback
            this.errorMessage = error.message;
            console.error('Error:', error.message); // Display error details in the console

            // Display the backend error message, if available
            if (error.error && error.error.message) {
              this.errorMessage = error.error.message;
              this.successMessage = null;
              console.error('Backend error message:', error.error.message);
              // Clear error message after 3 seconds
              setTimeout(() => {
                this.errorMessage = null;
              }, 3000);
            } else {
              this.errorMessage = 'An unknown error occurred';
              this.successMessage = null;
              console.error('An unknown error occurred');
            }
          }
        });
    }
  }



  getFormData() {
    this.signup = this.signupForm.value;
    console.log(this.signup);
  }
}