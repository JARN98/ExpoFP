import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListProjectsResponse } from '../interfaces/list-projects-res.interface';
import { Observable } from 'rxjs';
import { ListApiResponse } from '../interfaces/list-api.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListProjectsResService {

  constructor(private http: HttpClient) { }

  listProjectsRes(): Observable<ListApiResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        // tslint:disable-next-line:max-line-length
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMzkxMWUzN2Q2Y2IxMmE2NWM4NzRhMSIsImlhdCI6MTU0NzY2NjI4OX0.kNVUCcmiw-SMwjmlONEk4JGWkqRjYvrtz5gm_MHBKpc`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get<ListApiResponse>(`${environment.ApiUrl}/ProyectoRes`, requestOptions);
  }
}
