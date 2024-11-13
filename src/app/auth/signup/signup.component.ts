import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupService } from '../../signup.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
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

    if (this.signupForm.valid) {
      this.signupService.signup(this.signupForm.value).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message, "Success");
          console.log("success Response", res);
          this.signupForm.reset();
        },
        error: (error: any) => {
          if (error.status == 0) {
            this.toastr.error("Please Try Aftersome Time?.", 'SERVER DOWN!');
            console.log("server Unavailable", error);
          } else {
            this.toastr.error("Please try to Login!.", error.error.message);
            console.log("Error : ", error);

          }
        },
        complete() {
          console.log('SignUp Request has been processed.');
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  // Method to check if a specific field has an error
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.signupForm.get(fieldName);
    return !!(field?.hasError(errorType) && (field?.touched || this.isSignupFormSubmitted));
  }
}