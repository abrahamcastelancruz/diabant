import { Component, OnInit } from '@angular/core';
import {
  faStethoscope,
  faClipboardList,
  faUtensils,
  faPills,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  faEstetoscopio = faStethoscope;
  faClipboard = faClipboardList;
  faUtencilios = faUtensils;
  faPills = faPills;

  constructor() {}

  ngOnInit(): void {}
}
