import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';

const userUrl = '';

@Injectable({
  providedIn: 'root'
})
export class ListUsuarioService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  listUser(): Observable<User[]> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.get<User[]>(`${userUrl}/user/all`, requestOptions);
  }

  deleteUsuario(usuario: User): Observable<User> {
    console.log(usuario.id);
    
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.delete<User>(`${userUrl}/user/${usuario.id}`, requestOptions);
  }

  refresh(): void {
    window.location.reload();
  }
}
