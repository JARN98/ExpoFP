import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerComentsService {

  constructor(private http: HttpClient) { }

  verComents(proyectoid: String) {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get<any>(`${environment.ApiUrl}/Comentarios/${proyectoid}`, requestOptions);
  }
}
