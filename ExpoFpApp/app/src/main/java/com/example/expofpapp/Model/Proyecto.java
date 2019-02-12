package com.example.expofpapp.Model;

public class Proyecto {

    private int id;
    private String nombre;
    private String descripcion;
    private String curso;
    private  String img;
    private  String autores;
    private double valoracioMedia;

    public Proyecto() {
    }

    public Proyecto(int id, String nombre, String descripcion, String curso, String img, String autores, double valoracioMedia) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.curso = curso;
        this.img = img;
        this.autores = autores;
        this.valoracioMedia = valoracioMedia;
    }

    public int getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getCurso() {
        return curso;
    }

    public String getImg() {
        return img;
    }

    public String getAutores() {
        return autores;
    }

    public double getValoracioMedia() {
        return valoracioMedia;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public void setAutores(String autores) {
        this.autores = autores;
    }

    public void setValoracioMedia(double valoracioMedia) {
        this.valoracioMedia = valoracioMedia;
    }

    @Override
    public String toString() {
        return "Proyecto{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", curso='" + curso + '\'' +
                ", img='" + img + '\'' +
                ", autores='" + autores + '\'' +
                ", valoracioMedia=" + valoracioMedia +
                '}';
    }
}
