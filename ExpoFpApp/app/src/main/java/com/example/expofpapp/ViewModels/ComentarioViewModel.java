package com.example.expofpapp.ViewModels;

import android.app.Application;
import android.arch.lifecycle.AndroidViewModel;
import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.MutableLiveData;
import android.arch.lifecycle.ViewModel;
import android.support.annotation.NonNull;

import com.example.expofpapp.Model.Comentario;

import java.util.List;

public class ComentarioViewModel extends ViewModel {

    private final MutableLiveData<String> idProyec = new MutableLiveData<>();
    private final MutableLiveData<String> idComentario = new MutableLiveData<>();
    private final MutableLiveData<List<Comentario>> listaComentarios = new MutableLiveData<>();

    /*
        public ComentarioViewModel(Application application) {
            super(application);
            idProyec  = new MutableLiveData<>();
            listaComentarios = new MutableLiveData<>();
        }*/
    // Master > Detail (comunicación del dato)
    public void selectIdProyec(String id) {
        idProyec.setValue(id);
    }
    public void selectIdComentario(String id) { idComentario.setValue(id);}

    public void selectComentarioList(List<Comentario> comentarios) {
        listaComentarios.setValue(comentarios);
    }

    public MutableLiveData<String> getSelectedIdProyec() {
        return idProyec;
    }

    public MutableLiveData<String> getSelectedIdComentario() {
        return idComentario;
    }


    public MutableLiveData<List<Comentario>> getAll() { return listaComentarios; }




}