import { Autor } from '../interfaces/autor.interface';

export class EditProjectDto {
    nombre: String;
    autores: String[];
    curso: String;
    descripcion: String;
    imagenes: String;

    constructor(nombre: String, autores: String[], curso: String, descripcion: String, imagenes: String) {
        this.nombre = nombre;
        this.autores = autores;
        this.curso = curso;
        this.descripcion = descripcion;
        this.imagenes = imagenes;
    }
}
