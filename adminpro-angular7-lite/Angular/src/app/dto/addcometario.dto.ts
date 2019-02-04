export class ComentarioDto {
    proyecto: string;
    autor: string;
    contenido: string;
    valoracion: number;

    constructor(proyectoid: string, autor: string, contenido: string, valoracion: number) {
        this.proyecto = proyectoid;
        this.autor = autor;
        this.contenido = contenido;
        this.valoracion = valoracion;
    }
}
