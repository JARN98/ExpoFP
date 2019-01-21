import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { ListApiResponse } from '../interfaces/list-api.interface';

@Injectable({
  providedIn: 'root'
})
export class ListUsuarioService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  listUsuarios(): Observable<ListApiResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        // tslint:disable-next-line:max-line-length
        // 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjM2JhODE5ODdjYzYyMzI5NDUzZmEyOCIsImlhdCI6MTU0NzY3MDUyM30.MM1CqSKhCNNP4DVx7UtCnlxl4O3TJbKJRUwMHnDTYo4`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get<ListApiResponse>(`${environment.ApiUrl}/users`, requestOptions);
  }

  /*
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
  */

  refresh(): void {
    window.location.reload();
  }
}
