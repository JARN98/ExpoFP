import { LoginResponse } from './login-response.interface';

export interface ListProjectsResponse {
    id: String;
    nombre: String;
    imagen: String;
    curso: String;
    proyecto: String;
    imagenesDetalladas: String[];
    ultimosComentarios: UltimosComentarios[];
    createdAt: String;
    updatedAt: String;
}

export interface UltimosComentarios {
    autor: LoginResponse;
    contenido: String;
    valoracion: Number;
    valido: Boolean;
}
