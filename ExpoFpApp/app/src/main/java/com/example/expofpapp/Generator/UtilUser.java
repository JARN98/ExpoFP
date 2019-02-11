package com.example.expofpapp.Generator;

import android.content.Context;
import android.content.SharedPreferences;

import com.example.expofpapp.Model.User;
import com.example.expofpapp.R;

public class UtilUser {

    public static void setEmail(Context mContext, String email) {
        SharedPreferences sharedPreferences =
                mContext.getSharedPreferences(
                        "login",
                        Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString("Email", email);
        editor.commit();
    }


    public static String getEmail(Context mContext) {
        SharedPreferences sharedPreferences = mContext.getSharedPreferences(
                "login",
                Context.MODE_PRIVATE
        );

        String email = sharedPreferences
                .getString("Email", null);

        return email;
    }

    public static void setNombre(Context mContext, String nombre) {
        SharedPreferences sharedPreferences =
                mContext.getSharedPreferences(
                        "login",
                        Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString("Nombre", nombre);
        editor.commit();
    }


    public static String getNombre(Context mContext) {
        SharedPreferences sharedPreferences = mContext.getSharedPreferences(
                "login",
                Context.MODE_PRIVATE
        );

        String nombre = sharedPreferences
                .getString("Nombre", null);

        return nombre;
    }

    public static void setImagen(Context mContext, String imagen) {
        SharedPreferences sharedPreferences =
                mContext.getSharedPreferences(
                        "login",
                        Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString("Imagen", imagen);
        editor.commit();
    }


    public static String getImagen(Context mContext) {
        SharedPreferences sharedPreferences = mContext.getSharedPreferences(
                "login",
                Context.MODE_PRIVATE
        );

        String imagen = sharedPreferences
                .getString("Imagen", null);

        return imagen;
    }

    public static void setRol(Context mContext, String rol) {
        SharedPreferences sharedPreferences =
                mContext.getSharedPreferences(
                        "login",
                        Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString("Rol", rol);
        editor.commit();
    }


    public static String getRol(Context mContext) {
        SharedPreferences sharedPreferences = mContext.getSharedPreferences(
                "login",
                Context.MODE_PRIVATE
        );

        String rol = sharedPreferences
                .getString("Rol", null);

        return rol;
    }

    public static  void setUserInfo(Context mContext, User user){
        setNombre(mContext, user.getName());
        setEmail(mContext, user.getEmail());
        setImagen(mContext, user.getPicture());
        setRol(mContext, user.getRole());
    }


}
