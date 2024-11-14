import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  //dependency injecting service
  private loginService = inject(LoginService);
  private toastr = inject(ToastrService);

  //signals
  passwordVisibleSignal = signal(false);


  public get passwordInputType(): string {
    return this.passwordVisibleSignal() ? 'text' : 'password';
  }

  //signal methods
  togglePasswordVisibility() {
    this.passwordVisibleSignal.update((flipPasswordVisible) => !flipPasswordVisible);
  }

  //form related
  private formBuiler = inject(FormBuilder);
  loginFormGroup = this.formBuiler.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });


  hasError(fieldName: string, errorType: string): boolean {
    const field = this.loginFormGroup.get(fieldName);
    return !!(field?.hasError(errorType) && field.touched);
  }

  onLogin(): void {
    if (this.loginFormGroup.valid) {
      const loginData = this.loginFormGroup.value
      //handling post request
      this.loginService.login(loginData).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message, "Success");
          console.log("success Response", res);
        },
        error: (error: any) => {
          if (error.status == 0) {
            this.toastr.error("Please Try Aftersome Time?.", 'SERVER DOWN!');
            console.log("server Unavailable", error);
          } else {
            this.toastr.error("Please Try Again with valid credentials.", error.error.message);
            console.log("Error : ", error);

          }
        },
        complete() {
          console.log('Login Request has been processed.');
        }
      });
    }
    else {
      this.loginFormGroup.markAllAsTouched();
    }
  }
}