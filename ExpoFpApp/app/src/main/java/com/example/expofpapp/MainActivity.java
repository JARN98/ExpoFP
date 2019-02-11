package com.example.expofpapp;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.widget.TextView;
import android.widget.Toast;

import com.example.expofpapp.Fragments.LoginFragment;
import com.example.expofpapp.Fragments.PerfilFragment;
import com.example.expofpapp.Fragments.ProyectoResFragment;
import com.example.expofpapp.Generator.UtilToken;
import com.example.expofpapp.Listener.ProyectoResListener;

public class MainActivity extends AppCompatActivity implements ProyectoResListener {

    private TextView mTextMessage;
    private Fragment f;

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
                    mTextMessage.setText(R.string.title_notifications);
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

        mTextMessage = (TextView) findViewById(R.id.message);
        BottomNavigationView navigation = (BottomNavigationView) findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
        String token = UtilToken.getToken(this);

        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.contenedor_main, new ProyectoResFragment())
                .commit();
    }

    @Override
    public void verProyecto(String proyecto) {

    }
}
