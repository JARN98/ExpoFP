package com.example.expofpapp.Model;

public class ComentarioCreateResponse {
    private String autor;
    private String contenido;
    private double valoracion;
    private String imagenAutor;

    public ComentarioCreateResponse(String autor, String contenido, double valoracion, String imagenAutor) {
        this.autor = autor;
        this.contenido = contenido;
        this.valoracion = valoracion;
        this.imagenAutor = imagenAutor;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public double getValoracion() {
        return valoracion;
    }

    public void setValoracion(double valoracion) {
        this.valoracion = valoracion;
    }

    public String getImagenAutor() {
        return imagenAutor;
    }

    public void setImagenAutor(String imagenAutor) {
        this.imagenAutor = imagenAutor;
    }

    @Override
    public String toString() {
        return "ComentarioCreateResponse{" +
                "autor='" + autor + '\'' +
                ", contenido='" + contenido + '\'' +
                ", valoracion=" + valoracion +
                ", imagenAutor='" + imagenAutor + '\'' +
                '}';
    }
}
