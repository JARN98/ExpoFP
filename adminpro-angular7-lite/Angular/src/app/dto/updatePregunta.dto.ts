export class UpdatePreguntaDto{
    id: String;
    pregunta: String;
    respuestaA: String;
    respuestaB: String;
    respuestaC: String;
    nA: Number;
    nB: Number;
    nC: Number;

    constructor(id: String, p: String, rA: String, rB: String, rC: String, na: Number, nb: Number, nc: Number){
        this.id = id;
        this.pregunta = p;
        this.respuestaA = rA;
        this.respuestaB = rB;
        this.respuestaC = rC;
        this.nA = na;
        this.nB = nb;
        this.nC = nc;
    }

}