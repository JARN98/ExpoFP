package com.example.expofpapp.Services;


import com.example.expofpapp.Model.Comentario;
import com.example.expofpapp.Model.ComentarioCreateResponse;
import com.example.expofpapp.Model.ComentarioDto;
import com.example.expofpapp.Model.ResponseContainer;

import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface ComentarioService {

    @GET("/Comentarios/{id}")
    Call<List<Comentario>> getComentariosProyecto(@Path("id") String id);

    @POST("/Comentarios")
    Call<ComentarioCreateResponse> postComentario(@Body ComentarioDto comentario);

    @DELETE("/Comentarios/{autor}/{id}")
    Call<ResponseBody> deleteComentaio(@Path("autor") String autor, @Path("id") String id);
}
