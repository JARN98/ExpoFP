package com.example.expofpapp;

import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.Fragment;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TextView;
import android.widget.Toast;

import com.example.expofpapp.Fragments.EncuestaFragment;
import com.example.expofpapp.Fragments.LoginFragment;
import com.example.expofpapp.Fragments.PerfilFragment;
import com.example.expofpapp.Fragments.ProyectoResFragment;
import com.example.expofpapp.Generator.UtilToken;
import com.example.expofpapp.Generator.UtilUser;
import com.example.expofpapp.Listener.EncuestaListener;
import com.example.expofpapp.Listener.ProyectoResListener;

import okhttp3.internal.Util;

public class MainActivity extends AppCompatActivity implements ProyectoResListener, EncuestaListener {

    private TextView mTextMessage;
    private Fragment f;
    private MenuItem encuesta;
    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {
        Fragment f = null;



        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {

            switch (item.getItemId()) {
                case R.id.navigation_proyectores:
                    f = new ProyectoResFragment();
                    break;
                case R.id.navigation_perfil:
                    f = new PerfilFragment();
                    break;
                case R.id.navigation_encuesta:
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


        mTextMessage =  findViewById(R.id.message);
        BottomNavigationView navigation = findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);

        if(UtilUser.getEncuesta(this)){
            Menu menu = navigation.getMenu();
        MenuItem item = menu.findItem(R.id.navigation_encuesta);
        item.setVisible(false);
        }
        String token = UtilToken.getToken(this);

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
}
