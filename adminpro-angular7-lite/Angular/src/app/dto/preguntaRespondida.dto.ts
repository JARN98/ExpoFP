export class PreguntaRespondidaDto{
    pregunta: String;
    respuestaMarcada: String;

    constructor(p: String, rm: String){
        this.pregunta=p;
        this.respuestaMarcada=rm;
    }

}