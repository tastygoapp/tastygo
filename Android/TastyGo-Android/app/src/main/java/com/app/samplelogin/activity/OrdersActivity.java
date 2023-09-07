package com.app.samplelogin.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.app.samplelogin.R;
import com.app.samplelogin.entity.Address;
import com.app.samplelogin.entity.Dish;
import com.app.samplelogin.entity.OrderMenu;
import com.app.samplelogin.entity.Orders;
import com.app.samplelogin.entity.Restaurant;
import com.app.samplelogin.entity.TinyDB;
import com.app.samplelogin.entity.User;
import com.app.samplelogin.fragments.Cart_fragment;
import com.app.samplelogin.utils.RetrofitClient;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class OrdersActivity extends AppCompatActivity {

    TextView textResName,textOrderId,textTotalAmount,textStatus,textDeliveryTime,textUserName,textUserMobile,textResType,textDateTime;
    Button btnPayment,btnCart;
    String DeliveryFirstname;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_orders);
        textResName = findViewById(R.id.textResName);
        textOrderId = findViewById(R.id.textOrderId);
        textStatus = findViewById(R.id.textStatus);
        textDateTime = findViewById(R.id.textDateTime);
        textTotalAmount = findViewById(R.id.textTotalAmount);
        textUserName= findViewById(R.id.textUserName);
        textUserMobile = findViewById(R.id.textUserMobile);
        textResType = findViewById(R.id.textResType);
        textDeliveryTime = findViewById(R.id.textDeliveryTime);



        btnPayment = findViewById(R.id.btnPayment);
        btnCart =findViewById(R.id.btnCart);
        ArrayList<Orders> ordersList = new ArrayList<>();
        TinyDB tinyDB = new TinyDB(OrdersActivity.this);
        ArrayList<Object> objectsList =  tinyDB.getListObject("order", Orders.class);

        Intent i = getIntent();
        Address address = (Address) i.getSerializableExtra("address");
        if (savedInstanceState == null) {
           // navigateToFragment(0); // Start with FragmentA
        }

        for(Object object:objectsList)
        {
            Orders orders = (Orders) object;
            ordersList.add(orders);
        }

       int user_id= address.getUser_id();
        Log.e("order", ""+user_id );


        RetrofitClient.getInstance().getApi().getOrder(user_id).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                if(response.body().getAsJsonObject().get("status").getAsString().equals("success"))
                {
                    JsonArray jsonArray = response.body().getAsJsonObject().get("data").getAsJsonArray();
                    for (JsonElement element :jsonArray)
                    {
                        Log.e("ele", ""+element);
                        textResName.setText("Restaurant : "+element.getAsJsonObject().get("restaurant_name").getAsString());
                        textOrderId.setText("Order ID: "+element.getAsJsonObject().get("order_id").getAsInt()+"");
                        textTotalAmount.setText("Total Amount: "+element.getAsJsonObject().get("total_amount").getAsInt()+"");
                        textStatus.setText("Status: "+element.getAsJsonObject().get("status").getAsString());
                        textDateTime.setText("Order Time "+element.getAsJsonObject().get("order_datetime").getAsString());
                        textUserName.setText(element.getAsJsonObject().get("user_name").getAsString());
                        textUserMobile.setText(element.getAsJsonObject().get("user_mobile").getAsString());
                        textResType.setText(element.getAsJsonObject().get("restaurant_type").getAsString());
                        textDateTime.setText("Delivery Time :");
                        DeliveryFirstname=element.getAsJsonObject().get("delivery_partner_first_name").getAsString();



                    }

                }

                }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });



        btnPayment.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                for(Orders orders:ordersList)
                {
                    orders.setUser_address_id(address.getAddress_id());
                    RetrofitClient.getInstance().getApi().addOrderDetails(orders).enqueue(new Callback<JsonObject>() {
                        @Override
                        public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {

                            RetrofitClient.getInstance().getApi().deleteOrderMenuDish(orders.getDish_id()).enqueue(new Callback<JsonObject>() {
                                @Override
                                public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                                    Toast.makeText(OrdersActivity.this, "Order Placed Successfully", Toast.LENGTH_SHORT).show();
                                }

                                @Override
                                public void onFailure(Call<JsonObject> call, Throwable t) {
                                    Toast.makeText(OrdersActivity.this, "Something went wrong", Toast.LENGTH_SHORT).show();
                                }
                            });
                        }
                        @Override
                        public void onFailure(Call<JsonObject> call, Throwable t) {
                            Toast.makeText(OrdersActivity.this, "Something went wrong", Toast.LENGTH_SHORT).show();
                        }
                    });
                }

                Intent intent = new Intent(OrdersActivity.this, Payment_MainActivity.class);
                intent.putExtra("deliveryPartner",DeliveryFirstname);
                startActivity(intent);

            }
        });


        btnCart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent=new Intent(OrdersActivity.this, MainActivity.class);
                startActivity(intent);

            }
        });



    }
}