package com.app.samplelogin.activity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.app.samplelogin.R;
import com.app.samplelogin.adapter.AddressListAdapter;
import com.app.samplelogin.adapter.DishAdapter;
import com.app.samplelogin.entity.Address;
import com.app.samplelogin.entity.Dish;
import com.app.samplelogin.entity.Orders;
import com.app.samplelogin.entity.Restaurant;
import com.app.samplelogin.entity.TinyDB;
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

public class AddressList_DetailsActivity extends AppCompatActivity
{

    RecyclerView addressRecycleView;

    Button btnAddAddress;

    List<Address> addressList;

    AddressListAdapter addressListAdapter;
    List<Dish> dishList;

    List<Orders> ordersList;

    int address_id;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_addresslist_details);

        addressRecycleView = findViewById(R.id.addressRecycleView);
        btnAddAddress = findViewById(R.id.btnAddAddress);


        addressList = new ArrayList<>();

        addressListAdapter = new AddressListAdapter(this,addressList);
        addressRecycleView.setAdapter(addressListAdapter);
        addressRecycleView.setLayoutManager(new GridLayoutManager(this,1));

        btnAddAddress.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent( AddressList_DetailsActivity.this, AddressActivity.class));
            }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        getUserAddresses();
    }

    private void getUserAddresses() {
        addressList.clear();
        String user_data = getSharedPreferences("foodApp", Context.MODE_PRIVATE).getString("user_data",null);
        Gson g = new Gson();
        User user = g.fromJson(user_data, User.class);

        Intent i = getIntent();
        dishList = (List<Dish>) i.getSerializableExtra("dish");
        ordersList = new ArrayList<>();


        RetrofitClient.getInstance().getApi().getAddress(user.getUser_id()).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {


                if(response.body().getAsJsonObject().get("status").getAsString().equals("success")){
                    JsonArray jsonArray = response.body().getAsJsonObject().get("data").getAsJsonArray();

                    for (JsonElement element :jsonArray) {
                        Address address = new Address();
                        address.setAddress_id(element.getAsJsonObject().get("address_id").getAsInt());
                        address.setUser_id(element.getAsJsonObject().get("user_id").getAsInt());
                        address.setState(element.getAsJsonObject().get("state").getAsString());
                        address.setCity(element.getAsJsonObject().get("city").getAsString());
                        address.setPin(element.getAsJsonObject().get("pin").getAsString());
                        addressList.add(address);

                    }
                    for(Dish dish:dishList)
                    {
                        Orders orders=new Orders();
                        orders.setUser_id(user.getUser_id());
                        orders.setDish_id(dish.getDish_id());
                        orders.setRestaurant_id(dish.getRestaurant_id());
                        orders.setTotal_amount(dish.getDish_qty()*dish.getDish_price());
                        ordersList.add(orders);
                    }
                    addressListAdapter.notifyDataSetChanged();
                }
                TinyDB tinyDB = new TinyDB(AddressList_DetailsActivity.this);
                tinyDB.putListObject("order",ordersList);
//                getSharedPreferences("foodApp",MODE_PRIVATE).edit().putString("order",ordersList.toString()).apply();
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                Toast.makeText(AddressList_DetailsActivity.this, "Something went wrong", Toast.LENGTH_SHORT).show();
            }
        });
    }
}