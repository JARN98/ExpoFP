package com.example.expofpapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import Fragments.LoginFragment;
import Fragments.SignUpFragment;

public class SessionActivity extends AppCompatActivity implements LoginFragment.OnFragmentInteractionListener, SignUpFragment.OnFragmentInteractionListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_session);

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



}
