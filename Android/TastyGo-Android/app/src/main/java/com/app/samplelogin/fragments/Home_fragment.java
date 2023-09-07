package com.app.samplelogin.fragments;

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
import android.widget.CompoundButton;
import android.widget.RadioButton;
//import android.widget.SearchView;
import androidx.appcompat.widget.SearchView;

import android.widget.RadioGroup;
import android.widget.Toast;


import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.app.samplelogin.R;
import com.app.samplelogin.adapter.RestaurantListAdapter;
import com.app.samplelogin.entity.Restaurant;
import com.app.samplelogin.utils.RetrofitClient;


import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Home_fragment extends Fragment {

    SearchView simpleSearchView;

    RecyclerView recyclerView;

    RestaurantListAdapter restaurantListAdapter;

    List<Restaurant> restaurantList;
   RadioButton radioNonVeg,radioVeg,radioAll;
   RadioGroup radioGroup;

    @Override
    public void onStart() {
        super.onStart();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_home_fragment, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState)
    {
        super.onViewCreated(view, savedInstanceState);
        recyclerView = view.findViewById(R.id.recyclerView);
        simpleSearchView = view.findViewById(R.id.simpleSearchView);
        simpleSearchView.clearFocus();

        radioGroup = (RadioGroup) view.findViewById(R.id.radio);

        radioVeg=view.findViewById(R.id.radioVeg);
        radioNonVeg=view.findViewById(R.id.radioNonVeg);
        radioAll=view.findViewById(R.id.radioAll);



        radioGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {

                if(checkedId==R.id.radioVeg)
                {
                    restaurantList.clear();

                    RetrofitClient.getInstance().getApi().getSpecificRestaurants("Veg").enqueue(new Callback<JsonObject>() {
                        @Override
                        public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                            if(response.body().getAsJsonObject().get("status").getAsString().equals("success")) {
                                JsonArray jsonArray = response.body().getAsJsonObject().get("data").getAsJsonArray();

                                Log.e("veg",""+jsonArray );

                                for (JsonElement element :jsonArray) {
                                    Restaurant restaurant = new Restaurant();
                                    restaurant.setRestaurant_id(element.getAsJsonObject().get("restaurant_id").getAsInt());
                                    restaurant.setRestaurant_name(element.getAsJsonObject().get("restaurant_name").getAsString());
                                    restaurant.setRestaurant_type(element.getAsJsonObject().get("restaurant_type").getAsString());
                                    restaurant.setImage(element.getAsJsonObject().get("image").getAsString());
                                    restaurantList.add(restaurant);
                                }
                                restaurantListAdapter.notifyDataSetChanged();
                            }



                        }

                        @Override
                        public void onFailure(Call<JsonObject> call, Throwable t) {

                        }
                    });


                    Toast.makeText(getContext(), "veg", Toast.LENGTH_SHORT).show();

                } else if (checkedId==R.id.radioNonVeg)
                {
                    restaurantList.clear();
                    RetrofitClient.getInstance().getApi().getSpecificRestaurants("Non Veg").enqueue(new Callback<JsonObject>() {
                        @Override
                        public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                            if(response.body().getAsJsonObject().get("status").getAsString().equals("success")) {
                                JsonArray jsonArray = response.body().getAsJsonObject().get("data").getAsJsonArray();

                                Log.e("veg",""+jsonArray );

                                for (JsonElement element :jsonArray) {
                                    Restaurant restaurant = new Restaurant();
                                    restaurant.setRestaurant_id(element.getAsJsonObject().get("restaurant_id").getAsInt());
                                    restaurant.setRestaurant_name(element.getAsJsonObject().get("restaurant_name").getAsString());
                                    restaurant.setRestaurant_type(element.getAsJsonObject().get("restaurant_type").getAsString());
                                    restaurant.setImage(element.getAsJsonObject().get("image").getAsString());
                                    restaurantList.add(restaurant);
                                }
                                restaurantListAdapter.notifyDataSetChanged();
                            }

                        }

                        @Override
                        public void onFailure(Call<JsonObject> call, Throwable t) {

                        }
                    });

                    Toast.makeText(getContext(), "non-veg", Toast.LENGTH_SHORT).show();

                }

                else if (checkedId==R.id.radioAll)
                {

                    restaurantList.clear();
                    getAllRestaurants();

                }

            }
        });


        simpleSearchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                 filterList(newText);
                return true;

            }

            private void filterList(String newText)
            {
                List<Restaurant> filterList = new ArrayList<>();

                for (Restaurant restaurant:restaurantList) {

                    Log.e("data", restaurant.toString());


                    if (restaurant.getRestaurant_name().toLowerCase().contains(newText.toLowerCase()))
                    {
                        filterList.add(restaurant);
                    }

                    if (filterList.isEmpty())
                    {
                        Toast.makeText(getContext(), "No Data Found", Toast.LENGTH_SHORT).show();
                    }
                    else
                    {
                        restaurantListAdapter.setFilteredList(filterList);

                    }
                }
            }
        });
        restaurantList = new ArrayList<>();
        restaurantListAdapter = new RestaurantListAdapter(getContext(),restaurantList);
        recyclerView.setAdapter(restaurantListAdapter);
        recyclerView.setLayoutManager(new GridLayoutManager(getContext(),1));
       getAllRestaurants();
    }

    @Override
    public void onResume() {

        restaurantListAdapter.notifyDataSetChanged();
        super.onResume();
    }

    public void getAllRestaurants()
    {

        RetrofitClient.getInstance().getApi().getAllRestaurants().enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                if(response.body().getAsJsonObject().get("status").getAsString().equals("success")){
                    JsonArray jsonArray = response.body().getAsJsonObject().get("data").getAsJsonArray();
                    for (JsonElement element :jsonArray) {
                        Restaurant restaurant = new Restaurant();
                        restaurant.setRestaurant_id(element.getAsJsonObject().get("restaurant_id").getAsInt());
                        restaurant.setRestaurant_name(element.getAsJsonObject().get("restaurant_name").getAsString());
                        restaurant.setRestaurant_type(element.getAsJsonObject().get("restaurant_type").getAsString());
                        restaurant.setImage(element.getAsJsonObject().get("image").getAsString());
                        restaurantList.add(restaurant);
                    }
                    restaurantListAdapter.notifyDataSetChanged();
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                Toast.makeText(getContext(), "Something went wrong", Toast.LENGTH_SHORT).show();
            }
        });
    }
}