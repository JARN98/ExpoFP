import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { LoginDto } from '../../dto/login.dto';
import { AuthService } from '../../services/auth.service';
import { UserDto } from '../../dto/adduser.dto';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  name: string;
  picture: string;

  constructor(private loginService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  doLogin() {
    const loginDto = new LoginDto(this.email, this.password);
    this.loginService.login(loginDto).subscribe(loginResp => {
      this.loginService.setLoginData(loginResp);
      this.router.navigate ( [ '/component/proyectos' ] );
    }, error => {
      console.log('Error en petición de login');
    }
    );
  }

  doSignup() {
    const userDto = new UserDto(this.email, this.password, this.name, this.picture, 'user');
    this.loginService.registro(userDto).subscribe(signupResp => {
      this.loginService.setLoginData(signupResp);
      this.router.navigate ( [ '/component/proyectos' ] );
    }, error => {
      console.log('Error en el registro');
    })
  }

}
