package com.example.expofpapp;

import android.arch.lifecycle.ViewModelProviders;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.example.expofpapp.Fragments.VerComentariosFragment;
import com.example.expofpapp.ViewModels.ComentarioViewModel;

public class VerComentariosActivity extends AppCompatActivity implements VerComentariosFragment.OnListFragmentInteractionListener {
    private ComentarioViewModel mViewModel;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ver_comentarios);


        Bundle extras = getIntent().getExtras();
        mViewModel = ViewModelProviders.of(VerComentariosActivity.this).get(ComentarioViewModel.class);
        mViewModel.selectId(extras.getString("id"));

        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.contenedor_comentarios, new VerComentariosFragment())
                .commit();
    }
}
