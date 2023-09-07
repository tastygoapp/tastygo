package com.app.samplelogin.activity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.app.samplelogin.R;
import com.app.samplelogin.adapter.DishAdapter;
import com.app.samplelogin.adapter.RestaurantListAdapter;
import com.app.samplelogin.entity.Dish;
import com.app.samplelogin.entity.OrderMenu;
import com.app.samplelogin.entity.Restaurant;
import com.app.samplelogin.entity.User;
import com.app.samplelogin.utils.RetrofitClient;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DishDetailsActivity extends AppCompatActivity {

    RecyclerView recyclerView;

    DishAdapter dishAdapter;

    List<Dish> dishList;
    TextView restaurantName;

    Button btnCart;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dish_details);
        recyclerView = findViewById(R.id.recyclerView);
        btnCart = findViewById(R.id.btnCart);
        dishList = new ArrayList<>();
        dishAdapter = new DishAdapter(this,dishList);
        recyclerView.setAdapter(dishAdapter);
        recyclerView.setLayoutManager(new GridLayoutManager(this,1));
        restaurantName = findViewById(R.id.restaurantName);
        getAllDishes();


        String user_data = getSharedPreferences("foodApp", Context.MODE_PRIVATE).getString("user_data",null);
        Gson g = new Gson();
        User user = g.fromJson(user_data, User.class);


        btnCart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ArrayList<OrderMenu> orderMenus = new ArrayList<>();
                String cart = getSharedPreferences("foodApp",MODE_PRIVATE).getString("cart",null);

                try {

                    JSONObject cartJson = new JSONObject(cart);
                    Iterator<String> key=cartJson.keys();

                    while(key.hasNext())
                    {
                        OrderMenu orderMenu = new OrderMenu();
                        orderMenu.setUser_id(user.getUser_id());
                        String k = key.next();
                        orderMenu.setDish_id(Integer.parseInt(k));
                        int qty = cartJson.getInt(k);
                        orderMenu.setQty_ordered(qty);
                        orderMenus.add(orderMenu);
                    }
                } catch (JSONException e) {
                    throw new RuntimeException(e);
                }
                Log.e("OM", orderMenus.toString());

                for(OrderMenu Om:orderMenus)
                {
                    RetrofitClient.getInstance().getApi().addUserCartMenu(Om).enqueue(new Callback<JsonObject>() {
                        @Override
                        public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                            Toast.makeText(DishDetailsActivity.this, "Food Added in Cart", Toast.LENGTH_SHORT).show();
                        }

                        @Override
                        public void onFailure(Call<JsonObject> call, Throwable t) {
                            Toast.makeText(DishDetailsActivity.this, "Something Went Wrong", Toast.LENGTH_SHORT).show();
                        }
                    });
                }

            }
        });




    }

    private void getAllDishes() {

        Restaurant restaurant = (Restaurant) getIntent().getSerializableExtra("restaurant");
        RetrofitClient.getInstance().getApi().getAllDish(restaurant.getRestaurant_id()).enqueue(new Callback<JsonObject>() {
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
                        getSharedPreferences("foodApp",MODE_PRIVATE).edit().putString("restaurant_name",restaurant.getRestaurant_name()).apply();
                        restaurantName.setText(restaurant.getRestaurant_name());
                        dishList.add(dish);
                    }
                    dishAdapter.notifyDataSetChanged();
                }

            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                Toast.makeText(DishDetailsActivity.this, "Something went wrong", Toast.LENGTH_SHORT).show();
            }
        });
    }
}