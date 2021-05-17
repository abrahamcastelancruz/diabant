import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Patient } from './../../models/user';
import { AuthServiceService } from './../../services/auth-service.service';
import { CompleteUserInfoService } from './../../services/complete-user-info.service';
import { Component, OnInit } from '@angular/core';
import {
  faBars,
  faSignOutAlt,
  faInfoCircle,
  faHome,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complete-user-info',
  templateUrl: './complete-user-info.component.html',
  styleUrls: ['./complete-user-info.component.css'],
})
export class CompleteUserInfoComponent implements OnInit {
  public AllCountries: any;

  menuIcon = faBars;
  salirIcon = faSignOutAlt;
  infoIcon = faInfoCircle;
  homeIcon = faHome;
  closeIcon = faTimes;

  public States: Array<any> = [];

  public completeInfoForm: FormGroup

  public User: Patient

  constructor(
    private completeUserService: CompleteUserInfoService,
    private authService: AuthServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private afs: AngularFirestore,
    private auth:AuthServiceService
    ) {}

  ngOnInit(): void {
    this.getAllCountries();
    this.initializaForm();
  }

  private initializaForm(){
    this.authService.actualPatient.subscribe(data =>{
      this.User = data
      this.completeInfoForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        apePat: ['', [Validators.required, Validators.minLength(2)]],
        apeMat: ['', [Validators.required, Validators.minLength(2)]],
        email: [this.User.email, [Validators.required, Validators.email]],
        cel: ['', Validators.required],
        country: ['', Validators.required],
        state: ['', Validators.required],
        direction: ['', Validators.required],
        ccp: ['', Validators.required],
        age: ['', Validators.required],
        height: ['', Validators.required],
        weight: ['', Validators.required],
        blood: ['', Validators.required],
        glucose: ['', Validators.required]
      })
    })
  }

  public showSidebarMenu(): void {
    const sidebar = document.getElementById('sidebar');
    const close = document.getElementById('close-icon');
    sidebar.classList.add('show');
    close.classList.add('showClose');
  }

  public hideSidebarMenu(): void {
    const sidebar = document.getElementById('sidebar');
    const close = document.getElementById('close-icon');
    sidebar.classList.remove('show');
    close.classList.remove('showClose');
  }

  public getAllCountries() {
    this.completeUserService.getCountries().subscribe((response) => {
      this.AllCountries = response.data;
    });
  }

  public getStatesFromCountry(country){
    const cn = {
      country: country
    }

    this.completeUserService.getStatesFromCountry(cn).subscribe((response =>{
      this.States = response.data.states
    }))
  }

  public validateUserName(){
    let valid = false;
    if (
      this.completeInfoForm.get('name').errors &&
      this.completeInfoForm.get('name').dirty &&
      this.completeInfoForm.get('name').touched
    ) {
        return (valid = true);
    }
    return valid;
  }

  public validateUserApePat(){
    let valid = false;
    if (
      this.completeInfoForm.get('apePat').errors &&
      this.completeInfoForm.get('apePat').dirty &&
      this.completeInfoForm.get('apePat').touched
    ) {
        return (valid = true);
    }
    return valid;
  }

  public validateUserApeMat(){
    let valid = false;
    if (
      this.completeInfoForm.get('apeMat').errors &&
      this.completeInfoForm.get('apeMat').dirty &&
      this.completeInfoForm.get('apeMat').touched
    ) {
        return (valid = true);
    }
    return valid;
  }

  public validateUserCelphone(){
    let valid = false;
    if (
      this.completeInfoForm.get('cel').errors &&
      this.completeInfoForm.get('cel').dirty &&
      this.completeInfoForm.get('cel').touched
    ) {
        return (valid = true);
    }
    return valid;
  }

  public validateUserDirection(){
    let valid = false;
    if (
      this.completeInfoForm.get('direction').errors &&
      this.completeInfoForm.get('direction').dirty &&
      this.completeInfoForm.get('direction').touched
    ) {
        return (valid = true);
    }
    return valid;
  }

  public validateUserCcp(){
    let valid = false;
    if (
      this.completeInfoForm.get('ccp').errors &&
      this.completeInfoForm.get('ccp').dirty &&
      this.completeInfoForm.get('ccp').touched
    ) {
        return (valid = true);
    }
    return valid;
  }

  public validateUserAge(){
    let valid = false;
    if (
      this.completeInfoForm.get('age').errors &&
      this.completeInfoForm.get('age').dirty &&
      this.completeInfoForm.get('age').touched
    ) {
        return (valid = true);
    }
    return valid;
  }

  public validateUserHeight(){
    let valid = false;
    if (
      this.completeInfoForm.get('height').errors &&
      this.completeInfoForm.get('height').dirty &&
      this.completeInfoForm.get('height').touched
    ) {
        return (valid = true);
    }
    return valid;
  }

  public validateUserWeight(){
    let valid = false;
    if (
      this.completeInfoForm.get('weight').errors &&
      this.completeInfoForm.get('weight').dirty &&
      this.completeInfoForm.get('weight').touched
    ) {
        return (valid = true);
    }
    return valid;
  }

  public validateUserGlucose(){
    let valid = false;
    if (
      this.completeInfoForm.get('glucose').errors &&
      this.completeInfoForm.get('glucose').dirty &&
      this.completeInfoForm.get('glucose').touched
    ) {
        return (valid = true);
    }
    return valid;
  }

  public completeUserRegister(){
    if(this.completeInfoForm.valid){
      Swal.fire({
        icon: 'info',
        title: 'Registrando Datos Clínicos...',
        text: 'Espera un momento por favor',
        allowOutsideClick: false,
      });
      Swal.showLoading();
      const clinicalInformation ={
        name: this.completeInfoForm.get('name').value,
        apePat: this.completeInfoForm.get('apePat').value,
        apeMat: this.completeInfoForm.get('apeMat').value,
        cel: this.completeInfoForm.get('cel').value,
        country: this.completeInfoForm.get('country').value,
        state: this.completeInfoForm.get('state').value,
        direction: this.completeInfoForm.get('apeMat').value,
        ccp: this.completeInfoForm.get('ccp').value,
        age: this.completeInfoForm.get('age').value,
        height: this.completeInfoForm.get('height').value,
        weight: this.completeInfoForm.get('weight').value,
        blood: this.completeInfoForm.get('blood').value,
        glucose: this.completeInfoForm.get('glucose').value,
        newUser: false
      }

      this.afs.collection('users').doc(this.User.userId).update(clinicalInformation).then(()=>{
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Datos Registrados Correctamente',
          text: 'Espera un Momento...',
          timer: 1000,
          allowOutsideClick: false,
        }).then(() => {
          Swal.close();
          this.router.navigateByUrl('/homeDashboard');
        });
      }).catch(()=>{
        Swal.close();
        Swal.fire({
        icon: 'error',
        title: '¡Error al Registrar Datos!',
        text: 'Intenta más Tarde'
        });
      })
    }

    if (this.completeInfoForm.get('name').invalid) {
      document.getElementById('name').classList.add('is-danger');
    }

    if (this.completeInfoForm.get('apePat').invalid) {
      document.getElementById('apePat').classList.add('is-danger');
    }

    if (this.completeInfoForm.get('apeMat').invalid) {
      document.getElementById('apeMat').classList.add('is-danger');
    }

    if (this.completeInfoForm.get('cel').invalid) {
      document.getElementById('cel').classList.add('is-danger');
    }

    if (this.completeInfoForm.get('direction').invalid) {
      document.getElementById('direction').classList.add('is-danger');
    }

    if (this.completeInfoForm.get('ccp').invalid) {
      document.getElementById('ccp').classList.add('is-danger');
    }

    if (this.completeInfoForm.get('age').invalid) {
      document.getElementById('age').classList.add('is-danger');
    }

    if (this.completeInfoForm.get('height').invalid) {
      document.getElementById('height').classList.add('is-danger');
    }

    if (this.completeInfoForm.get('weight').invalid) {
      document.getElementById('weight').classList.add('is-danger');
    }

    if (this.completeInfoForm.get('glucose').invalid) {
      document.getElementById('glucose').classList.add('is-danger');
    }
  }

  public logout(){
    this.auth.logout();
  }
}
