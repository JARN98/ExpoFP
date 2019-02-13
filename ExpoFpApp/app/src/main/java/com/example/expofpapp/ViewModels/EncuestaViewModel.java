package com.example.expofpapp.ViewModels;

import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.MutableLiveData;
import android.arch.lifecycle.ViewModel;

import com.example.expofpapp.Model.Pregunta;

import java.util.List;

public class EncuestaViewModel extends ViewModel {
    public final MutableLiveData<List<Pregunta>> listaPreguntas = new MutableLiveData<>();

    /**
     * Este método lo utilizo para meter la lista de respuestas de la encuesta
     * en el view model y poder utilizarlo en otro fragmento o Activity, aún no lo sé.
     *
     * @param lista
     */
    public void select(List<Pregunta> lista) {

        sobrescribirPreguntaSiEsLaMisma(lista);
        listaPreguntas.setValue(lista);
    }

    /**
     * Este método es el que utilizamos para coger la lista de respuestas
     * que previamente hemos metido.
     *
     * @return
     */
    public LiveData<List<Pregunta>> selected() {
        return listaPreguntas;
    }


    public List<Pregunta> sobrescribirPreguntaSiEsLaMisma(List<Pregunta> lista) {
        for (int i = 0; i < lista.size(); i++) {
            Pregunta elemento = lista.get(i);
            for (int j = 0; j < lista.size(); j++) {
                if (lista.get(j).getId().equals(elemento.getId()) && i != j) {

                    elemento = lista.get(j);

                    lista.remove(j);
                }
            }
        }

        return lista;
    }

    @Override
    public String toString() {
        return "EncuestaViewModel{" +
                "listaPreguntas=" + listaPreguntas +
                '}';
    }
}
