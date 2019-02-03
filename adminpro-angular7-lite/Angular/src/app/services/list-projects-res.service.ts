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
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        // tslint:disable-next-line:max-line-length
        // 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjM2JhODE5ODdjYzYyMzI5NDUzZmEyOCIsImlhdCI6MTU0NzY3MDUyM30.MM1CqSKhCNNP4DVx7UtCnlxl4O3TJbKJRUwMHnDTYo4`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get<ListApiResponse>(`${environment.ApiUrl}/ProyectoRes`, requestOptions);
  }

  deleteProject(id : string): Observable<any> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.delete<any>(`${environment.ApiUrl}/ProyectoRes/${id}`, requestOptions);
  }
}
