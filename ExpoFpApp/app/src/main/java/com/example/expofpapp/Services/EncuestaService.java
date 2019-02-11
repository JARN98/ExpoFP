package com.example.expofpapp.Services;

import com.example.expofpapp.Model.Pregunta;
import com.example.expofpapp.Model.ResponseContainer;

import retrofit2.Call;
import retrofit2.http.GET;

public interface EncuestaService {
    @GET("/preguntas")
    Call<ResponseContainer<Pregunta>> getListEncuesta();
}
