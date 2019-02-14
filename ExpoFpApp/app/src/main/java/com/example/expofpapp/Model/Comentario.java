package com.example.expofpapp.Model;

public class Comentario {
    private String id;
    private String nombreAutor;
    private String contenido;
    private double valoracion;
    private boolean valido;
    private String imagenAutor;
    private String proyecto;
    private String autor;

    public Comentario() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Comentario(String id, String nombreAutor, String contenido, int valoracion, boolean valido, String imagenAutor, String proyecto, String autor) {
        this.id = id;
        this.nombreAutor = nombreAutor;
        this.contenido = contenido;
        this.valoracion = valoracion;
        this.valido = valido;
        this.imagenAutor = imagenAutor;
        this.proyecto = proyecto;
        this.autor = autor;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getNombreAutor() {
        return nombreAutor;
    }

    public String getContenido() {
        return contenido;
    }

    public double getValoracion() {
        return valoracion;
    }

    public boolean isValido() {
        return valido;
    }

    public String getImagenAutor() {
        return imagenAutor;
    }

    public String getProyecto() {
        return proyecto;
    }

    public void setNombreAutor(String nombreAutor) {
        this.nombreAutor = nombreAutor;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public void setValoracion(double valoracion) {
        this.valoracion = valoracion;
    }

    public void setValido(boolean valido) {
        this.valido = valido;
    }

    public void setImagenAutor(String imagenAutor) {
        this.imagenAutor = imagenAutor;
    }

    public void setProyecto(String proyecto) {
        this.proyecto = proyecto;
    }

    @Override
    public String toString() {
        return "Comentario{" +
                "nombreAutor='" + nombreAutor + '\'' +
                ", contenido='" + contenido + '\'' +
                ", valoracion=" + valoracion +
                ", valido=" + valido +
                ", imagenAutor='" + imagenAutor + '\'' +
                ", proyecto='" + proyecto + '\'' +
                '}';
    }
}
