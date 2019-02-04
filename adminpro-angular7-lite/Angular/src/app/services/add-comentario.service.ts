import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

import { Observable } from 'rxjs';
import { ComentarioCreateResponse } from '../interfaces/comentario-response';
import { environment } from '../../environments/environment';
import { ComentarioDto } from '../dto/addcometario.dto';

const comentarioUrl = `${environment.ApiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AddComentarioService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  createComentario(comentarioDto: ComentarioDto): Observable<ComentarioCreateResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post<ComentarioCreateResponse>(`${comentarioUrl}/Comentarios`, comentarioDto, requestOptions);
  }

}