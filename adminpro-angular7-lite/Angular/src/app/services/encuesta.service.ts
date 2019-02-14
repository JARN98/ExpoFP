import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListApiResponse } from '../interfaces/list-api.interface';
import { environment } from '../../environments/environment';
import { PreguntaDto } from '../dto/addPregunta.dto';
import { CreatePreguntaResponse } from '../interfaces/add-pregunta.interface';
import { Pregunta } from '../models/pregunta';
import { UpdatePreguntaDto } from '../dto/updatePregunta.dto';
import { UpdatePreguntasDto } from '../dto/updatePreguntas.dto';
import { DisableEncuestaDto } from '../dto/disableEncuesta.dto';
import { User } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root'
})

export class EncuestaService {

  constructor(private http: HttpClient) { }

  listPreguntas(): Observable<ListApiResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get<ListApiResponse>(`${environment.ApiUrl}/preguntas`, requestOptions);
  }

  addPregunta(preguntaDto: PreguntaDto): Observable<CreatePreguntaResponse> {
    console.log(preguntaDto);

    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.post<CreatePreguntaResponse>(`${environment.ApiUrl}/preguntas`, preguntaDto, requestOptions);
  }

  deletePregunta(id: number) {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.delete(`${environment.ApiUrl}/preguntas/${id}`, requestOptions)
  }

  /*Actualiza la pregunta*/
  updatePregunta(id: String, pregunta: UpdatePreguntaDto) {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.put(`${environment.ApiUrl}/preguntas/${id}`, pregunta, requestOptions)
  }

  /*
  *Actualiza los datos de la encuesta recogiendo un array de respuestas
  */
  updatePreguntas(preguntas: UpdatePreguntasDto[]) {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.put(`${environment.ApiUrl}/illo`, preguntas, requestOptions);
  }

  disableEncuesta(id: String, user: DisableEncuestaDto): Observable<User> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.put<User>(`${environment.ApiUrl}/users/${id}/encuesta`, user, requestOptions);

  }
}
