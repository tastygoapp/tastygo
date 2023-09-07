package com.app.samplelogin.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.app.samplelogin.R;
import com.app.samplelogin.entity.Dish;
import com.app.samplelogin.entity.Orders;
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

public class Payment_MainActivity extends AppCompatActivity
{
    TextView resName,deliveryName,orderAddress,orderStatus,orderTime,deliveryTime,totalAmount;
    ListView listDish;
    String deliveryname;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_payment_main);

        resName = findViewById(R.id.resName);
        deliveryName = findViewById(R.id.deliveryName);
        orderAddress = findViewById(R.id.orderAddress);
        orderStatus = findViewById(R.id.orderStatus);
        orderTime = findViewById(R.id.orderTime);
        deliveryTime = findViewById(R.id.deliveryTime);
        totalAmount = findViewById(R.id.totalAmount);
        listDish = findViewById(R.id.listDish);

         deliveryname=getIntent().getStringExtra("deliveryPartner");
        Log.e("partner", deliveryname );
        startActivity(new Intent(this, MainActivity.class));
        Toast.makeText(this, "Payment Successful "+" Delivery partner allocated :"+deliveryname, Toast.LENGTH_SHORT).show();

    }
}