package com.example.jose.salesianosexpofp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.support.v4.app.Fragment;
import android.app.FragmentTransaction;
import android.support.v4.app.FragmentManager;

import com.example.jose.salesianosexpofp.Fragments.SignupFragment;
import com.example.jose.salesianosexpofp.Listener.LoginListener;

public class SessionActivity extends AppCompatActivity implements LoginListener {
    private EditText editText_email;
    private EditText editText_password;
    private Button button_login;
    private Button button_registro;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_session);

        editText_email = findViewById(R.id.editText_email);
        editText_password = findViewById(R.id.editText_password);
        button_login = findViewById(R.id.button_login);
        button_registro = findViewById(R.id.button_registro);

        /*button_registro.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //CARGAR FRAGMENT DE REGISTRO
                Fragment nuevoFragmento = new SignupFragment();
                FragmentTransaction transaction = getFragmentManager().beginTransaction();
                transaction.replace(R.id.fragment, nuevoFragmento);
                transaction.addToBackStack(null);

                // Commit a la transacción
                transaction.commit();
            }
        });*/
    }
}
