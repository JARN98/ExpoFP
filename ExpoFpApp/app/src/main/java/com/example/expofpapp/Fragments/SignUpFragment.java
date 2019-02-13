package com.example.expofpapp.Fragments;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.example.expofpapp.Generator.ServiceGenerator;
import com.example.expofpapp.Model.LoginResponse;
import com.example.expofpapp.R;
import com.example.expofpapp.Services.AuthService;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link SignUpFragment.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link SignUpFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class SignUpFragment extends Fragment {
    private static final int READ_REQUEST_CODE = 42;
    private EditText etEmail;
    private EditText etNombre;
    private EditText etPassword;
    private EditText etPasswordRep;
    private ImageView ivImagenPerfil;
    private Button btnSubirImagen;
    Uri uriSelected;
    private Button btnRegistro, btnRegistroaLogin;
    Context ctx;

    private OnFragmentInteractionListener mListener;

    public SignUpFragment() {
        // Required empty public constructor
    }

    // TODO: Rename and change types and number of parameters
    public static SignUpFragment newInstance() {
        SignUpFragment fragment = new SignUpFragment();
        Bundle args = new Bundle();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
        }

        /*ivImagenPerfil = getView().findViewById(R.id.imageViewPreImgPerfil);
        btnRegistro = getView().findViewById(R.id.buttonRegistrar);
        etEmail = getView().findViewById(R.id.editTextEmailRegistro);
        etPassword = getView().findViewById(R.id.editTextPasswordRegistro);
        etNombre = getView().findViewById(R.id.editTextNombreRegistro);




        btnSubirImagen = getView().findViewById(R.id.buttonSubirImagen);*/


    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_sign_up, container, false);
        etEmail = view.findViewById(R.id.editTextEmailRegistro);
        etNombre = view.findViewById(R.id.editTextNombreRegistro);
        etPassword = view.findViewById(R.id.editTextPasswordRegistro);
        etPasswordRep = view.findViewById(R.id.editTextPasswordRepeat);
        ivImagenPerfil = view.findViewById(R.id.imageViewPreImgPerfil);
        btnSubirImagen = view.findViewById(R.id.buttonSubirImagen);
        btnRegistro = view.findViewById(R.id.buttonRegistrar);
        btnRegistroaLogin = view.findViewById(R.id.buttonRegistroaLogin);

        btnSubirImagen.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                performFileSearch();
            }
        });

        btnRegistro.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                doRegister();
            }
        });

        btnRegistroaLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mListener.navegarLogin();
            }
        });




        return view;
    }

    public void doRegister(){
        if (uriSelected != null) {

            AuthService service = ServiceGenerator.createService(AuthService.class);
            ctx=getView().getContext();

            try {
                InputStream inputStream = ctx.getContentResolver().openInputStream(uriSelected);
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                BufferedInputStream bufferedInputStream = new BufferedInputStream(inputStream);
                int cantBytes;
                byte[] buffer = new byte[1024*4];

                while ((cantBytes = bufferedInputStream.read(buffer,0,1024*4)) != -1) {
                    baos.write(buffer,0,cantBytes);
                }


                RequestBody requestFile =
                        RequestBody.create(
                                MediaType.parse(ctx.getContentResolver().getType(uriSelected)), baos.toByteArray());


                MultipartBody.Part body =
                        MultipartBody.Part.createFormData("picture", "picture", requestFile);


                RequestBody email = RequestBody.create(MultipartBody.FORM, etEmail.getText().toString().trim());
                RequestBody password = RequestBody.create(MultipartBody.FORM, etPassword.getText().toString().trim());
                RequestBody nombre = RequestBody.create(MultipartBody.FORM, etNombre.getText().toString().trim());

                Call<LoginResponse> callRegister = service.doRegister(body, email, password, nombre);

                callRegister.enqueue(new Callback<LoginResponse>() {
                    @Override
                    public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                        if (response.isSuccessful()) {
                            Log.d("Uploaded", "Éxito");
                            Log.d("Uploaded", response.body().toString());
                        } else {
                            Log.e("Upload error", response.errorBody().toString());
                        }
                    }

                    @Override
                    public void onFailure(Call<LoginResponse> call, Throwable t) {
                        Log.e("Upload error", t.getMessage());
                    }
                });


            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }


        }
    }



    public void performFileSearch() {

        // ACTION_OPEN_DOCUMENT is the intent to choose a file via the system's file
        // browser.
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);

        // Filter to only show results that can be "opened", such as a
        // file (as opposed to a list of contacts or timezones)
        intent.addCategory(Intent.CATEGORY_OPENABLE);

        // Filter to show only images, using the image MIME data type.
        // If one wanted to search for ogg vorbis files, the type would be "audio/ogg".
        // To search for all documents available via installed storage providers,
        // it would be "*/*".
        intent.setType("image/*");

        startActivityForResult(intent, READ_REQUEST_CODE);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode,
                                 Intent resultData) {

        // The ACTION_OPEN_DOCUMENT intent was sent with the request code
        // READ_REQUEST_CODE. If the request code seen here doesn't match, it's the
        // response to some other intent, and the code below shouldn't run at all.

        if (requestCode == READ_REQUEST_CODE && resultCode == Activity.RESULT_OK) {
            // The document selected by the user won't be returned in the intent.
            // Instead, a URI to that document will be contained in the return intent
            // provided to this method as a parameter.
            // Pull that URI using resultData.getData().
            Uri uri = null;
            if (resultData != null) {
                uri = resultData.getData();
                Log.i("Filechooser URI", "Uri: " + uri.toString());
                //showImage(uri);
                Glide
                        .with(this)
                        .load(uri)
                        .into(ivImagenPerfil);
                uriSelected = uri;
                btnRegistro.setEnabled(true);
            }
        }
    }



    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnFragmentInteractionListener) {
            mListener = (OnFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    public interface OnFragmentInteractionListener {
        void navegarLogin();

    }
}
