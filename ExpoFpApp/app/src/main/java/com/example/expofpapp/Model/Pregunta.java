package com.example.expofpapp.Model;

public class Pregunta {
    private String id;
    private String pregunta;
    private String respuestaA;
    private String respuestaB;
    private String respuestaC;
    private int nA;
    private int nB;
    private int nC;

    public Pregunta(String id, String pregunta, String respuestaA, String respuestaB, String respuestaC, int nA, int nB, int nC) {
        this.id = id;
        this.pregunta = pregunta;
        this.respuestaA = respuestaA;
        this.respuestaB = respuestaB;
        this.respuestaC = respuestaC;
        this.nA = nA;
        this.nB = nB;
        this.nC = nC;
    }

    public Pregunta() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPregunta() {
        return pregunta;
    }

    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }

    public String getRespuestaA() {
        return respuestaA;
    }

    public void setRespuestaA(String respuestaA) {
        this.respuestaA = respuestaA;
    }

    public String getRespuestaB() {
        return respuestaB;
    }

    public void setRespuestaB(String respuestaB) {
        this.respuestaB = respuestaB;
    }

    public String getRespuestaC() {
        return respuestaC;
    }

    public void setRespuestaC(String respuestaC) {
        this.respuestaC = respuestaC;
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

        Pregunta pregunta1 = (Pregunta) o;

        if (nA != pregunta1.nA) return false;
        if (nB != pregunta1.nB) return false;
        if (nC != pregunta1.nC) return false;
        if (id != null ? !id.equals(pregunta1.id) : pregunta1.id != null) return false;
        if (pregunta != null ? !pregunta.equals(pregunta1.pregunta) : pregunta1.pregunta != null)
            return false;
        if (respuestaA != null ? !respuestaA.equals(pregunta1.respuestaA) : pregunta1.respuestaA != null)
            return false;
        if (respuestaB != null ? !respuestaB.equals(pregunta1.respuestaB) : pregunta1.respuestaB != null)
            return false;
        return respuestaC != null ? respuestaC.equals(pregunta1.respuestaC) : pregunta1.respuestaC == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (pregunta != null ? pregunta.hashCode() : 0);
        result = 31 * result + (respuestaA != null ? respuestaA.hashCode() : 0);
        result = 31 * result + (respuestaB != null ? respuestaB.hashCode() : 0);
        result = 31 * result + (respuestaC != null ? respuestaC.hashCode() : 0);
        result = 31 * result + nA;
        result = 31 * result + nB;
        result = 31 * result + nC;
        return result;
    }

    @Override
    public String toString() {
        return "Pregunta{" +
                "id='" + id + '\'' +
                ", pregunta='" + pregunta + '\'' +
                ", respuestaA='" + respuestaA + '\'' +
                ", respuestaB='" + respuestaB + '\'' +
                ", respuestaC='" + respuestaC + '\'' +
                ", nA=" + nA +
                ", nB=" + nB +
                ", nC=" + nC +
                '}';
    }
}
