import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagramSquare,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  facebook = faFacebookSquare;
  twitter = faTwitterSquare;
  instagram = faInstagramSquare;
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
