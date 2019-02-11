package com.example.expofpapp.Fragments;

import android.arch.lifecycle.ViewModelProviders;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.example.expofpapp.Generator.UtilUser;
import com.example.expofpapp.R;
import com.example.expofpapp.ViewModels.PerfilViewModel;

public class PerfilFragment extends Fragment {

    private PerfilViewModel mViewModel;
    private TextView tvNombre;
    private TextView tvEmail;
    private ImageView ivImagen;

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

        tvNombre.setText(UtilUser.getNombre(getActivity()));
        tvEmail.setText(UtilUser.getEmail(getActivity()));

        Glide
                .with(getActivity())
                .load(UtilUser.getImagen(getActivity()))
                .into(ivImagen);

        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mViewModel = ViewModelProviders.of(this).get(PerfilViewModel.class);
        // TODO: Use the ViewModel
    }

}
