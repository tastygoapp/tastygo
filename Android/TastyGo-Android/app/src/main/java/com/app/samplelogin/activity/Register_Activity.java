package com.app.samplelogin.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.app.samplelogin.R;
import com.app.samplelogin.entity.User;
import com.app.samplelogin.utils.RetrofitClient;
import com.google.gson.JsonObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Register_Activity extends AppCompatActivity {

    EditText editFirstName,editLastName,editEmail,editPassword,editConfirmPassword,editMobile,editUsername;
    Button register,cancel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        editFirstName = findViewById(R.id.editFirstName);
        editLastName = findViewById(R.id.editLastName);
        editEmail = findViewById(R.id.editEmail);
        editPassword = findViewById(R.id.editPassword);
        editConfirmPassword = findViewById(R.id.editConfirmPassword);
        editMobile = findViewById(R.id.editMobile);
        editUsername = findViewById(R.id.editUsername);
        register = findViewById(R.id.register);
        cancel = findViewById(R.id.cancel);

        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                User user = validateUser();
                if(user != null)
                {
                    RetrofitClient.getInstance().getApi().registerUser(user).enqueue(new Callback<JsonObject>() {
                        @Override
                        public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                            if(response.body().get("status").getAsString().equals("success"))
                            {
                                Toast.makeText(Register_Activity.this, "User Registered Successfully", Toast.LENGTH_SHORT).show();
                                startActivity(new Intent(Register_Activity.this, Login_Activity.class));
                            }
                        }
                        @Override
                        public void onFailure(Call<JsonObject> call, Throwable t) {
                            Toast.makeText(Register_Activity.this, "Something went wrong", Toast.LENGTH_SHORT).show();
                        }
                    });
                }
            }
        });

        cancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }

    private User validateUser() {

        String firstName = editFirstName.getText().toString();
        String lastName = editLastName.getText().toString();
        String email = editEmail.getText().toString();
        String password = editPassword.getText().toString();
        String confirmPassword = editConfirmPassword.getText().toString();
        String mobile = editMobile.getText().toString();
        String username = editUsername.getText().toString();

        if(firstName.equals(""))
            Toast.makeText(Register_Activity.this, "First Name Can't be Empty", Toast.LENGTH_SHORT).show();
        else if(lastName.equals(""))
            Toast.makeText(Register_Activity.this, "Last Name Can't be Empty", Toast.LENGTH_SHORT).show();
        else if(email.equals(""))
            Toast.makeText(Register_Activity.this, "Email Can't be Empty", Toast.LENGTH_SHORT).show();
        else if(username.equals(""))
            Toast.makeText(Register_Activity.this, "Username Can't be Empty", Toast.LENGTH_SHORT).show();
        else if(password.equals(""))
            Toast.makeText(Register_Activity.this, "Password Can't be Empty", Toast.LENGTH_SHORT).show();
        else if(confirmPassword.equals(""))
            Toast.makeText(Register_Activity.this, "Confirm Password Can't be Empty", Toast.LENGTH_SHORT).show();
        else if(mobile.equals(""))
            Toast.makeText(Register_Activity.this, "Mobile Can't be Empty", Toast.LENGTH_SHORT).show();
        else if(editPassword.getText().toString().equals(editConfirmPassword.getText().toString()))
        {
            User user = new User();
            user.setFirst_name(firstName);
            user.setLast_name(lastName);
            user.setUser_email(email);
            user.setUser_password(password);
            user.setUser_mobile(mobile);
            user.setUser_name(username);
            return user;
        }
        else {
            Toast.makeText(this, "Password and Confirm Password don't match", Toast.LENGTH_SHORT).show();
            return null;
        }
        return null;
    }
}