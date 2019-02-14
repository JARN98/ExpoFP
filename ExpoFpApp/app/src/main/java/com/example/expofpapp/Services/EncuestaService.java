package com.example.expofpapp.Services;

import com.example.expofpapp.Model.Pregunta;
import com.example.expofpapp.Model.ResponseContainer;
import com.example.expofpapp.Model.UpdatePreguntaDto;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface EncuestaService {
    @GET("/preguntas")
    Call<ResponseContainer<Pregunta>> getListEncuesta();

    @PUT("/preguntas/{idP}")
    Call<Pregunta> enviarEncuesta(@Body UpdatePreguntaDto pregunta, @Path("idP") String id);
}
