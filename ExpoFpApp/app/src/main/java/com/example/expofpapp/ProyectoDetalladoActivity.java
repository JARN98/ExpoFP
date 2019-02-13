package com.example.expofpapp;

import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import com.example.expofpapp.Adapters.ViewPagerAdapter;
import com.example.expofpapp.Generator.ServiceGenerator;
import com.example.expofpapp.Model.Proyecto;
import com.example.expofpapp.Services.ProyectoService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProyectoDetalladoActivity extends AppCompatActivity {

    ViewPager viewPager;
    TextView tvNombre;
    TextView tvCurso;
    TextView tvAutores;
    TextView tvDescripcion;
    RatingBar rbValoracionMedia;
    String idProyec;
    Proyecto proyec;
    String autores;
    Float valoracionMedia;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_proyecto_detallado);

        viewPager = findViewById(R.id.viewPager);
        tvDescripcion = findViewById(R.id.tvDescripcion);
        tvCurso = findViewById(R.id.tvCurso);
        tvAutores = findViewById(R.id.tvAutores);
        rbValoracionMedia =  findViewById(R.id.rbValoracionMedia);
        tvNombre = findViewById(R.id.tvNombre);

        ViewPagerAdapter viewPagerAdapter = new ViewPagerAdapter(this);
        viewPager.setAdapter(viewPagerAdapter);

        Bundle extras = getIntent().getExtras();
        idProyec = extras.getString("id");


        ProyectoService service = ServiceGenerator.createService(ProyectoService.class);
        Call<Proyecto> call = service.getProyecto(idProyec);


        call.enqueue(new Callback<Proyecto>() {

            @Override
            public void onResponse(Call<Proyecto> call, Response<Proyecto> response) {
                if (response.code() != 200) {
                    Toast.makeText(ProyectoDetalladoActivity.this, "Error", Toast.LENGTH_SHORT).show();
                } else {
                   proyec = response.body();

                   for(String autor : proyec.getAutores()) {
                       autores = autores + " " + autor;
                   }
                   tvCurso.setText(proyec.getCurso());
                   tvNombre.setText(proyec.getNombre());
                   tvAutores.setText(autores);
                   tvDescripcion.setText(proyec.getDescripcion());
                   rbValoracionMedia.setRating((float) proyec.getValoracioMedia());
                }
            }

            @Override
            public void onFailure(Call<Proyecto> call, Throwable t) {
                Log.e("NetworkFailure", t.getMessage());
                Toast.makeText(ProyectoDetalladoActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
            }


        });

    }
}
