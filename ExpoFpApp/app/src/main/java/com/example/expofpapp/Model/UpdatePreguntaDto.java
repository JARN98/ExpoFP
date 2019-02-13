package com.example.expofpapp.Model;

public class UpdatePreguntaDto {
    private int nA;
    private int nB;
    private int nC;

    public UpdatePreguntaDto(int nA, int nB, int nC) {
        this.nA = nA;
        this.nB = nB;
        this.nC = nC;
    }

    public int getnA() {
        return nA;
    }

    public void setnA(int nA) {
        this.nA = nA;
    }

    public int getnB() {
        return nB;
    }

    public void setnB(int nB) {
        this.nB = nB;
    }

    public int getnC() {
        return nC;
    }

    public void setnC(int nC) {
        this.nC = nC;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UpdatePreguntaDto that = (UpdatePreguntaDto) o;

        if (nA != that.nA) return false;
        if (nB != that.nB) return false;
        return nC == that.nC;
    }

    @Override
    public int hashCode() {
        int result = nA;
        result = 31 * result + nB;
        result = 31 * result + nC;
        return result;
    }

    @Override
    public String toString() {
        return "UpdatePreguntaDto{" +
                "nA=" + nA +
                ", nB=" + nB +
                ", nC=" + nC +
                '}';
    }
}
