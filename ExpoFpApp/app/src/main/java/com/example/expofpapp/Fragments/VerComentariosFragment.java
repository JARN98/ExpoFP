package com.example.expofpapp.Fragments;

import android.arch.lifecycle.Observer;
import android.arch.lifecycle.ViewModelProviders;
import android.content.Context;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.expofpapp.Adapters.MyComentariosRecyclerViewAdapter;

import com.example.expofpapp.Generator.ServiceGenerator;
import com.example.expofpapp.Generator.TipoAutenticacion;
import com.example.expofpapp.Generator.UtilToken;
import com.example.expofpapp.Model.Comentario;
import com.example.expofpapp.Model.ProyectoRes;
import com.example.expofpapp.Model.ResponseContainer;
import com.example.expofpapp.R;
import com.example.expofpapp.Services.ComentarioService;
import com.example.expofpapp.Services.ProyectoService;
import com.example.expofpapp.VerComentariosActivity;
import com.example.expofpapp.ViewModels.ComentarioViewModel;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A fragment representing a list of Items.
 * <p/>
 * Activities containing this fragment MUST implement the {@link OnListFragmentInteractionListener}
 * interface.
 */
public class VerComentariosFragment extends Fragment {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    // TODO: Customize parameters
    private int mColumnCount = 1;
    private OnListFragmentInteractionListener mListener;
    List<Comentario> cometariosList;
    MyComentariosRecyclerViewAdapter adapter;
    private Context ctx;
    private ComentarioViewModel mViewModel;


    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public VerComentariosFragment() {
    }

    // TODO: Customize parameter initialization
    @SuppressWarnings("unused")
    public static VerComentariosFragment newInstance(int columnCount) {
        VerComentariosFragment fragment = new VerComentariosFragment();
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
        View view = inflater.inflate(R.layout.fragment_comentarios_list, container, false);

        // Set the adapter
        if (view instanceof RecyclerView) {
            ctx = view.getContext();
            final RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(ctx));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(ctx, mColumnCount));
            }
            mViewModel = ViewModelProviders.of((FragmentActivity) ctx).get(ComentarioViewModel.class);
            cometariosList = new ArrayList<>();

            ComentarioService service = ServiceGenerator.createService(ComentarioService.class, UtilToken.getToken(ctx), TipoAutenticacion.JWT );
            Call<List<Comentario>> call = service.getComentariosProyecto(mViewModel.getSelectedIdProyec().getValue());

            call.enqueue(new Callback<List<Comentario>>() {

                @Override
                public void onResponse(Call<List<Comentario>> call, Response<List<Comentario>> response) {
                    if (response.code() != 200) {
                        Toast.makeText(getActivity(), "Error en petición", Toast.LENGTH_SHORT).show();
                    } else {
                        cometariosList = response.body();

                        adapter = new MyComentariosRecyclerViewAdapter(
                                ctx,
                                cometariosList,
                                mListener
                        );
                        recyclerView.setAdapter(adapter);
                    }
                }

                @Override
                public void onFailure(Call<List<Comentario>> call, Throwable t) {
                    Log.e("NetworkFailure", t.getMessage());
                    Toast.makeText(getActivity(), "Error de conexión", Toast.LENGTH_SHORT).show();

                }
            });
            lanzarViewModel(ctx);
        }
        return view;
    }


    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnListFragmentInteractionListener) {
            mListener = (OnListFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnListFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    private void lanzarViewModel(Context ctx) {
        ComentarioViewModel comentarioViewModel = ViewModelProviders.of((FragmentActivity) ctx)
                .get(ComentarioViewModel.class);
        comentarioViewModel.getAll().observe(getActivity(), new Observer<List<Comentario>>() {
            @Override
            public void onChanged(@Nullable List<Comentario> comentarios) {
                adapter.setNuevosComentarios(comentarios);
            }
        });
    }


    public interface OnListFragmentInteractionListener {

    }

}
