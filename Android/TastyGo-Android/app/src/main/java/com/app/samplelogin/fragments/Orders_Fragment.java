package com.app.samplelogin.fragments;

import android.content.Context;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.app.samplelogin.R;
import com.app.samplelogin.activity.DishDetailsActivity;
import com.app.samplelogin.adapter.DishAdapter;
import com.app.samplelogin.adapter.OrderAdapter;
import com.app.samplelogin.entity.Dish;
import com.app.samplelogin.entity.Orders;
import com.app.samplelogin.entity.Restaurant;
import com.app.samplelogin.entity.User;
import com.app.samplelogin.utils.RetrofitClient;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class Orders_Fragment extends Fragment {

    RecyclerView recyclerView;

    OrderAdapter ordersAdapter;

    List<Dish> dishList;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_orders, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        recyclerView = view.findViewById(R.id.recyclerView);
        dishList = new ArrayList<>();
        ordersAdapter = new OrderAdapter(getContext(),dishList);
        recyclerView.setAdapter(ordersAdapter);
        recyclerView.setLayoutManager(new GridLayoutManager(getContext(),1));
        getAllDishes();
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

//        RetrofitClient.getInstance().getApi().getUserOrders(user.getUser_id()).enqueue(new Callback<JsonObject>() {
//            @Override
//            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
//
//                if(response.body().getAsJsonObject().get("status").getAsString().equals("success")){
//                    JsonArray jsonArray = response.body().getAsJsonObject().get("data").getAsJsonArray();
//                    Orders orders = new Orders();
//                    for (JsonElement element :jsonArray) {
//                        orders.setOrder_id(element.getAsJsonObject().get("order_id").getAsInt());
//                        orders.setDish_id(element.getAsJsonObject().get("dish_id").getAsInt());
//                        orders.setRestaurant_id(element.getAsJsonObject().get("restaurant_id").getAsInt());
//                        orders.setUser_address_id(element.getAsJsonObject().get("user_address_id").getAsInt());
//                        orders.setTotal_amount(element.getAsJsonObject().get("total_amount").getAsDouble());
//                        orders.setOrder_id(element.getAsJsonObject().get("user_id").getAsInt());
//
//
//
//                    }
//
//
//                }
//            }
//            @Override
//            public void onFailure(Call<JsonObject> call, Throwable t) {
//                Toast.makeText(getContext(), "Something went wrong", Toast.LENGTH_SHORT).show();
//            }
//        });
        RetrofitClient.getInstance().getApi().getUserDish(user.getUser_id()).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                if(response.body().getAsJsonObject().get("status").getAsString().equals("success")){
                    JsonArray jsonArray = response.body().getAsJsonObject().get("data").getAsJsonArray();
                    for (JsonElement element :jsonArray) {
                        Dish dish = new Dish();
                        dish.setDish_id(element.getAsJsonObject().get("dish_id").getAsInt());
                        dish.setDish_name(element.getAsJsonObject().get("dish_name").getAsString());
                        dish.setDish_type(element.getAsJsonObject().get("dish_type").getAsString());
                        dish.setDish_price(element.getAsJsonObject().get("dish_price").getAsDouble());
                        dish.setDish_image(element.getAsJsonObject().get("dish_image").getAsString());
                        dish.setRestaurant_id(element.getAsJsonObject().get("restaurant_id").getAsInt());
                        Log.e("dish", dish.getDish_id()+"" );
                        dishList.add(dish);
                    }
                }
                ordersAdapter.notifyDataSetChanged();
            }
            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                Toast.makeText(getContext(), "Something went wrong", Toast.LENGTH_SHORT).show();
            }
        });
    }



}