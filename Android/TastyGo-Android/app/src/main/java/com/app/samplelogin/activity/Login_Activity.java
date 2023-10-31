package com.app.samplelogin.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.app.samplelogin.R;
import com.app.samplelogin.entity.Restaurant;
import com.app.samplelogin.entity.User;
import com.app.samplelogin.utils.RetrofitClient;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Login_Activity extends AppCompatActivity {

    EditText editEmail,editPassword;
    Button login;
    TextView register;
    CheckBox checkBox;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        editEmail = findViewById(R.id.editEmail);
        editPassword = findViewById(R.id.editPassword);
        login = findViewById(R.id.login);
        register = findViewById(R.id.register);
        checkBox = findViewById(R.id.checkBox);

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String email = editEmail.getText().toString();
                String password = editPassword.getText().toString();

                User user = new User();
                user.setUser_email(email);
                user.setUser_password(password);


                if(email.equals(""))
                    Toast.makeText(Login_Activity.this, "Email Can't be Empty", Toast.LENGTH_SHORT).show();
                else if(password.equals(""))
                    Toast.makeText(Login_Activity.this, "Password Can't be Empty", Toast.LENGTH_SHORT).show();
                else
                {
                    if(checkBox.isChecked())
                    {
                        getSharedPreferences("foodApp",MODE_PRIVATE).edit().putBoolean("login_status",true).apply();

                    }

                    RetrofitClient.getInstance().getApi().loginUser(user).enqueue(new Callback<JsonObject>() {

                        @Override
                        public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {

                            JsonArray jsonArray = response.body().getAsJsonObject().get("data").getAsJsonArray();
                            if(jsonArray.size() != 0)
                            {
                                JsonObject jsonObject = jsonArray.get(0).getAsJsonObject();
                                getSharedPreferences("foodApp",MODE_PRIVATE).edit().putString("user_data",jsonObject.toString()).apply();
                                startActivity(new Intent(Login_Activity.this,MainActivity.class));
                                finish();
                            }
                            else {
                                Toast.makeText(Login_Activity.this, "Invalid Credentials", Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<JsonObject> call, Throwable t) {
                            Log.e("some", t.toString() );
			    Log.e("some", t.toString() );
                            Toast.makeText(Login_Activity.this, "Something went wrong", Toast.LENGTH_SHORT).show();
                        }
                    });
                }
            }
        });
        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(Login_Activity.this, Register_Activity.class));
            }
        });
    }
}