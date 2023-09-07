package com.app.samplelogin.fragments;

import android.content.Context;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.app.samplelogin.R;
import com.app.samplelogin.activity.MainActivity;
import com.app.samplelogin.adapter.RestaurantListAdapter;
import com.app.samplelogin.entity.Restaurant;
import com.app.samplelogin.entity.User;
import com.app.samplelogin.utils.API;
import com.app.samplelogin.utils.RetrofitClient;
import com.bumptech.glide.Glide;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class Account_fragment extends Fragment {


    ImageView imageView;
    TextView userName,userFirstName,userLastName,userEmail,userMobile;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_account_fragment, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        imageView = view.findViewById(R.id.profileImage);
        userName = view.findViewById(R.id.userName);
        userFirstName = view.findViewById(R.id.userFirstName);
        userLastName = view.findViewById(R.id.userLastName);
        userEmail = view.findViewById(R.id.userEmail);
        userMobile = view.findViewById(R.id.userMobile);
        String user_data = getContext().getSharedPreferences("foodApp", Context.MODE_PRIVATE).getString("user_data",null);
        Gson g = new Gson();
        User user = g.fromJson(user_data, User.class);
        Log.e("user_data", user.toString() );
        userName.setText(user.getUser_name());
        userFirstName.setText(user.getFirst_name());
        userLastName.setText(user.getLast_name());
        userEmail.setText(user.getUser_email());
        userMobile.setText(user.getUser_mobile());
        Log.e("profile", user.getImage());

     // Glide.with(getContext()).load(API.BASE_URL +"/"+"pro13.png").into(imageView);
        Glide.with(getContext()).load(API.BASE_URL+"/"+user.getImage()).into(imageView);
    }
}