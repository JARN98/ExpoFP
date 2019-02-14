package com.example.expofpapp.Model;

import android.widget.RatingBar;

import java.util.Arrays;

public class Proyecto {

    private String id;
    private String nombre;
    private String descripcion;
    private String curso;
    private String imagenesDetalladas[];
    private String autores[];
    private double valoracionMedia;

    public Proyecto(String id, String nombre, String descripcion, String curso, String[] imagenesDetalladas, String[] autores, double valoracionMedia) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.curso = curso;
        this.imagenesDetalladas = imagenesDetalladas;
        this.autores = autores;
        this.valoracionMedia = valoracionMedia;
    }

    public Proyecto() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public double getValoracionMedia() {
        return valoracionMedia;
    }

    public void setValoracionMedia(double valoracionMedia) {
        this.valoracionMedia = valoracionMedia;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Proyecto proyecto = (Proyecto) o;

        if (Double.compare(proyecto.valoracionMedia, valoracionMedia) != 0) return false;
        if (id != null ? !id.equals(proyecto.id) : proyecto.id != null) return false;
        if (nombre != null ? !nombre.equals(proyecto.nombre) : proyecto.nombre != null)
            return false;
        if (descripcion != null ? !descripcion.equals(proyecto.descripcion) : proyecto.descripcion != null)
            return false;
        if (curso != null ? !curso.equals(proyecto.curso) : proyecto.curso != null) return false;
        // Probably incorrect - comparing Object[] arrays with Arrays.equals
        if (!Arrays.equals(imagenesDetalladas, proyecto.imagenesDetalladas)) return false;
        // Probably incorrect - comparing Object[] arrays with Arrays.equals
        return Arrays.equals(autores, proyecto.autores);
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = id != null ? id.hashCode() : 0;
        result = 31 * result + (nombre != null ? nombre.hashCode() : 0);
        result = 31 * result + (descripcion != null ? descripcion.hashCode() : 0);
        result = 31 * result + (curso != null ? curso.hashCode() : 0);
        result = 31 * result + Arrays.hashCode(imagenesDetalladas);
        result = 31 * result + Arrays.hashCode(autores);
        temp = Double.doubleToLongBits(valoracionMedia);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        return result;
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
                ", valoracionMedia=" + valoracionMedia +
                '}';
    }
}
