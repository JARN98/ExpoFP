import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  color = 'defaultdark';
  showSettings = false;
  showMinisidebar = false;
  showDarktheme = false;
  admin;
  user;

  public innerWidth: any;

  public config: PerfectScrollbarConfigInterface = {};

  constructor(public router: Router,
   ) {}

  ngOnInit() {
   
    

    if (this.router.url === '/') {
      if (localStorage.getItem('token') == null)
            this.router.navigate(['/session/login']);
      else
            this.router.navigate(['component/proyectos']);
      
    }
    this.handleLayout();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleLayout();
  }

  toggleSidebar() {
    this.showMinisidebar = !this.showMinisidebar;
  }

  handleLayout() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.showMinisidebar = true;
    } else {
      this.showMinisidebar = false;
    }
  }
}
