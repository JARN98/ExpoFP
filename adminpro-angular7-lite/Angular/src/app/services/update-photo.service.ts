import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProjectResponse } from '../interfaces/add-project.interface';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdatePhotoService {

  constructor(private http: HttpClient) { }

  editPhotos(id: string, imagenesDetalladas: String[]): Observable<any> {
    console.log(imagenesDetalladas);
    const imagenesDto = new ImagenesDto(imagenesDetalladas);

    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.put<any>(`${environment.ApiUrl}/Proyectos/imagenes/${id}`, imagenesDto, requestOptions);
  }
}

export class ImagenesDto {
  imagenesDetalladas: String[];

  constructor(imagenesDetalladas: String[]) {
    this.imagenesDetalladas = imagenesDetalladas;
  }
}
