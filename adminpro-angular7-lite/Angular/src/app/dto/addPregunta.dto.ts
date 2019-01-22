export class PreguntaDto {
    pregunta: String;
    respuestaA: String;
    respuestaB: String;
    respuestaC: String;

    constructor(p: String, rA: String, rB: String, rC: String){
        this.pregunta = p;
        this.respuestaA = rA;
        this.respuestaB = rB;
        this.respuestaC = rC;
    }
}