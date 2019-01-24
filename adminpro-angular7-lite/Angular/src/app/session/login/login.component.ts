import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginDto } from '../../dto/login.dto';
import { UserDto } from '../../dto/adduser.dto';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UserDto;
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
      this.router.navigate(['/component/proyectos']);
    }, error => {
      console.log('Error en petición de login');
    }
    );
  }

  doSignup() {
    this.usuario = new UserDto(this.email, this.password, this.name, this.picture, 'user');
    console.log(this.email);
    
    console.log(this.usuario);

    this.loginService.registro(this.usuario).subscribe(signupResp => {
      this.loginService.setLoginData(signupResp);
      this.router.navigate(['/component/proyectos']);
    }, error => {
      console.log('Error en el registro');
    });
  }

}
