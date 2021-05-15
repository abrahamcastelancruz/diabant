import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Patient } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class AuthServiceService {
  public actualPatient: Observable<Patient>;
  public patient: Patient;

  constructor(
    private afauth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.actualPatient = this.afauth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async login(email: string, password: string) {
    Swal.fire({
      icon: 'info',
      title: 'Iniciando Sesión...',
      text: 'Espera un momento por favor',
      allowOutsideClick: false,
      timer: 700,
    });
    Swal.showLoading();
    this.afauth
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        if (!data.user.emailVerified) {
          Swal.close();
          Swal.fire({
            icon: 'warning',
            title: '¡Debes Verificar tu Correo Electrónico!',
            text: 'Revisa tu buzón de entrada o spam',
            showConfirmButton: true,
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.close();
              this.logout();
            }
          });
        } else {
          this.actualPatient.subscribe((data) => {
            if (!data.newUser) {
              this.router.navigateByUrl('/homeDashboard');
            } else {
              this.router.navigateByUrl('/completeUserInfo');
            }
          });
        }
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: '¡Error al Iniciar Sesión!',
          text: error.message,
          showConfirmButton: true,
          allowOutsideClick: false,
        });
      });
  }

  logout() {
    this.afauth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
