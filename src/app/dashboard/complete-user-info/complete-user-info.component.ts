import { CompleteUserInfoService } from './../../services/complete-user-info.service';
import { Component, OnInit } from '@angular/core';
import {
  faBars,
  faSignOutAlt,
  faInfoCircle,
  faHome,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

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

  constructor(private completeUserService: CompleteUserInfoService) {}

  ngOnInit(): void {
    this.getAllCountries();
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
}
