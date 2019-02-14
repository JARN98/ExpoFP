package com.example.expofpapp.Adapters;

import android.content.Context;
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

import com.example.expofpapp.Fragments.VerComentariosFragment.OnListFragmentInteractionListener;

import com.example.expofpapp.Generator.ServiceGenerator;
import com.example.expofpapp.Generator.TipoAutenticacion;
import com.example.expofpapp.Generator.UtilToken;
import com.example.expofpapp.Generator.UtilUser;
import com.example.expofpapp.Model.Comentario;
import com.example.expofpapp.R;
import com.example.expofpapp.Services.ComentarioService;


import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

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

        if(holder.mItem.getAutor().equalsIgnoreCase(UtilUser.getId(ctx)))
            holder.btnEliminar.setVisibility(View.VISIBLE);

        holder.btnEliminar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                deleteComentario(holder.mItem.getId());

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

    public void deleteComentario(String id){
        ComentarioService service = ServiceGenerator.createService(ComentarioService.class, UtilToken.getToken(ctx), TipoAutenticacion.JWT );
        Call<ResponseBody> call = service.deleteComentaio(UtilUser.getId(ctx),id);

        call.enqueue(new Callback<ResponseBody>() {

            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                if (response.code() != 200) {
                    Toast.makeText(ctx, "Error en petición", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Log.e("NetworkFailure", t.getMessage());
                Toast.makeText(ctx, "Error de conexión", Toast.LENGTH_SHORT).show();

            }
        });
    }
}
