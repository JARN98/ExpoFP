import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ChangePasswordComponent } from '../../dialogs/change-password/change-password.component';
import { AuthService } from '../../services/auth.service';
import { ROUTESADMIN } from '../menu-items/menu-items-admin';
import { ROUTESUSER } from '../menu-items/menu-items-user';
import { ROUTESNOLOG } from '../menu-items/menu-items-nolog';
declare var $: any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./header.css']
  
})
export class NavigationComponent implements AfterViewInit {
  public topNavItems: any[];
  @Output() toggleSidebar = new EventEmitter<void>();

  img: string;
  email: string;
  nombre: string;
  user: boolean;
  admin: boolean;

  public config: PerfectScrollbarConfigInterface = {};
  constructor(private modalService: NgbModal,
     private router: Router,
      private dialog: MatDialog,
       private loginService: AuthService) {}

  public showSearch = false;

  // This is for Notifications
  notifications: Object[] = [
    {
      round: 'round-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      round: 'round-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      round: 'round-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      round: 'round-primary',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];
  ngOnInit(): void {
    console.log("Es admin? " + this.loginService.isAdmin());
    this.admin = this.loginService.isAdmin();
    console.log("Es usuario? " + this.loginService.isUser());
    this.user = this.loginService.isUser();
    this.setUserInfo();
    this.cargarMenu();
    
  }
  cargarMenu(){
    if(this.loginService.isAdmin())
    this.topNavItems = ROUTESADMIN.filter(topNavItem => topNavItem);
    else if(this.loginService.isUser())
    this.topNavItems = ROUTESUSER.filter(topNavItem => topNavItem);
    else
    this.topNavItems = ROUTESNOLOG.filter(topNavItem => topNavItem);
  }
  iniciarSesion(){
    this.router.navigate(['session/login'])
  }
  setUserInfo(){
    this.img = localStorage.getItem('img');
    console.log(this.img);
    this.email = localStorage.getItem('email');
    console.log(this.email);
    this.nombre = localStorage.getItem('name');
    console.log(this.nombre);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/session/login']);
  }
  openDialogChangePass() {
    const dialogoChangePass = this.dialog.open(ChangePasswordComponent, {
    });

    dialogoChangePass.afterClosed().subscribe(result => {
      
    });

  }

  ngAfterViewInit() {}
}
