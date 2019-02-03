import { Autor } from '../interfaces/autor.interface';

export class EditProjectDto {
    nombre: String;
    autores: Autor[];
    curso: String;
    descripcion: String;

    constructor(nombre: String, autores: Autor[], curso: String, descripcion: String) {
        this.nombre = nombre;
        this.autores = autores;
        this.curso = curso;
        this.descripcion = descripcion;
    }
}
