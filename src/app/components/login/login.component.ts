import { Component, OnInit } from '@angular/core';
import {
  faEnvelope,
  faCheck,
  faUser,
  faLock,
  faArrowAltCircleLeft,
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

  constructor() {}

  ngOnInit(): void {}
}
