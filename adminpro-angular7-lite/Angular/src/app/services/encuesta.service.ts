import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListApiResponse } from '../interfaces/list-api.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EncuestaService {
  
  constructor(private http: HttpClient) { }

  listPreguntas(): Observable<ListApiResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get<ListApiResponse>(`${environment.ApiUrl}/preguntas`, requestOptions);
  }
}
