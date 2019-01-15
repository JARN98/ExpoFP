import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDto } from '../dto/login.dto';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/loginresponse.interface';

const authUrl = `http://localhost:9000/auth`;

const requestOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${authUrl}`, loginDto, requestOptions);
  }

  loginGoogle(loginDto: LoginDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${authUrl}/google`, loginDto, requestOptions);
  }

  setLoginData(loginResponse: LoginResponse) {
    localStorage.setItem('token', loginResponse.token);
    localStorage.setItem('nombre', loginResponse.nombre);
    localStorage.setItem('email', loginResponse.email);
    localStorage.setItem('rol', loginResponse.role);
  }
}
