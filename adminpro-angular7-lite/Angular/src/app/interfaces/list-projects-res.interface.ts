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
    autor: String;
    contenido: String;
    valoracion: Number;
    valido: Boolean;
}