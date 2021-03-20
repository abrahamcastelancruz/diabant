import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  panelOpenState = false;
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
