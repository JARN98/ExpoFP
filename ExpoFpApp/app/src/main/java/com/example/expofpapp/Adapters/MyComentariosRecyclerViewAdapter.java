package com.example.expofpapp.Adapters;

import android.arch.lifecycle.ViewModelProviders;
import android.content.Context;
import android.support.v4.app.FragmentActivity;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;

import com.example.expofpapp.Dialog.EliminarComentarioDialogFragment;
import com.example.expofpapp.Fragments.VerComentariosFragment.OnListFragmentInteractionListener;

import com.example.expofpapp.Generator.ServiceGenerator;
import com.example.expofpapp.Generator.TipoAutenticacion;
import com.example.expofpapp.Generator.UtilToken;
import com.example.expofpapp.Generator.UtilUser;
import com.example.expofpapp.Model.Comentario;
import com.example.expofpapp.R;
import com.example.expofpapp.Services.ComentarioService;
import com.example.expofpapp.ViewModels.ComentarioViewModel;


import java.util.List;

import okhttp3.ResponseBody;
import okhttp3.internal.Util;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MyComentariosRecyclerViewAdapter extends RecyclerView.Adapter<MyComentariosRecyclerViewAdapter.ViewHolder> {

    private List<Comentario> mValues;
    private final OnListFragmentInteractionListener mListener;
    private final Context ctx;
    private ComentarioViewModel mViewModel;




    public MyComentariosRecyclerViewAdapter(Context cxt, List<Comentario> items, OnListFragmentInteractionListener listener) {
        ctx = cxt;
        mValues = items;
        mListener = listener;

    }

    public void setNuevosComentarios(List<Comentario> nuevosComentarios) {
        this.mValues = nuevosComentarios;
        notifyDataSetChanged();
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_comentarios, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.autor.setText(holder.mItem.getNombreAutor());
        holder.contenido.setText(holder.mItem.getContenido());

        Glide
                .with(this.ctx)
                .load(holder.mItem.getImagenAutor())
                .into(holder.imagen);
        holder.valoracion.setRating((float)holder.mItem.getValoracion());

        if(holder.mItem.getAutor().equalsIgnoreCase(UtilUser.getId(ctx)))
            holder.btnEliminar.setVisibility(View.VISIBLE);

        holder.btnEliminar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mViewModel = ViewModelProviders.of((FragmentActivity) ctx).get(ComentarioViewModel.class);
                mViewModel.selectIdComentario(holder.mItem.getId());
                EliminarComentarioDialogFragment dialogoEliminar = EliminarComentarioDialogFragment.newInstance();
                dialogoEliminar.show(((FragmentActivity) ctx).getSupportFragmentManager(), "dialog");

            }
        });

    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public Comentario mItem;
        public final TextView autor, contenido;
        public final ImageView imagen;
        public final RatingBar valoracion;
        public final Button btnEliminar;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            autor = view.findViewById(R.id.textViewAutorComentario);
            imagen = view.findViewById(R.id.imageViewImgUserComentario);
            contenido = view.findViewById(R.id.textViewContenidoComentario);
            valoracion = view.findViewById(R.id.ratingBarValoracionComentario);
            btnEliminar = view.findViewById(R.id.buttonEliminarComentario);
        }

    }


}