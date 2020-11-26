import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isError: boolean = false;
  isSuccess: boolean = false;
  loading = false;
  registerForm: FormGroup;
  submitted = false;
  successText = '';
  genders: string[] = ['Male', 'Female'];
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        frstNm: ['', Validators.required],
        lstNm: ['', Validators.required],
        mobileNo: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern('^[0-9]+$'),
          ],
        ],
        emailID: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        gender: ['', Validators.required],
        address: ['', Validators.required],
        psWrd: ['', [Validators.required, Validators.minLength(8)]],
        conPassword: ['', Validators.required],

        terms: [false, Validators.requiredTrue],
      },
      {
        validator: this.checkPasswords,
      }
    );
  }

  get getSignUpForm() {
    return this.registerForm.controls;
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('psWrd').value;
    let confirmPass = group.get('conPassword').value;

    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit() {
    this.submitted = true;
    this.clearAlert();
    this.loading = true;

    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }

    if (this.registerForm.valid) {
      this.loading = false;
      this.isSuccess = true;
      this.successText = 'Successfully Registered';
      this.submitted = false;
      this.router.navigate(['/login']);
    } else {
      this.loading = false;
      this.isError = true;
      this.submitted = false;
    }
  }

  clearAlert() {
    this.isError = false;
    this.isSuccess = false;
    this.successText = '';
  }
}
