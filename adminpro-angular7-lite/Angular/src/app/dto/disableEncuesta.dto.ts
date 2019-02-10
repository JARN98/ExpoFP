export class DisableEncuestaDto {
    encuesta: boolean;
    id: string;
    email: string
    password: string;

    constructor(encuesta: boolean, id: string, email: string, password: string){
        this.encuesta=encuesta;
        this.id=id;
        this.email=email;
        this.password=password;
    }
}