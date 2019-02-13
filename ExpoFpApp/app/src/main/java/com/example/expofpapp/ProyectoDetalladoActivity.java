package com.example.expofpapp;

import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.RatingBar;
import android.widget.TextView;

import com.example.expofpapp.Adapters.ViewPagerAdapter;
import com.example.expofpapp.Services.ProyectoService;

public class ProyectoDetalladoActivity extends AppCompatActivity {

    ViewPager viewPager;
    TextView tvCurso;
    TextView tvAutores;
    TextView tvDescripcion;
    RatingBar rbValoracionMedia;
    String idProyec;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_proyecto_detallado);

        viewPager = (ViewPager) findViewById(R.id.viewPager);
        tvDescripcion = (TextView) findViewById(R.id.tvDescripcion);
        tvCurso = (TextView) findViewById(R.id.tvCurso);
        tvAutores = (TextView) findViewById(R.id.tvAutores);
        rbValoracionMedia = (RatingBar) findViewById(R.id.rbValoracionMedia);

        ViewPagerAdapter viewPagerAdapter = new ViewPagerAdapter(this);
        viewPager.setAdapter(viewPagerAdapter);

        Bundle extras = getIntent().getExtras();
        idProyec = extras.getString("id");

        


    }

    //on create
        //Coger id de proyec
        //llamada a la api pa pintar toda la info
}
