package com.example.expofpapp.ViewModels;

import android.app.Application;
import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.MutableLiveData;
import android.arch.lifecycle.ViewModel;

import com.example.expofpapp.Model.Comentario;

import java.util.List;

public class ComentarioViewModel extends ViewModel {

        private final MutableLiveData<String> idProyec = new MutableLiveData<>();
        private final MutableLiveData<List<Comentario>> listaComentarios = new MutableLiveData<>();

/*
    public ComentarioViewModel(Application application) {
        super(application);
        idProyec  = new MutableLiveData<>();
        listaComentarios = new MutableLiveData<>();
    }*/
    // Master > Detail (comunicación del dato)
        public void selectId(String id) {
            idProyec.setValue(id);
        }

        public LiveData<String> getSelectedId() {
            return idProyec;
        }

        public LiveData<List<Comentario>> eliminarComentario(String autor, String id) {


        return listaComentarios;
    }


    }

