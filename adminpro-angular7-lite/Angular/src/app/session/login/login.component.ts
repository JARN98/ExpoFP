import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { LoginDto } from '../../dto/login.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  firstname: string;
  lastname: string;

  constructor(private loginService: SessionService, private router: Router) { }

  ngOnInit() {
  }

  doLogin() {
    const loginDto = new LoginDto(this.email, this.password);
    this.loginService.login(loginDto).subscribe(loginResp => {
      console.log(loginResp);
      this.loginService.setLoginData(loginResp);
    }, error => {
      console.log('Error en petición de login');
    }
    );
  }

}
