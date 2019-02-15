package com.example.expofpapp.Dialog;

import android.app.AlertDialog;
import android.app.Dialog;
import android.arch.lifecycle.MutableLiveData;
import android.arch.lifecycle.Observer;
import android.arch.lifecycle.ViewModelProviders;
import android.content.Context;
import android.content.DialogInterface;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.DialogFragment;
import android.support.v4.app.FragmentActivity;
import android.util.Log;
import android.widget.Toast;

import com.example.expofpapp.Adapters.MyComentariosRecyclerViewAdapter;
import com.example.expofpapp.Generator.ServiceGenerator;
import com.example.expofpapp.Generator.TipoAutenticacion;
import com.example.expofpapp.Generator.UtilToken;
import com.example.expofpapp.Generator.UtilUser;
import com.example.expofpapp.Model.Comentario;
import com.example.expofpapp.Services.ComentarioService;
import com.example.expofpapp.ViewModels.ComentarioViewModel;

import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class EliminarComentarioDialogFragment extends DialogFragment {

    public static EliminarComentarioDialogFragment newInstance() {
        return new EliminarComentarioDialogFragment();
    }


    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        // Use the Builder class for convenient dialog construction
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());

        builder.setTitle("¿Desea eliminar el comentario?");
        builder.setPositiveButton("Eliminar", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                ComentarioViewModel mViewModel = ViewModelProviders.of(getActivity()).get(ComentarioViewModel.class);
                String idComentarioBorrar = mViewModel.getSelectedIdComentario().getValue();

                deleteComentario(idComentarioBorrar, getActivity());

            }
        })
                .setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.dismiss();
                    }
                });

        return builder.create();
    }

    public void deleteComentario(String id, final Context ctx){
        ComentarioService service = ServiceGenerator.createService(ComentarioService.class, UtilToken.getToken(getActivity()), TipoAutenticacion.JWT );
        Call<ResponseBody> call = service.deleteComentaio(UtilUser.getId(getActivity()),id);

        call.enqueue(new Callback<ResponseBody>() {

            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                if (response.code() != 204) {
                    Toast.makeText(ctx, "Error en petición", Toast.LENGTH_SHORT).show();
                }
                ComentarioViewModel mViewModel = ViewModelProviders.of((FragmentActivity) ctx).get(ComentarioViewModel.class);
                String idProyecto = mViewModel.getSelectedIdProyec().getValue();
                getComentarios(idProyecto, ctx);
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                Log.e("NetworkFailure", t.getMessage());
                Toast.makeText(ctx, "Error de conexión", Toast.LENGTH_SHORT).show();

            }
        });
    }
    public void getComentarios(String idProyec, final Context ctx) {
        ComentarioService service = ServiceGenerator.createService(ComentarioService.class, UtilToken.getToken(ctx), TipoAutenticacion.JWT);
        Call<List<Comentario>> call = service.getComentariosProyecto(idProyec);

        call.enqueue(new Callback<List<Comentario>>() {

            @Override
            public void onResponse(Call<List<Comentario>> call, Response<List<Comentario>> response) {
                if (response.code() != 200) {
                    Toast.makeText(ctx, "Error en petición", Toast.LENGTH_SHORT).show();
                } else {
                    ComentarioViewModel mViewModel = ViewModelProviders.of((FragmentActivity) ctx).get(ComentarioViewModel.class);
                    mViewModel.selectComentarioList(response.body());

                }
            }

            @Override
            public void onFailure(Call<List<Comentario>> call, Throwable t) {
                Log.e("NetworkFailure", t.getMessage());
                Toast.makeText(ctx, "Error de conexión", Toast.LENGTH_SHORT).show();

            }

        });
    }


}