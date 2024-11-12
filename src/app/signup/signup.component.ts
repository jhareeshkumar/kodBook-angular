import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupService } from '../signup.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  private signupService = inject(SignupService);
  private toastr = inject(ToastrService);

  //variables
  isSignupFormSubmitted = false;

  signup: Object = {
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
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    dob: ['', Validators.required],
    gender: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(5)]],
  })

  onSignup(): void {
    //store form data to use it again
    this.signup = this.signupForm.value;

    this.isSignupFormSubmitted = true;

    if (this.signupForm.valid) {
      this.signupService.signup(this.signupForm.value)
        .subscribe({
          next: (response: any) => {
            this.toastr.success('Please Login', 'Signup Successfull!');
            console.log('Success:', response); // Display success message in the console
            //save form data to object
            this.signup = response;

            this.isSignupFormSubmitted = false;

            this.signupForm.reset();
          },
          error: (error: any) => {
            // Error callback
            console.error('Error:', error.message); // Display error details in the console

            // Display the backend error message, if available
            if (error.error && error.error.message) {
              this.toastr.error('Plase Login with your credentials.', error.error.message);

              console.error('Backend error message:', error.error.message);
            } else {
              this.toastr.error('Please Try Later!', 'An unknown error occurred');

              console.error('An unknown error occurred');
            }
          },
          complete: () => {
            console.log("signup Request Completed");
          }
        });
    }
  }



  // Method to check if a specific field has an error
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.signupForm.get(fieldName);
    return !!(field?.hasError(errorType) && (field?.touched || this.isSignupFormSubmitted));
  }
}