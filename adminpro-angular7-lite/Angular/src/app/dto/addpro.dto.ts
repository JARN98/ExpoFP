import { Autor } from "../interfaces/autor.interface";

export class ProjectDto {
    nombre: String;
    autores: Autor[];
    curso: String;
    imagenes: String;
    descripcion: String;
    imagenesDetallado: String[];

    constructor (nombre: String, autores: Autor[], curso: String, img: String, descripcion: String, imagenesDetallado?: String[]) {
        this.nombre = nombre;
        this.autores = autores;
        this.curso = curso;
        this.imagenes = img;
        this.descripcion = descripcion;
        this.imagenesDetallado = imagenesDetallado;
    }
}
