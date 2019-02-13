package com.example.expofpapp.Services;

import com.example.expofpapp.Model.Proyecto;
import com.example.expofpapp.Model.ProyectoRes;
import com.example.expofpapp.Model.ProyectoResResponse;
import com.example.expofpapp.Model.ResponseContainer;

import retrofit2.Call;
import retrofit2.http.GET;

public interface ProyectoService {
    @GET("/ProyectoRes")
    Call<ResponseContainer<ProyectoRes>> getListProyectos();

    @GET("/Proyectos")
    Call<ResponseContainer<Proyecto>> getProyecto();
}
