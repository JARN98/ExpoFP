package com.example.expofpapp.Services;

import com.example.expofpapp.Model.LoginResponse;
import com.example.expofpapp.Model.PassDto;
import com.example.expofpapp.Model.User;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface AuthService {

    @POST("/auth")
    Call<LoginResponse> doLogin(@Header("Authorization") String authorization);

    @PUT("/users/{id}/password")
    Call<User> updatePass(@Header("Authorization") String authorization, @Path("id") String id, @Body PassDto pass);

    @POST("/users")
    Call<LoginResponse> doRegister(@Body User user);

}
