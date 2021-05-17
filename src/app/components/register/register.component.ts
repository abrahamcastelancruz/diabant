import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  faArrowAltCircleLeft,
  faCheck,
  faEnvelope,
  faLock,
  faUser,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  /**
   * Icons
   */
  emailIcon = faEnvelope;
  checkIcon = faCheck;
  userIcon = faUser;
  lockIcon = faLock;
  arrowIcon = faArrowAltCircleLeft;
  errorIcon = faTimes;

  /* Register Form */
  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
  ) {}

  ngOnInit(): void {
    this.crateForm();
  }

  public crateForm() {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  public validateUserEmail(): boolean {
    let valid = false;
    if (
      this.registerForm.get('email').errors &&
      this.registerForm.get('email').dirty &&
      this.registerForm.get('email').touched
    ) {
      return (valid = true);
    }
    return valid;
  }

  public validateUserPassword(): boolean {
    let valid = false;
    if (
      this.registerForm.get('password').errors &&
      this.registerForm.get('password').dirty &&
      this.registerForm.get('password').touched
    ) {
      return (valid = true);
    }
    return valid;
  }

  public validateConfirmPassword() {
    let valid = false;
    if (
      this.registerForm.get('confirmPassword').value !==
        this.registerForm.get('password').value &&
      this.registerForm.get('confirmPassword').touched
    ) {
      return (valid = true);
    }
    return valid;
  }

  public async registerUser() {
    if (this.registerForm.valid && !this.validateConfirmPassword()) {
      Swal.fire({
        icon: 'info',
        title: 'Creando Cuenta...',
        text: 'Espera un momento por favor',
        allowOutsideClick: false,
      });
      Swal.showLoading();
      const email = this.registerForm.get('email').value;
      const password = this.registerForm.get('password').value;

      this.afauth
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
          this.afs.collection('users').doc(data.user.uid).set({
            userId: data.user.uid,
            email,
            createdAt: Date.now(),
            newUser: true,
          });

          data.user.sendEmailVerification();
        })
        .then(() => {
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Cuenta Creada con Éxito',
            text: 'Verifica tu Correo Electrónico',
            showConfirmButton: true,
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl('/login');
            }
          });
        })
        .catch((error) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: '¡Error al Crear Cuenta!',
            text: error.message,
            showConfirmButton: true,
          });
        });
    }

    if (this.registerForm.get('email').invalid) {
      document.getElementById('userEmail').classList.add('is-danger');
    }

    if (this.registerForm.get('password').invalid) {
      document.getElementById('userPassword').classList.add('is-danger');
    }

    if (this.registerForm.get('confirmPassword').invalid) {
      document.getElementById('userConfirmPassword').classList.add('is-danger');
    }
  }
}
