package com.example.expofpapp.Fragments;

import android.arch.lifecycle.ViewModelProviders;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.expofpapp.Generator.ServiceGenerator;
import com.example.expofpapp.Generator.UtilToken;
import com.example.expofpapp.Generator.UtilUser;
import com.example.expofpapp.MainActivity;
import com.example.expofpapp.Model.LoginResponse;
import com.example.expofpapp.Model.PassDto;
import com.example.expofpapp.Model.User;
import com.example.expofpapp.R;
import com.example.expofpapp.Services.AuthService;
import com.example.expofpapp.SessionActivity;
import com.example.expofpapp.ViewModels.PerfilViewModel;

import okhttp3.Credentials;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PerfilFragment extends Fragment {

    private PerfilViewModel mViewModel;
    private TextView tvNombre, tvEmail;
    private EditText etPass, etNewPass;
    private ImageView ivImagen;
    private Button btnLogout,btnCambiarPass, btnCambiar;

    public static PerfilFragment newInstance() {
        return new PerfilFragment();
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.perfil_fragment, container, false);

        tvNombre = view.findViewById(R.id.textViewNombrePerfil);
        tvEmail = view.findViewById(R.id.textViewEmailPerfil);
        ivImagen = view.findViewById(R.id.imageViewPerfil);
        btnLogout = view.findViewById(R.id.buttonLogout);
        btnCambiarPass = view.findViewById(R.id.buttonCambiarPass);
        btnCambiar = view.findViewById(R.id.buttonUpdatePass);
        etPass = view.findViewById(R.id.editTextPassPerfil);
        etNewPass = view.findViewById(R.id.editTextNuevaPassPerfil);

        btnCambiar.setVisibility(View.GONE);
        etPass.setVisibility(View.GONE);
        etNewPass.setVisibility(View.GONE);

        tvNombre.setText(UtilUser.getNombre(getActivity()));
        tvEmail.setText(UtilUser.getEmail(getActivity()));

        Glide
                .with(getActivity())
                .load(UtilUser.getImagen(getActivity()))
                .into(ivImagen);

        btnLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                logout();
                navegarSessionActivity();
            }
        });

        btnCambiarPass.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                btnCambiar.setVisibility(View.VISIBLE);
                etPass.setVisibility(View.VISIBLE);
                etNewPass.setVisibility(View.VISIBLE);
            }
        });

        btnCambiar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                updatePass();
            }
        });


        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mViewModel = ViewModelProviders.of(this).get(PerfilViewModel.class);
        // TODO: Use the ViewModel
    }

    public void logout(){
        UtilUser.clearSharedPreferences(getActivity());
    }
    public void navegarSessionActivity(){
        startActivity(new Intent(getActivity(), SessionActivity.class));
    }

    public void updatePass() {



        String credentials = Credentials.basic(UtilUser.getEmail(getActivity()), etPass.getText().toString());
        String idUser = UtilUser.getId(getActivity());
        PassDto newPass = new PassDto(etNewPass.getText().toString());
        AuthService service = ServiceGenerator.createService(AuthService.class);
        Call<User> call = service.updatePass(credentials, idUser, newPass);

        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.code() == 401){
                    Toast.makeText(getActivity(), "Contraseña incorrecta", Toast.LENGTH_SHORT).show();
                }
                if (response.code() != 200) {
                    // error
                    Log.e("RequestError", response.message());

                } else {
                    logout();
                    navegarSessionActivity();
                    Toast.makeText(getActivity(), "Contraseña cambiada", Toast.LENGTH_SHORT).show();

                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Log.e("NetworkFailure", t.getMessage());
                Toast.makeText(getActivity(), "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });

    }

}
