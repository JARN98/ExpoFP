package com.example.expofpapp.Model;

public class ProyectoRes {
    private String id;
    private String nombre;
    private String imagen;
    private double valoracionMedia;
    private String proyecto;
    private String curso;

    public ProyectoRes(String id, String nombre, String imagen, double valoracionMedia, String proyecto, String curso) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.valoracionMedia = valoracionMedia;
        this.proyecto = proyecto;
        this.curso = curso;
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

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public double getValoracionMedia() {
        return valoracionMedia;
    }

    public void setValoracionMedia(double valoracionMedia) {
        this.valoracionMedia = valoracionMedia;
    }

    public String getProyecto() {
        return proyecto;
    }

    public void setProyecto(String proyecto) {
        this.proyecto = proyecto;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProyectoRes that = (ProyectoRes) o;

        if (Double.compare(that.valoracionMedia, valoracionMedia) != 0) return false;
        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (nombre != null ? !nombre.equals(that.nombre) : that.nombre != null) return false;
        if (imagen != null ? !imagen.equals(that.imagen) : that.imagen != null) return false;
        if (proyecto != null ? !proyecto.equals(that.proyecto) : that.proyecto != null)
            return false;
        return curso != null ? curso.equals(that.curso) : that.curso == null;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = id != null ? id.hashCode() : 0;
        result = 31 * result + (nombre != null ? nombre.hashCode() : 0);
        result = 31 * result + (imagen != null ? imagen.hashCode() : 0);
        temp = Double.doubleToLongBits(valoracionMedia);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        result = 31 * result + (proyecto != null ? proyecto.hashCode() : 0);
        result = 31 * result + (curso != null ? curso.hashCode() : 0);
        return result;
    }

    
}
