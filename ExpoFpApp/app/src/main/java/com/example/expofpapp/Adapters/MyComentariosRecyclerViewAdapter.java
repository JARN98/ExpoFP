package com.example.expofpapp.Adapters;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

import com.bumptech.glide.Glide;

import com.example.expofpapp.Fragments.VerComentariosFragment.OnListFragmentInteractionListener;

import com.example.expofpapp.Model.Comentario;
import com.example.expofpapp.R;


import java.util.List;

public class MyComentariosRecyclerViewAdapter extends RecyclerView.Adapter<MyComentariosRecyclerViewAdapter.ViewHolder> {

    private final List<Comentario> mValues;
    private final OnListFragmentInteractionListener mListener;
    private final Context ctx;


    public MyComentariosRecyclerViewAdapter(Context cxt, List<Comentario> items, OnListFragmentInteractionListener listener) {
        ctx = cxt;
        mValues = items;
        mListener = listener;
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

    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public Comentario mItem;
        public final TextView autor;
        public final TextView contenido;
        public final ImageView imagen;
        public final RatingBar valoracion;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            autor = view.findViewById(R.id.textViewAutorComentario);
            imagen = view.findViewById(R.id.imageViewImgUserComentario);
            contenido = view.findViewById(R.id.textViewContenidoComentario);
            valoracion = view.findViewById(R.id.ratingBarValoracionComentario);

        }

    }
}
