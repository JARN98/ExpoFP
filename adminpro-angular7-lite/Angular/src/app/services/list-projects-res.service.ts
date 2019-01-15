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
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMzkxMWUzN2Q2Y2IxMmE2NWM4NzRhMSIsImlhdCI6MTU0NzI0NDAwM30.45W8T5O8SuKPWXlchqufm5sHGTQkMtdFui9TteAPS94`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get<ListApiResponse>(`http://localhost:9000/ProyectoRes`, requestOptions);
  }
}
