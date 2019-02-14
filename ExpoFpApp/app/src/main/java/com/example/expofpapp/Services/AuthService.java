package com.example.expofpapp.Services;

import com.example.expofpapp.Model.DisableEncuestaDto;
import com.example.expofpapp.Model.LoginResponse;
import com.example.expofpapp.Model.PassDto;
import com.example.expofpapp.Model.User;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Part;
import retrofit2.http.Path;

public interface AuthService {

    @POST("/auth")
    Call<LoginResponse> doLogin(@Header("Authorization") String authorization);

    @PUT("/users/{id}/password")
    Call<User> updatePass(@Header("Authorization") String authorization, @Path("id") String id, @Body PassDto pass);

    @Multipart
    @POST("/users/android")
    Call<LoginResponse> doRegister(@Part MultipartBody.Part picture,
                                   @Part("email") RequestBody email,
                                   @Part("password") RequestBody password,
                                   @Part("name") RequestBody name);

    @POST("/auth/google")
    Call<LoginResponse> doLoginGoogle(@Path("access_token") String access_token);
    
    @PUT("/users/{id}/encuesta")
    Call<User> disableEncuesta(@Path("id") String id, @Body DisableEncuestaDto disableEncuestaDto);

}
