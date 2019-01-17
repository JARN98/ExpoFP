import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDto } from '../dto/login.dto';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response.interface';
import { environment } from '../..//environments/environment';

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

  constructor(private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<LoginResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ` + btoa(`${loginDto.email}:${loginDto.password}`)
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

  setLoginData(loginResponse: LoginResponse) {
    localStorage.setItem('token', loginResponse.token);
    localStorage.setItem('name', loginResponse.user.name);
    localStorage.setItem('email', loginResponse.user.email);
    localStorage.setItem('role', loginResponse.user.role);

  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}