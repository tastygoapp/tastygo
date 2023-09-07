package com.app.samplelogin.fragments;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Parcelable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.app.samplelogin.R;
import com.app.samplelogin.activity.AddressList_DetailsActivity;
import com.app.samplelogin.activity.OrdersActivity;
import com.app.samplelogin.adapter.CartAdapter;
import com.app.samplelogin.entity.Dish;
import com.app.samplelogin.entity.User;
import com.app.samplelogin.utils.RetrofitClient;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class Cart_fragment extends Fragment {

    RecyclerView recyclerView;

    CartAdapter cartAdapter;

    List<Dish> dishList;

    TextView totalPrice;

    Button btnBuy;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_cart_fragment, container, false);
    }



    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        recyclerView = view.findViewById(R.id.recyclerView);
        btnBuy = view.findViewById(R.id.btnBuy);
        totalPrice = view.findViewById(R.id.totalPrice);
        dishList = new ArrayList<>();
        cartAdapter = new CartAdapter(getContext(),dishList);
        recyclerView.setAdapter(cartAdapter);

        recyclerView.setLayoutManager(new GridLayoutManager(getContext(),1));

        btnBuy.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getContext(), AddressList_DetailsActivity.class);
                intent.putExtra("dish",(Serializable)dishList);
                startActivity(intent);
//                Bundle bundle = new Bundle();
//                bundle.putParcelableArrayList("mylist", (ArrayList<? extends Dish>) dishList);
//                intent.putExtras(bundle);
//                startActivity(intent);
            }
        });

    }

    @Override
    public void onResume() {
        super.onResume();
        getAllDishes();
    }

    private void getAllDishes() {
        dishList.clear();
        String user_data = getContext().getSharedPreferences("foodApp", Context.MODE_PRIVATE).getString("user_data",null);
        Gson g = new Gson();
        User user = g.fromJson(user_data, User.class);

        RetrofitClient.getInstance().getApi().getUserCartMenu(user.getUser_id()).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                if(response.body().getAsJsonObject().get("status").getAsString().equals("success")){
                    Log.e("viewCart", "onViewCreated: " );
                    JsonArray jsonArray = response.body().getAsJsonObject().get("data").getAsJsonArray();
                    for (JsonElement element :jsonArray) {
                        Dish dish = new Dish();
                        dish.setDish_id(element.getAsJsonObject().get("dish_id").getAsInt());
                        dish.setDish_name(element.getAsJsonObject().get("dish_name").getAsString());
                        dish.setDish_type(element.getAsJsonObject().get("dish_type").getAsString());
                        dish.setDish_price(element.getAsJsonObject().get("dish_price").getAsDouble());
                        dish.setDish_image(element.getAsJsonObject().get("dish_image").getAsString());
                        dish.setRestaurant_id(element.getAsJsonObject().get("restaurant_id").getAsInt());
                        dish.setDish_qty(element.getAsJsonObject().get("qty_ordered").getAsInt());
                        dishList.add(dish);
                    }
                    float tp = getContext().getSharedPreferences("foodApp",Context.MODE_PRIVATE).getFloat("totalPrice",0.0f);
                    totalPrice.setText("Total Price = ₹ "+tp);
                }
                cartAdapter.notifyDataSetChanged();

            }
            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                Toast.makeText(getContext(), "Something went wrong", Toast.LENGTH_SHORT).show();
            }
        });
    }
}