package com.example.expofpapp.Model;

import java.util.List;

public class ProyectoResResponse {
    private int count;
    private List<ProyectoRes> proyectoRes;

    public ProyectoResResponse(int count, List<ProyectoRes> proyectoRes) {
        this.count = count;
        this.proyectoRes = proyectoRes;
    }

    public List<ProyectoRes> getProyectoRes() {
        return proyectoRes;
    }

    public void setProyectoRes(List<ProyectoRes> proyectoRes) {
        this.proyectoRes = proyectoRes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProyectoResResponse that = (ProyectoResResponse) o;

        if (count != that.count) return false;
        return proyectoRes != null ? proyectoRes.equals(that.proyectoRes) : that.proyectoRes == null;
    }

    @Override
    public int hashCode() {
        int result = count;
        result = 31 * result + (proyectoRes != null ? proyectoRes.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "ProyectoResResponse{" +
                "count=" + count +
                ", proyectoRes=" + proyectoRes +
                '}';
    }
}
