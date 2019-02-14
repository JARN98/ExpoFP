package com.example.expofpapp.Model;

public class DisableEncuestaDto {
    private Boolean encuesta;

    public DisableEncuestaDto(Boolean encuesta) {
        this.encuesta = encuesta;
    }

    public Boolean getEncuesta() {
        return encuesta;
    }

    public void setEncuesta(Boolean encuesta) {
        this.encuesta = encuesta;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DisableEncuestaDto that = (DisableEncuestaDto) o;

        return encuesta != null ? encuesta.equals(that.encuesta) : that.encuesta == null;
    }

    @Override
    public int hashCode() {
        return encuesta != null ? encuesta.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "DisableEncuestaDto{" +
                "encuesta=" + encuesta +
                '}';
    }
}
