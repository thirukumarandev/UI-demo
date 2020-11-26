import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  currentScreen = 'Log In';
  isError = false;
  isSuccess = false;
  loading = false;
  loginForm: FormGroup;
  activateForm: FormGroup;
  resetPasswordForm: FormGroup;
  submitted = false;
  successText = '';
  errorText = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usrNm: ['', Validators.required],
      pasWd: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.clearAlert();

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    if (
      this.loginForm.value.usrNm == 'admin@gmail.com' &&
      this.loginForm.value.pasWd == '12345678'
    ) {
      this.loading = false;
      this.isSuccess = true;
      this.successText = 'Login Successful';
      this.submitted = false;
      this.router.navigate(['/user']);
    } else {
      this.loading = false;
      this.isError = true;
      this.errorText = 'Error';
      this.submitted = false;
    }

    //       this.loading = false;
    //       this.isSuccess = true;
    //       console.log(data);
    //       this.successText = "Login Successful";
    //       this.submitted = false;
    //       this.router.navigate(['/curriculum']);
    //     },
    //     (error) => {
    //       this.loading = false;
    //       this.isError = true;
    //       this.errorText = error;
    //       this.submitted = false;
    //     }
    //   );
  }

  clearAlert() {
    this.isError = false;
    this.isSuccess = false;
    this.successText = '';
  }

  setScreen(screenName: string) {
    this.clearAlert();
    this.submitted = false;
    this.currentScreen = screenName;
  }
}
