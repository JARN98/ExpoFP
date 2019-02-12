package com.example.expofpapp.ViewModels;

import android.arch.lifecycle.MutableLiveData;
import android.arch.lifecycle.ViewModel;

import com.example.expofpapp.Model.Pregunta;

import java.util.List;

public class EncuestaViewModel extends ViewModel {
    public final MutableLiveData<List<Pregunta>> listaPreguntas = new MutableLiveData<>();


    public void select(List<Pregunta> lista) {
        listaPreguntas.setValue(lista);
    }
}
