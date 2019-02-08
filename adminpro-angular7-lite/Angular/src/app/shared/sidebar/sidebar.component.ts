import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ROUTESADMIN } from '../menu-items/menu-items-admin';
import { ROUTESUSER } from '../menu-items/menu-items-user';
import { ROUTESNOLOG } from '../menu-items/menu-items-nolog';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public sideNavItems: any[];
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: AuthService
  ) {}
  // End open close
  ngOnInit() {
    this.cargarMenu()
  }

  cargarMenu(){
    if(this.loginService.isAdmin())
    this.sideNavItems = ROUTESADMIN.filter(topNavItem => topNavItem);
    else if(this.loginService.isUser())
    this.sideNavItems = ROUTESUSER.filter(topNavItem => topNavItem);
    else
    this.sideNavItems = ROUTESNOLOG.filter(topNavItem => topNavItem);
  }
}
