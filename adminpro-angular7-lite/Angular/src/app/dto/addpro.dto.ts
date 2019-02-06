import { Autor } from '../interfaces/autor.interface';

export class ProjectDto {
    nombre: String;
    autores: String[];
    curso: String;
    imagenes: String;
    descripcion: String;
    imagenesDetalladas: String[];

    constructor (nombre: String, autores: String[], curso: String, img: String, descripcion: String, imagenesDetalladas: String[]) {
        this.nombre = nombre;
        this.autores = autores;
        this.curso = curso;
        this.imagenes = img;
        this.descripcion = descripcion;
        this.imagenesDetalladas = imagenesDetalladas;
    }
}
