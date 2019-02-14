package com.example.expofpapp.Model;

public class ComentarioDto {
    private String proyecto;
    private String autor;
    private String contenido;
    private double valoracion;



    public ComentarioDto(String proyecto, String autor, String contenido, double valoracion) {
        this.proyecto = proyecto;
        this.autor = autor;
        this.contenido = contenido;
        this.valoracion = valoracion;
    }

    @Override
    public String toString() {
        return "ComentarioDto{" +
                "proyecto='" + proyecto + '\'' +
                ", autor='" + autor + '\'' +
                ", contenido='" + contenido + '\'' +
                ", valoracion=" + valoracion +
                '}';
    }
}
