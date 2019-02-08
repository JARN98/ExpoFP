package com.example.expofpapp.Adapters;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.example.expofpapp.Listener.ProyectoResListener;
import com.example.expofpapp.MainActivity;
import com.example.expofpapp.Model.ProyectoRes;
import com.example.expofpapp.R;

import java.util.List;

public class MyProyectoResRecyclerViewAdapter extends RecyclerView.Adapter<MyProyectoResRecyclerViewAdapter.ViewHolder> {

    private final List<ProyectoRes> mValues;
    private final ProyectoResListener mListener;
    private Context contexto;

    public MyProyectoResRecyclerViewAdapter(Context cxt, List<ProyectoRes> items, ProyectoResListener listener) {
        contexto = cxt;
        mValues = items;
        mListener = listener;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_proyectores, parent, false);


        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.textView_titulo.setText(mValues.get(position).getNombre());
        holder.textView_curso.setText(mValues.get(position).getCurso());

        Glide
                .with(this.contexto)
                .load(holder.mItem.getImagen())
                .into(holder.imageView);

        holder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (null != mListener) {
                    // Notify the active callbacks interface (the activity, if the
                    // fragment is attached to one) that an item has been selected.
                    mListener.verProyecto(holder.mItem.getProyecto());
                }
            }
        });
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView textView_titulo, textView_curso;
        public final ImageView imageView;
        public ProyectoRes mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            textView_curso = view.findViewById(R.id.textView_curso);
            textView_titulo = view.findViewById(R.id.textView_titulo);
            imageView = view.findViewById(R.id.imageViewProyectoRes);

        }
    }
}
