package com.example.expofpapp;

import android.app.ActionBar;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.design.widget.Snackbar;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.widget.Toast;

import com.example.expofpapp.Fragments.LoginFragment;
import com.example.expofpapp.Fragments.SignUpFragment;
import com.example.expofpapp.Generator.UtilUser;
import com.google.android.gms.auth.api.Auth;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GoogleAuthProvider;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import java.util.concurrent.Executor;

import static android.support.constraint.Constraints.TAG;

public class SessionActivity extends AppCompatActivity implements LoginFragment.OnFragmentInteractionListener, SignUpFragment.OnFragmentInteractionListener {

    private FirebaseAuth mAuth;
    FirebaseOptions.Builder builder;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_session);

        getSupportFragmentManager()
                .beginTransaction()
                .add(R.id.contenedor, new LoginFragment())
                .commit();

        if (builder == null) {
            builder = new FirebaseOptions.Builder()
                    .setApplicationId("1:473316374076:android:756c63e232baed63")
                    .setApiKey("AAAAbjPatjw:APA91bHRvQcuvAOXoRlBJ3xhymCbE46B5nfVucZZChblmvKx2Zc0NM5sdc_UkFVmJUIFO0ElCJ6ZA8b__uM2f5C1qAhpLdEvSp6dkEmlV3GpNpaxTatn8WEwPCG-t3uz05DqG2lfRLZB")
                    .setDatabaseUrl("https://expofp-salesianos.firebaseio.com");
            FirebaseApp.initializeApp(this, builder.build());
        }

    }

    @Override
    protected void onStart() {
        super.onStart();

/*        if (builder == null) {
            builder = new FirebaseOptions.Builder()
                    .setApplicationId("1:473316374076:android:756c63e232baed63")
                    .setApiKey("AAAAbjPatjw:APA91bHRvQcuvAOXoRlBJ3xhymCbE46B5nfVucZZChblmvKx2Zc0NM5sdc_UkFVmJUIFO0ElCJ6ZA8b__uM2f5C1qAhpLdEvSp6dkEmlV3GpNpaxTatn8WEwPCG-t3uz05DqG2lfRLZB")
                    .setDatabaseUrl("https://expofp-salesianos.firebaseio.com");
            FirebaseApp.initializeApp(this, builder.build());
        }*/

        if (UtilUser.getEmail(this) != null) {
            startActivity(new Intent(SessionActivity.this, MainActivity.class));
        }
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
