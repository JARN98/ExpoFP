package com.example.expofpapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.example.expofpapp.Fragments.VerComentariosFragment;

public class VerComentariosActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ver_comentarios);

        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.contenedor_comentarios, new VerComentariosFragment())
                .commit();
    }
}
