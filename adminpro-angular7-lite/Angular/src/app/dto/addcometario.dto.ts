export class ComentarioDto {
    proyectoid: string;
    autor: string;
    contenido: string;
    valoracion: number;
    proyecto = localStorage.getItem('idDeProyecto')

    constructor(proyectoid: string, autor: string, contenido: string, valoracion: number) {
        this.proyectoid = proyectoid;
        this.autor = autor;
        this.contenido = contenido;
        this.valoracion = valoracion;
    }
}