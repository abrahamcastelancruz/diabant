import { AuthServiceService } from './../../services/auth-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  faEnvelope,
  faCheck,
  faUser,
  faLock,
  faArrowAltCircleLeft,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emailIcon = faEnvelope;
  checkIcon = faCheck;
  userIcon = faUser;
  lockIcon = faLock;
  arrowIcon = faArrowAltCircleLeft;
  errorIcon = faTimes;

  /* Login Form */
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auths: AuthServiceService) {}

  ngOnInit(): void {
    this.crateForm();
  }

  public crateForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  public validateUserEmail(): boolean {
    let valid = false;
    if (
      this.loginForm.get('email').errors &&
      this.loginForm.get('email').dirty &&
      this.loginForm.get('email').touched
    ) {
      return (valid = true);
    }
    return valid;
  }

  public validateUserPassword(): boolean {
    let valid = false;
    if (
      this.loginForm.get('password').errors &&
      this.loginForm.get('password').dirty &&
      this.loginForm.get('password').touched
    ) {
      return (valid = true);
    }
    return valid;
  }

  public userLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;

      this.auths.login(email, password);
    }

    if (this.loginForm.get('email').invalid) {
      document.getElementById('userEmail').classList.add('is-danger');
    }

    if (this.loginForm.get('password').invalid) {
      document.getElementById('userPassword').classList.add('is-danger');
    }
  }
}
