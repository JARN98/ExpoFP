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
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.post<CreateProjectResponse>(`${environment.ApiUrl}/Proyectos`, projectDto, requestOptions);
  }
}
