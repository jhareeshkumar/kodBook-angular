import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserserviceService } from '../userservice.service';
import { error } from 'console';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {


  private userService = inject(UserserviceService);


  signup: any = {
    userName: "",
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

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.userService.signUp(formData).subscribe
        (res => {
          console.log("user Logged in Succesfully", res.error);
          this.signup = this.signupForm.value;
          console.log(JSON.parse(JSON.stringify(this.signup)))
        });
    }
    else {
      console.log("Form is not valid")
    }
  }

  getSignupData() {
    console.log(this.signup)
  }
}
