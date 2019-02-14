package com.example.expofpapp;

import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.example.expofpapp.Fragments.LoginFragment;
import com.example.expofpapp.Fragments.SignUpFragment;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

public class SessionActivity extends AppCompatActivity implements LoginFragment.OnFragmentInteractionListener, SignUpFragment.OnFragmentInteractionListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_session);

        FirebaseOptions.Builder builder = new FirebaseOptions.Builder()
                .setApplicationId("1:473316374076:android:756c63e232baed63")
                .setApiKey("AAAAbjPatjw:APA91bHRvQcuvAOXoRlBJ3xhymCbE46B5nfVucZZChblmvKx2Zc0NM5sdc_UkFVmJUIFO0ElCJ6ZA8b__uM2f5C1qAhpLdEvSp6dkEmlV3GpNpaxTatn8WEwPCG-t3uz05DqG2lfRLZB")
                .setDatabaseUrl("https://expofp-salesianos.firebaseio.com");
        FirebaseApp.initializeApp(this, builder.build());

        getSupportFragmentManager()
                .beginTransaction()
                .add(R.id.contenedor, new LoginFragment())
                .commit();
    }

    @Override
    public void navegarRegistro() {

        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.contenedor, new SignUpFragment())
                .commit();

    }


    @Override
    public void navegarLogin() {
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.contenedor, new LoginFragment())
                .commit();
    }
}
