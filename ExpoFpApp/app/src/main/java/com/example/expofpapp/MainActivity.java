package com.example.expofpapp;

import android.arch.lifecycle.Observer;
import android.arch.lifecycle.ViewModelProviders;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.BottomNavigationView;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v7.app.AlertDialog;
import android.util.Log;

import android.util.Log;

import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.example.expofpapp.Fragments.EncuestaFragment;
import com.example.expofpapp.Fragments.PerfilFragment;
import com.example.expofpapp.Fragments.ProyectoResFragment;
import com.example.expofpapp.Generator.ServiceGenerator;
import com.example.expofpapp.Generator.TipoAutenticacion;
import com.example.expofpapp.Generator.UtilToken;
import com.example.expofpapp.Generator.UtilUser;
import com.example.expofpapp.Listener.EncuestaListener;
import com.example.expofpapp.Listener.ProyectoResListener;
import com.example.expofpapp.Model.DisableEncuestaDto;
import com.example.expofpapp.Model.Pregunta;
import com.example.expofpapp.Model.UpdatePreguntaDto;
import com.example.expofpapp.Model.User;
import com.example.expofpapp.Services.AuthService;
import com.example.expofpapp.Services.EncuestaService;
import com.example.expofpapp.Services.ProyectoService;
import com.example.expofpapp.ViewModels.EncuestaViewModel;
import com.google.android.gms.auth.api.Auth;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GoogleAuthProvider;

import java.util.List;
import java.util.concurrent.Executor;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static android.support.constraint.Constraints.TAG;


public class MainActivity extends AppCompatActivity implements ProyectoResListener, EncuestaListener {

    private TextView mTextMessage;
    private Fragment f;
    private MenuItem encuesta;
    private FloatingActionButton fab;
    EncuestaViewModel encuestaViewModel;


    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {
        Fragment f = null;




        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {

            switch (item.getItemId()) {
                case R.id.navigation_proyectores:
                    fab.hide();
                    f = new ProyectoResFragment();
                    break;
                case R.id.navigation_perfil:
                    fab.hide();
                    f = new PerfilFragment();
                    break;
                case R.id.navigation_encuesta:
                    fab.show();
                    f = new EncuestaFragment();
                    break;
            }

            getSupportFragmentManager()
                    .beginTransaction()
                    .replace(R.id.contenedor_main, f)
                    .commit();
            return true;
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        FirebaseApp.initializeApp(this);


        mTextMessage =  findViewById(R.id.message);
        BottomNavigationView navigation = findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
        final Menu menu = navigation.getMenu();
        ocultarEncuesta(menu);


        fab = findViewById(R.id.fab);
        fab.hide();


        encuestaViewModel = ViewModelProviders.of((FragmentActivity) this).get(EncuestaViewModel.class);






        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {



                EncuestaService service = ServiceGenerator.createService(EncuestaService.class, UtilToken.getToken(MainActivity.this), TipoAutenticacion.JWT);

                for (int i = 0; i < encuestaViewModel.listaPreguntas.getValue().size(); i++) {
                    UpdatePreguntaDto update = new UpdatePreguntaDto(encuestaViewModel.listaPreguntas.getValue().get(i).getnA(), encuestaViewModel.listaPreguntas.getValue().get(i).getnB(), encuestaViewModel.listaPreguntas.getValue().get(i).getnC());
                    Call<Pregunta> call = service.enviarEncuesta(update, encuestaViewModel.listaPreguntas.getValue().get(i).getId());


                    call.enqueue(new Callback<Pregunta>() {
                        @Override
                        public void onResponse(Call<Pregunta> call, Response<Pregunta> response) {
                            Toast.makeText(MainActivity.this, ""+response.code(), Toast.LENGTH_SHORT).show();
                        }

                        @Override
                        public void onFailure(Call<Pregunta> call, Throwable t) {
                            Log.e("NetworkFailure", t.getMessage());
                            /*Toast.makeText(MainActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();*/
                        }
                    });
                }

                getSupportFragmentManager()
                        .beginTransaction()
                        .replace(R.id.contenedor_main, new ProyectoResFragment())
                        .commit();

                AuthService authService = ServiceGenerator.createService(AuthService.class, UtilToken.getToken(MainActivity.this), TipoAutenticacion.JWT);

                Call<User> call = authService.disableEncuesta(UtilUser.getId(MainActivity.this), new DisableEncuestaDto(true));

                call.enqueue(new Callback<User>() {
                    @Override
                    public void onResponse(Call<User> call, Response<User> response) {
                        if(response.code() != 200 || response.code() != 204) {
                            fab.hide();

                            UtilUser.setEncuesta(MainActivity.this, true);

                            ocultarEncuesta(menu);
                        } else {
                            Toast.makeText(MainActivity.this, ""+response.code(), Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<User> call, Throwable t) {
                        Log.e("NetworkFailure", t.getMessage());
                        Toast.makeText(MainActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
                    }
                });


            }
        });


        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.contenedor_main, new ProyectoResFragment())
                .commit();

    }

    @Override
    public void verProyecto(String proyecto) {

    }

    @Override
    public void onBackPressed() {
        // super.onBackPressed();

        // Defino qué quiero hacer cuando el usuario pulse el botón
        // volver o atrás del móvil

        // 1. Instantiate an AlertDialog.Builder with its constructor
        AlertDialog.Builder builder = new AlertDialog.Builder(this);

        // 2.1. Chain together various setter methods to set the dialog characteristics
        builder.setMessage(R.string.dialog_message)
                .setTitle(R.string.dialog_title);

        // 2.2. Añadir botones al diálogo
        builder.setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                // User clicked OK button
                UtilUser.clearSharedPreferences(MainActivity.this);
                finish();
            }
        });
        builder.setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                // User cancelled the dialog
                dialog.dismiss();
            }
        });

        AlertDialog dialog = builder.create();

        dialog.show();
    }



    public void ocultarEncuesta(Menu menu){
        if(UtilUser.getEncuesta(this)){
            MenuItem item = menu.findItem(R.id.navigation_encuesta);
            item.setVisible(false);
        }
    }
}
