package com.example.expofpapp.Fragments;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.expofpapp.Adapters.MyEncuestaRecyclerViewAdapter;
import com.example.expofpapp.Adapters.MyProyectoResRecyclerViewAdapter;
import com.example.expofpapp.Generator.ServiceGenerator;
import com.example.expofpapp.Generator.TipoAutenticacion;
import com.example.expofpapp.Generator.UtilToken;
import com.example.expofpapp.Listener.EncuestaListener;
import com.example.expofpapp.Model.Pregunta;
import com.example.expofpapp.Model.ResponseContainer;
import com.example.expofpapp.R;
import com.example.expofpapp.Services.EncuestaService;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class EncuestaFragment extends Fragment {
    private static final String ARG_COLUMN_COUNT = "column-count";
    private EncuestaListener mListener;
    private int mColumnCount = 1;
    private Context cxt;
    List<Pregunta> preguntas;
    MyEncuestaRecyclerViewAdapter adapter;

    public EncuestaFragment(){
    }

    // TODO: Rename and change types and number of parameters
    public static EncuestaFragment newInstance(int columnCount) {
        EncuestaFragment fragment = new EncuestaFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_encuesta, container, false);

        if (view instanceof RecyclerView) {
            cxt = view.getContext();
            final RecyclerView recyclerViewE = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerViewE.setLayoutManager(new LinearLayoutManager(cxt));
            } else {
                recyclerViewE.setLayoutManager(new GridLayoutManager(cxt, mColumnCount));
            }

            preguntas = new ArrayList<>();
            EncuestaService serviceEncuesta = ServiceGenerator.createService(EncuestaService.class, UtilToken.getToken(cxt), TipoAutenticacion.JWT);
            Call<ResponseContainer<Pregunta>> callEncuesta = serviceEncuesta.getListEncuesta();

            callEncuesta.enqueue(new Callback<ResponseContainer<Pregunta>>() {
                @Override
                public void onResponse(Call<ResponseContainer<Pregunta>> call, Response<ResponseContainer<Pregunta>> response) {
                    if (response.code() != 200) {
                        Toast.makeText(getActivity(), "Error en petición", Toast.LENGTH_SHORT).show();
                    } else {
                        preguntas = response.body().getRows();

                        adapter = new MyEncuestaRecyclerViewAdapter(
                                cxt,
                                preguntas,
                                mListener
                        );

                        recyclerViewE.setAdapter(adapter);

                    }

                }

                @Override
                public void onFailure(Call<ResponseContainer<Pregunta>> call, Throwable t) {
                    Log.e("NetworkFailure", t.getMessage());
                    Toast.makeText(getActivity(), "Error de conexión", Toast.LENGTH_SHORT).show();
                }
            });

        }

        //settear adapter con la lista de preguntas sacada de retrofit


        return view;
    }


    @Override
    public void onAttach(Context cxt) {
        super.onAttach(cxt);
        if (cxt instanceof EncuestaListener) {
            mListener = (EncuestaListener) cxt;
        } else {
            throw new RuntimeException(cxt.toString()
                    + " must implement EncuestaListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

}
