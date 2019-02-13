package com.example.expofpapp.ViewModels;

import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.MutableLiveData;
import android.arch.lifecycle.ViewModel;

public class ComentarioViewModel extends ViewModel {

        private final MutableLiveData<String> idProyec = new MutableLiveData<String>();

        // Master > Detail (comunicación del dato)
        public void selectId(String id) {
            idProyec.setValue(id);
        }

        public LiveData<String> getSelectedId() {
            return idProyec;
        }


    }

