import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginDto } from '../../dto/login.dto';
import { UserDto } from '../../dto/adduser.dto';
import { UploadImageDto } from '../../dto/uploadimage.dto';
import { UploadImageImgurService } from '../../services/upload-image-imgur.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

let ImagenB64: File = null;


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
  uploadImageDto: UploadImageDto;
  urlImagen: any;
  public form: FormGroup;

  constructor(private loginService: AuthService,
    private router: Router,
    private uploadImageImgurService: UploadImageImgurService,
    private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    })
  }

  doLogin() {
    const loginDto = new LoginDto(this.email, this.password);
    this.loginService.login(loginDto).subscribe(loginResp => {
      this.loginService.setLoginData(loginResp);
      this.router.navigate(['/component/proyectos']);
    }, error => {
      this.snackBar.open("Error en peticion de login", "x", {duration: 1000, panelClass: ['style-success']});
      console.log('Error en petición de login');
    }
    );
  }

  doLoginGoogle() {
    this.loginService.googleLogin().then(r => r.subscribe(res => {
      this.loginService.setLoginData(res);
      this.router.navigate(['/component/proyectos']).then();
    }));
  }

  doSignup() {
    console.log(this.email);

    console.log(this.usuario);

    this.uploadImageImgurService.UploadImage(this.uploadImageDto).subscribe(imagen => {
      this.urlImagen = imagen.data.link;
      this.usuario = new UserDto(this.email, this.password, this.name, this.urlImagen, 'user');
      this.loginService.registro(this.usuario).subscribe(signupResp => {
        this.loginService.setLoginData(signupResp);
        this.router.navigate(['/component/proyectos']);
      }, error => {
        console.log('Error en el registro');
      });
    }, err => {
      console.log('Error subiendo la imagen');
      console.log(err);
    });




  }

  foto64() {
    const Image: any = document.getElementById('fotoInput');

    if (Image.files && Image.files[0]) {
      const visor = new FileReader();
      visor.onload = function () {
        ImagenB64 = Image.files[0];
      };
      visor.readAsDataURL(Image.files[0]);
      this.uploadImageDto = new UploadImageDto(Image.files[0]);
    }
  }

}
