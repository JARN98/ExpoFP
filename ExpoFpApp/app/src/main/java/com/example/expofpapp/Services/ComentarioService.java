package com.example.expofpapp.Services;


import com.example.expofpapp.Model.Comentario;
import com.example.expofpapp.Model.ResponseContainer;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface ComentarioService {

    @GET("/Comentarios/{id}")
    Call<ResponseContainer<Comentario>> getComentariosProyecto(@Path("id") String id);
}
