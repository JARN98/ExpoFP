export class UpdatePreguntaDto{
    nA: number;
    nB: number;
    nC: number;

    constructor(na: number, nb: number, nc: number){
        this.nA = na;
        this.nB = nb;
        this.nC = nc;
    }

}