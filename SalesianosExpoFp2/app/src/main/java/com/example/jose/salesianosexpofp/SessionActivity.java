package com.example.jose.salesianosexpofp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

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
    }
}
