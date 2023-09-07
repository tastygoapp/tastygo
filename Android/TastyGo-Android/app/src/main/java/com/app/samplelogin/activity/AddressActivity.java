package com.app.samplelogin.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.app.samplelogin.R;
import com.app.samplelogin.entity.Address;
import com.app.samplelogin.entity.User;
import com.app.samplelogin.utils.RetrofitClient;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AddressActivity extends AppCompatActivity {

   EditText stateName,cityName,pinCode;

    Button btnAddress;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_address);

        stateName = findViewById(R.id.stateName);
        cityName = findViewById(R.id.cityName);
        pinCode = findViewById(R.id.pinCode);
        btnAddress = findViewById(R.id.btnAddress);

        btnAddress.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Address address = validateAddress();

                RetrofitClient.getInstance().getApi().addAddress(address).enqueue(new Callback<JsonObject>() {
                    @Override
                    public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                        if(response.body().get("status").getAsString().equals("success"))
                        {
                            Toast.makeText(AddressActivity.this, "Address added Successfully", Toast.LENGTH_SHORT).show();
                            startActivity(new Intent(AddressActivity.this, AddressList_DetailsActivity.class));
                        }
                    }
                    @Override
                    public void onFailure(Call<JsonObject> call, Throwable t) {
                        Toast.makeText(AddressActivity.this, "Something went wrong", Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });

    }

    private Address validateAddress() {

        String user_data = getSharedPreferences("foodApp", Context.MODE_PRIVATE).getString("user_data",null);
        Gson g = new Gson();
        User user = g.fromJson(user_data, User.class);

        String textStateName = stateName.getText().toString();
        String textCityName = cityName.getText().toString();
        String textPinCode = pinCode.getText().toString();

        if(textStateName.equals(""))
            Toast.makeText(AddressActivity.this, "State Name Can't be Empty", Toast.LENGTH_SHORT).show();
        else if(textCityName.equals(""))
            Toast.makeText(AddressActivity.this, "City Name Can't be Empty", Toast.LENGTH_SHORT).show();
        else if(textPinCode.equals(""))
            Toast.makeText(AddressActivity.this, "Pin code Can't be Empty", Toast.LENGTH_SHORT).show();
        else
        {
            Address address = new Address();
            address.setState(textStateName);
            address.setCity(textCityName);
            address.setPin(textPinCode);
            address.setUser_id(user.getUser_id());
            return address;
        }
        return null;
    }
}