import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  faStethoscope,
  faClipboardList,
  faPills,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  stethoscope = faStethoscope;
  clipboard = faClipboardList;
  pills = faPills;
  utencils = faUtensils;
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializingContactForm();
  }

  initializingContactForm() {
    this.contactForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      desc: new FormControl('', Validators.required),
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.contactForm.controls[controlName].hasError(errorName);
  };
}
