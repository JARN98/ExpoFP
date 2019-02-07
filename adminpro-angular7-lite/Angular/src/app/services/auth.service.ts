import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDto } from '../dto/login.dto';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response.interface';
import { environment } from '../..//environments/environment';
import { UserDto } from '../dto/adduser.dto';
import { stringify } from '@angular/compiler/src/util';
const jwtDecode = require('jwt-decode');

const authUrl = '';

// const requestOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authentication': `Basic ` + btoa()
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rol;
  private token;

  constructor(private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<LoginResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ` + btoa(`${loginDto.email}:${loginDto.password}`),
        'Access-Control-Allow-Origin': '*'
      })
    };
    class Metakey {
      access_token: String;

      constructor(access_token: String) {
        this.access_token = access_token;
      }
    }
    const metaKey = new Metakey('oDUV7u5ZzJIc81W7SR1eqFXD0qNCbPWp');
    return this.http.post<LoginResponse>(`${environment.ApiUrl}/auth`, metaKey, requestOptions);
  }

  loginGoogle(): Observable<LoginResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    class Metakey {
      access_token: String;

      constructor(access_token: String) {
        this.access_token = access_token;
      }
    }
    // const metaKey = new Metakey('oDUV7u5ZzJIc81W7SR1eqFXD0qNCbPWp');
    const key = new Metakey('583831561457-6g360hllfbr7ijkjihmhkrk1b0dq7lh3.apps.googleusercontent.com');
    return this.http.post<LoginResponse>(`${environment.ApiUrl}/auth/google`, key, requestOptions);
  }

  registro(userDto: UserDto): Observable<LoginResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<LoginResponse>(`${environment.ApiUrl}/users`, userDto, requestOptions);
  }

  setLoginData(loginResponse: LoginResponse) {

    localStorage.setItem('token', loginResponse.token);
    localStorage.setItem('id', loginResponse.user.id);
    localStorage.setItem('name', loginResponse.user.name);
    localStorage.setItem('email', loginResponse.user.email);
    localStorage.setItem('role', loginResponse.user.role);
    localStorage.setItem('img', loginResponse.user.picture);

  }



  getToken() {
    
    return localStorage.getItem('token');
  }

  getTokenDecode() {
    if (!(this.getToken() == null))
    return jwtDecode(this.getToken());
    else
    return null
  }

  isAdmin() {
    if(!(this.getTokenDecode() == null)){
    if (this.getTokenDecode().role === 'admin') {
      return true;
    } else {
      return false;
    }
  }else
  return false;
  }
  isUser() {
    if(!(this.getTokenDecode() == null)){
      if (this.getTokenDecode().role === 'user') {
        return true;
      } else {
        return false;
      }
    }else
    return false;
}
}
