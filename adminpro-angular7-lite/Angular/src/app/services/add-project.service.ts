import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectDto } from '../dto/addpro.dto';
import { Observable } from 'rxjs';
import { CreateProjectResponse } from '../interfaces/add-project.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddProjectService {

  constructor(private http: HttpClient) { }

  addPro(projectDto: ProjectDto): Observable<CreateProjectResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        // tslint:disable-next-line:max-line-length
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMzkxMWUzN2Q2Y2IxMmE2NWM4NzRhMSIsImlhdCI6MTU0NzY2NjI4OX0.kNVUCcmiw-SMwjmlONEk4JGWkqRjYvrtz5gm_MHBKpc`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.post<CreateProjectResponse>(`${environment.ApiUrl}/Proyectos`, projectDto, requestOptions);
  }
}
