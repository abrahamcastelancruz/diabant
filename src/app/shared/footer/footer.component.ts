import { Component, OnInit } from '@angular/core';
import {
  faFacebookSquare,
  faInstagramSquare,
  faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  faFacebok = faFacebookSquare;
  faInstagram = faInstagramSquare;
  faTwiter = faTwitterSquare;

  constructor() {}

  ngOnInit(): void {}
}
