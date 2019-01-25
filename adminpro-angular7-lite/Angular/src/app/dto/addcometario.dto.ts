export class ComentarioDto {
    autor: string;
    contenido: string;
    valoracion: number;
    valido: boolean;
    proyecto = localStorage.getItem('idDeProyecto')

    constructor(autor: string, contenido: string, valoracion: number, valido: boolean) {
        this.autor = autor;
        this.contenido = contenido;
        this.valoracion = valoracion;
        this.valido = valido;
    }
}