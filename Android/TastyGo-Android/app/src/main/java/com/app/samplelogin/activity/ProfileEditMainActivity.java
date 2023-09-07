package com.app.samplelogin.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.app.samplelogin.R;
import com.app.samplelogin.entity.User;
import com.app.samplelogin.utils.RetrofitClient;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProfileEditMainActivity extends AppCompatActivity
{
    EditText editFirstName,editLastName,editUserName,editEmail,editMobile,editPassword;

    Button update,cancel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile_edit_main);

        editFirstName=findViewById(R.id.editFirstName);
        editLastName=findViewById(R.id.editLastName);
        editUserName=findViewById(R.id.editUserName);
        editEmail=findViewById(R.id.editEmail);
        editMobile=findViewById(R.id.editMobile);
        editPassword=findViewById(R.id.editPassword);
        update=findViewById(R.id.update);
        cancel=findViewById(R.id.cancel);



        update.setOnClickListener(new View.OnClickListener() {


            @Override
            public void onClick(View v) {
                User userEdit= editUser();

                String user_data =getSharedPreferences("foodApp", Context.MODE_PRIVATE).getString("user_data",null);
                Gson g = new Gson();
                User user = g.fromJson(user_data, User.class);

                Log.d("update", user.getUser_id()+"");
                Log.d("update", userEdit.toString()+"");

                RetrofitClient.getInstance().getApi().updateUser(user.getUser_id(),userEdit).enqueue(new Callback<JsonObject>() {
                    @Override
                    public void onResponse(Call<JsonObject> call, Response<JsonObject> response)
                    {
                        if(response.body().get("status").getAsString().equals("success"))
                        {
                            Toast.makeText(ProfileEditMainActivity.this, "User Updated Successfully", Toast.LENGTH_SHORT).show();

                        }


                    }

                    @Override
                    public void onFailure(Call<JsonObject> call, Throwable t) {

                    }
                });
            }
        });

        cancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });


    }

    private User editUser() {
        String firstName = editFirstName.getText().toString();
        String lastName = editLastName.getText().toString();
        String email = editEmail.getText().toString();
        String password = editPassword.getText().toString();
        String mobile = editMobile.getText().toString();
        String username = editUserName.getText().toString();

        if (firstName.equals(""))
            Toast.makeText(ProfileEditMainActivity.this, "First Name Can't be Empty", Toast.LENGTH_SHORT).show();
        else if (lastName.equals(""))
            Toast.makeText(ProfileEditMainActivity.this, "Last Name Can't be Empty", Toast.LENGTH_SHORT).show();
        else if (email.equals(""))
            Toast.makeText(ProfileEditMainActivity.this, "Email Can't be Empty", Toast.LENGTH_SHORT).show();
        else if (username.equals(""))
            Toast.makeText(ProfileEditMainActivity.this, "Username Can't be Empty", Toast.LENGTH_SHORT).show();
        else if (password.equals(""))
            Toast.makeText(ProfileEditMainActivity.this, "Password Can't be Empty", Toast.LENGTH_SHORT).show();
        else if (mobile.equals(""))
            Toast.makeText(ProfileEditMainActivity.this, "Mobile Can't be Empty", Toast.LENGTH_SHORT).show();
        else {
            User user = new User();
            user.setFirst_name(firstName);
            user.setLast_name(lastName);
            user.setUser_email(email);
            user.setUser_password(password);
            user.setUser_mobile(mobile);
            user.setUser_name(username);
            return user;

        }

        return  null;


    }
}