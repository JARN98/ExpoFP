package com.example.expofpapp.Adapters;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RadioButton;
import android.widget.TextView;

import com.example.expofpapp.Listener.EncuestaListener;
import com.example.expofpapp.Model.Pregunta;
import com.example.expofpapp.R;

import java.util.List;

public class MyEncuestaRecyclerViewAdapter extends RecyclerView.Adapter<MyEncuestaRecyclerViewAdapter.ViewHolder> {

    private final List<Pregunta> mValues;
    private final EncuestaListener mListener;
    private Context contexto;

    public MyEncuestaRecyclerViewAdapter(Context cxt, List<Pregunta> items, EncuestaListener listener) {
        contexto = cxt;
        mValues = items;
        mListener = listener;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_encuesta, parent, false);


        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.textView_pregunta.setText(mValues.get(position).getPregunta());
        holder.respuesta1.setText(mValues.get(position).getRespuestaA());
        holder.respuesta2.setText(mValues.get(position).getRespuestaB());
        holder.respuesta3.setText(mValues.get(position).getRespuestaC());

    }

    @Override
    public int getItemCount() {
        return 0;
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView textView_pregunta;
        public final RadioButton respuesta1, respuesta2, respuesta3;
        public Pregunta mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            textView_pregunta = view.findViewById(R.id.textView_pregunta);
            respuesta1 = view.findViewById(R.id.respuesta1);
            respuesta2 = view.findViewById(R.id.respuesta2);
            respuesta3 = view.findViewById(R.id.respuesta3);

        }
    }
}
