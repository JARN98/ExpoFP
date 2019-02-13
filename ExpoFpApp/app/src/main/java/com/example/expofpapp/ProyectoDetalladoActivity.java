package com.example.expofpapp;

import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import com.example.expofpapp.Adapters.MyProyectoResRecyclerViewAdapter;
import com.example.expofpapp.Adapters.ViewPagerAdapter;
import com.example.expofpapp.Generator.ServiceGenerator;
import com.example.expofpapp.Model.Proyecto;
import com.example.expofpapp.Model.ProyectoRes;
import com.example.expofpapp.Model.ResponseContainer;
import com.example.expofpapp.Services.ProyectoService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProyectoDetalladoActivity extends AppCompatActivity {

    ViewPager viewPager;
    TextView tvCurso;
    TextView tvAutores;
    TextView tvDescripcion;
    RatingBar rbValoracionMedia;
    String idProyec;
    Proyecto proyec;


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


        ProyectoService service = ServiceGenerator.createService(ProyectoService.class);
        Call<Proyecto> call = service.getProyecto(idProyec);

        call.enqueue(new Callback<Proyecto>() {

            @Override
            public void onResponse(Call<Proyecto> call, Response<Proyecto> response) {
                if (response.code() != 200) {
                    Toast.makeText(ProyectoDetalladoActivity.this, "Error", Toast.LENGTH_SHORT).show();
                } else {
                   proyec = response.body();

                   tvCurso.setText(proyec.getCurso());
                   tvAutores.setText(proyec.getAutores());
                   tvDescripcion.setText(proyec.getDescripcion());
                   rbValoracionMedia.setOnRatingBarChangeListener(proyec.getValoracioMedia());
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
