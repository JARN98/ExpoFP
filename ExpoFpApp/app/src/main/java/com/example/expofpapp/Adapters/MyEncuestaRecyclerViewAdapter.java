package com.example.expofpapp.Adapters;

import android.arch.lifecycle.ViewModelProvider;
import android.arch.lifecycle.ViewModelProviders;
import android.content.Context;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.FragmentActivity;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.example.expofpapp.Fragments.EncuestaFragment;
import com.example.expofpapp.Listener.EncuestaListener;
import com.example.expofpapp.MainActivity;
import com.example.expofpapp.Model.Pregunta;
import com.example.expofpapp.R;
import com.example.expofpapp.ViewModels.EncuestaViewModel;

import java.util.ArrayList;
import java.util.List;

import static android.support.constraint.Constraints.TAG;

public class MyEncuestaRecyclerViewAdapter extends RecyclerView.Adapter<MyEncuestaRecyclerViewAdapter.ViewHolder> {

    private final List<Pregunta> mValues;
    private final EncuestaListener mListener;
    private Context contexto;
    final List<Pregunta> listaPregunta = new ArrayList<>();

    public MyEncuestaRecyclerViewAdapter(Context cxt, List<Pregunta> items, EncuestaListener listener) {
        contexto = cxt;
        mValues = items;
        mListener = listener;
    }

    @Override
    public ViewHolder onCreateViewHolder(final ViewGroup parent, int viewType) {
        final View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.list_preguntas_encuesta, parent, false);


        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, final int position) {
        holder.mItem = mValues.get(position);
        final Pregunta nuevoItem = mValues.get(position);
        final int numeroA = nuevoItem.getnA();
        final int numeroB = nuevoItem.getnB();
        final int numeroC = nuevoItem.getnC();
        holder.textView_pregunta.setText(mValues.get(position).getPregunta());
        holder.respuesta1.setText(mValues.get(position).getRespuestaA());
        holder.respuesta2.setText(mValues.get(position).getRespuestaB());
        holder.respuesta3.setText(mValues.get(position).getRespuestaC());

        holder.radioGroup_respuestas.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {
                switch (checkedId) {
                    case R.id.respuesta1:
                        holder.mItem.setnA(numeroA + 1);
                        holder.mItem.setnB(numeroB);
                        holder.mItem.setnC(numeroC);
                        break;
                    case R.id.respuesta2:
                        holder.mItem.setnA(numeroA);
                        holder.mItem.setnB(numeroB + 1);
                        holder.mItem.setnC(numeroC);
                        break;
                    case R.id.respuesta3:
                        holder.mItem.setnA(numeroA);
                        holder.mItem.setnB(numeroB);
                        holder.mItem.setnC(numeroC + 1);
                        break;

                }
                listaPregunta.add(holder.mItem);
                Log.e(TAG, "onCheckedChanged: "+ listaPregunta.get(0).getId().toString() );
                EncuestaViewModel encuestaViewModel = ViewModelProviders.of((FragmentActivity) contexto).get(EncuestaViewModel.class);
                encuestaViewModel.select(listaPregunta);
            }
        });

    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView textView_pregunta;
        public final RadioGroup radioGroup_respuestas;
        public final RadioButton respuesta1, respuesta2, respuesta3;
        public final FloatingActionButton fab;
        public Pregunta mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            textView_pregunta = view.findViewById(R.id.textView_pregunta);
            respuesta1 = view.findViewById(R.id.respuesta1);
            respuesta2 = view.findViewById(R.id.respuesta2);
            respuesta3 = view.findViewById(R.id.respuesta3);
            fab = view.findViewById(R.id.fab);
            radioGroup_respuestas = view.findViewById(R.id.radioGroup_respuestas);

        }
    }
}
