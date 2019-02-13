package com.example.expofpapp.Fragments;

import android.content.Context;
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

import com.example.expofpapp.Adapters.MyComentariosRecyclerViewAdapter;

import com.example.expofpapp.Generator.ServiceGenerator;
import com.example.expofpapp.Model.Comentario;
import com.example.expofpapp.Model.ProyectoRes;
import com.example.expofpapp.Model.ResponseContainer;
import com.example.expofpapp.R;
import com.example.expofpapp.Services.ComentarioService;
import com.example.expofpapp.Services.ProyectoService;

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


            ComentarioService service = ServiceGenerator.createService(ComentarioService.class);
            Call<ResponseContainer<Comentario>> call = service.getComentariosProyecto("651");

            call.enqueue(new Callback<ResponseContainer<Comentario>>() {

                             @Override
                             public void onResponse(Call<ResponseContainer<Comentario>> call, Response<ResponseContainer<Comentario>> response) {
                                 if (response.code() != 200) {
                                     Toast.makeText(getActivity(), "Error en petición", Toast.LENGTH_SHORT).show();
                                 } else {
                                     cometariosList = response.body().getRows();

                                     adapter = new MyComentariosRecyclerViewAdapter(
                                             ctx,
                                             cometariosList,
                                             mListener
                                     );
                                     recyclerView.setAdapter(adapter);
                                 }
                             }

                             @Override
                             public void onFailure(Call<ResponseContainer<Comentario>> call, Throwable t) {
                                 Log.e("NetworkFailure", t.getMessage());
                                 Toast.makeText(getActivity(), "Error de conexión", Toast.LENGTH_SHORT).show();

                             }
                            });

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


    public interface OnListFragmentInteractionListener {

    }

}

