package Fragments;

import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;

import com.example.expofpapp.R;

/**
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link SignUpFragment.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link SignUpFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class SignUpFragment extends Fragment {
    private EditText etEmail;
    private EditText etNombre;
    private EditText etPassword;
    private EditText etPasswordRep;
    private ImageView ivImagenPerfil;
    private Button btnSubirImagen;
    private Button btnRegistro, btnRegistroaLogin;

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


        btnRegistroaLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });


        return view;
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
