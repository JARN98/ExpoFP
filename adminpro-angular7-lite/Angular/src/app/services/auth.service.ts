import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDto } from '../dto/login.dto';
import { Observable, of } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response.interface';
import { environment } from '../..//environments/environment';
import { UserDto } from '../dto/adduser.dto';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap} from 'rxjs/operators';
import { promise } from 'protractor';

const jwtDecode = require('jwt-decode');

const authUrl = '';

interface GoogleLoginResponse {
  accessToken: string;
}

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rol;
  private token;
  user: Observable<GoogleLoginResponse>;
  user2: Observable<User>;

  constructor(private http: HttpClient,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) { 
      this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<GoogleLoginResponse>(`users/${user.uid}`).valueChanges()
          } else {
            return of(null)
          }
        })
      )
  }

  googleLogin(): Promise<Observable<LoginResponse>> {
    let googleToken: GoogleLoginResponse;

  return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then(res => {
      googleToken = <GoogleLoginResponse><unknown>res.credential;
      return this.http.post<LoginResponse>(`${environment.ApiUrl}/auth/google`, { 'access_token': googleToken.accessToken} );
    });
  }

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

  // loginGoogle(): Observable<LoginResponse> {
  //   const requestOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*'
  //     })
  //   };
  //   class Metakey {
  //     access_token: String;

  //     constructor(access_token: String) {
  //       this.access_token = access_token;
  //     }
  //   }
  //   // const metaKey = new Metakey('oDUV7u5ZzJIc81W7SR1eqFXD0qNCbPWp');
  //   const key = new Metakey('583831561457-6g360hllfbr7ijkjihmhkrk1b0dq7lh3.apps.googleusercontent.com');
  //   return this.http.post<LoginResponse>(`${environment.ApiUrl}/auth/google`, key, requestOptions);

    
  // }

  registro(userDto: UserDto): Observable<LoginResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
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
    localStorage.setItem('encuesta', loginResponse.user.encuesta.toString());

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
