import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ListProjectsResponse } from '../interfaces/list-projects-res.interface';

@Injectable({
  providedIn: 'root'
})
export class OneProjectService {

  constructor(private http: HttpClient) { }


  getOneProject(): Observable<ListProjectsResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      //  'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get<ListProjectsResponse>(`${environment.ApiUrl}/Proyectos/${localStorage.getItem('idDeProyecto')}`, requestOptions);
  }

  getOneProjectBH(idProyecto: String): Observable<ListProjectsResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get<ListProjectsResponse>(`${environment.ApiUrl}/Proyectos/${idProyecto}`, requestOptions);
  }
}
