package com.example.expofpapp.Fragments;

import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.bumptech.glide.Glide;
import com.example.expofpapp.Adapters.MyProyectoResRecyclerViewAdapter;
import com.example.expofpapp.Listener.ProyectoResListener;
import com.example.expofpapp.Model.ProyectoRes;
import com.example.expofpapp.R;

import java.util.ArrayList;
import java.util.List;


public class ProyectoResFragment extends Fragment {

    // TODO: Customize parameter argument names
    private static final String ARG_COLUMN_COUNT = "column-count";
    // TODO: Customize parameters
    private int mColumnCount = 1;
    private Context ctx;
    private ProyectoResListener mListener;
    List<ProyectoRes> proyectoResList;
    MyProyectoResRecyclerViewAdapter adapter;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public ProyectoResFragment() {
    }

    // TODO: Customize parameter initialization
    @SuppressWarnings("unused")
    public static ProyectoResFragment newInstance(int columnCount) {
        ProyectoResFragment fragment = new ProyectoResFragment();
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
        View view = inflater.inflate(R.layout.fragment_proyectores_list, container, false);


        // Set the adapter
        if (view instanceof RecyclerView) {
            ctx = view.getContext();
            RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(ctx));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(ctx, mColumnCount));
            }
            //recyclerView.setAdapter(new MyProyectoResRecyclerViewAdapter(DummyContent.ITEMS, mListener));

            //Aquí añado las cosas de retrofit para setear el adapter con los datos de la api
            proyectoResList = new ArrayList<>();

            proyectoResList.add(new ProyectoRes("Nuevo Proyecto","https://imgur.com/QVHKrue",7.3,"kasdññsaldñads", "2DAM"));
            proyectoResList.add(new ProyectoRes("Nuevo Proyecto","https://imgur.com/QVHKrue",7.3,"kasdññsaldñads", "2DAM"));
            proyectoResList.add(new ProyectoRes("Nuevo Proyecto","https://imgur.com/QVHKrue",7.3,"kasdññsaldñads", "2DAM"));
            proyectoResList.add(new ProyectoRes("Nuevo Proyecto","https://imgur.com/QVHKrue",7.3,"kasdññsaldñads", "2DAM"));


            adapter = new MyProyectoResRecyclerViewAdapter(
                    ctx,
                    proyectoResList,
                    mListener
            );
            recyclerView.setAdapter(adapter);
        }
        return view;
    }


    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof ProyectoResListener) {
            mListener = (ProyectoResListener) context;
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
}
