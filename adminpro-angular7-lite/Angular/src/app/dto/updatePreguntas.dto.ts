export class UpdatePreguntasDto {
    id: String;
    nA: number;
    nB: number;
    nC: number;

    constructor(id: String, na: number, nb: number, nc: number){
        this.id = id;
        this.nA = na;
        this.nB = nb;
        this.nC = nc;
    }
}