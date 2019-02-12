package com.example.expofpapp;

import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.example.expofpapp.Adapters.ViewPagerAdapter;

public class ProyectoDetalladoActivity extends AppCompatActivity {

    ViewPager viewPager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_proyecto_detallado);

        viewPager = (ViewPager) findViewById(R.id.viewPager);

        ViewPagerAdapter viewPagerAdapter = new ViewPagerAdapter(this);
        viewPager.setAdapter(viewPagerAdapter);
    }
}
