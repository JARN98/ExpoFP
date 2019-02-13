package com.example.expofpapp.Model;

import android.widget.RatingBar;

import java.util.Arrays;

public class Proyecto {

    private String id;
    private String nombre;
    private String descripcion;
    private String curso;
    private String imagenesDetalladas [];
    private String autores[];
    private double valoracioMedia;

    public Proyecto() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Proyecto(String id, String nombre, String descripcion, String curso, String[] imagenesDetalladas, String[] autores, double valoracioMedia) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.curso = curso;
        this.imagenesDetalladas = imagenesDetalladas;
        this.autores = autores;
        this.valoracioMedia = valoracioMedia;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    public String[] getImagenesDetalladas() {
        return imagenesDetalladas;
    }

    public void setImagenesDetalladas(String[] imagenesDetalladas) {
        this.imagenesDetalladas = imagenesDetalladas;
    }

    public String[] getAutores() {
        return autores;
    }

    public void setAutores(String[] autores) {
        this.autores = autores;
    }

    public double getValoracioMedia() {
        return valoracioMedia;
    }

    public void setValoracioMedia(double valoracioMedia) {
        this.valoracioMedia = valoracioMedia;
    }

    @Override
    public String toString() {
        return "Proyecto{" +
                "id='" + id + '\'' +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", curso='" + curso + '\'' +
                ", imagenesDetalladas=" + Arrays.toString(imagenesDetalladas) +
                ", autores=" + Arrays.toString(autores) +
                ", valoracioMedia=" + valoracioMedia +
                '}';
    }
}
