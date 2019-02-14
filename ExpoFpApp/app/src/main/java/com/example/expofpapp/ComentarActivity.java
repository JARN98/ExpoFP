package com.example.expofpapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RatingBar;
import android.widget.Toast;

import com.example.expofpapp.Generator.ServiceGenerator;
import com.example.expofpapp.Generator.TipoAutenticacion;
import com.example.expofpapp.Generator.UtilToken;
import com.example.expofpapp.Generator.UtilUser;
import com.example.expofpapp.Model.ComentarioCreateResponse;
import com.example.expofpapp.Model.ComentarioDto;
import com.example.expofpapp.Model.Proyecto;
import com.example.expofpapp.Services.ComentarioService;
import com.example.expofpapp.Services.ProyectoService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ComentarActivity extends AppCompatActivity {

    RatingBar rbValoracion;
    EditText etComentario;
    Button btnComentar;
    double valoracion;
    String contenidoComentario, autor,idProyec;
    int dobleRating = 2;
    ComentarioDto comentario;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_comentar);

        rbValoracion = findViewById(R.id.ratingBarValoracionComentar);
        etComentario = findViewById(R.id.editTextComentario);
        btnComentar = findViewById(R.id.buttonComentar);

        autor = UtilUser.getId(ComentarActivity.this);
        Bundle extras = getIntent().getExtras();
        idProyec = extras.getString("id");




        btnComentar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                doComentario ();

            }


        });

    }

    public void doComentario (){
        valoracion = rbValoracion.getRating() * dobleRating;
        contenidoComentario = etComentario.getText().toString();
        if(contenidoComentario.isEmpty())
            Toast.makeText(this, "No puede escribir un comentario vacio", Toast.LENGTH_SHORT).show();
        else if(valoracion == 0)
            Toast.makeText(this, "Debe dar una valoración", Toast.LENGTH_SHORT).show();
        else {
            comentario = new ComentarioDto(idProyec, autor, contenidoComentario, valoracion);
            ComentarioService service = ServiceGenerator.createService(ComentarioService.class, UtilToken.getToken(ComentarActivity.this), TipoAutenticacion.JWT);
            Call<ComentarioCreateResponse> call = service.postComentario(comentario);
            call.enqueue(new Callback<ComentarioCreateResponse>() {

                @Override
                public void onResponse(Call<ComentarioCreateResponse> call, Response<ComentarioCreateResponse> response) {
                    if (response.code() != 201) {
                        Toast.makeText(ComentarActivity.this, "Error", Toast.LENGTH_SHORT).show();
                    } else

                        navegarProyectoDetallado();

                }

                @Override
                public void onFailure(Call<ComentarioCreateResponse> call, Throwable t) {
                    Log.e("NetworkFailure", t.getMessage());
                    Toast.makeText(ComentarActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
                }


            });
        }

    }

    public void navegarProyectoDetallado(){
      /*  Intent i = new Intent( ComentarActivity.this, ProyectoDetalladoActivity.class);
        i.putExtra("id", idProyec);
        ComentarActivity.this.startActivity(i);
*/
        finish();

    }
}
