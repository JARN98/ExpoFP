import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectDto } from '../dto/addpro.dto';
import { Observable } from 'rxjs';
import { CreateProjectResponse } from '../interfaces/add-project.interface';

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
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMzkxMWUzN2Q2Y2IxMmE2NWM4NzRhMSIsImlhdCI6MTU0NzI0NDAwM30.45W8T5O8SuKPWXlchqufm5sHGTQkMtdFui9TteAPS94`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.post<CreateProjectResponse>(`http://localhost:9000/Proyectos`, projectDto, requestOptions);
  }
}
