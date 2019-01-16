import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListProjectsResponse } from '../interfaces/list-projects-res.interface';
import { Observable } from 'rxjs';
import { ListApiResponse } from '../interfaces/list-api.interface';

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
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjM2JhODE5ODdjYzYyMzI5NDUzZmEyOCIsImlhdCI6MTU0NzY0MzMyMn0.u0SQXERjLrbcb-CuggqtAjn2Wsbb7k2K7GS5a_djMs8`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get<ListApiResponse>(`http://localhost:8080/ProyectoRes`, requestOptions);
  }
}
