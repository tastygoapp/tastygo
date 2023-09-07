package com.app.samplelogin.utils;

import com.app.samplelogin.entity.Address;
import com.app.samplelogin.entity.OrderMenu;
import com.app.samplelogin.entity.Orders;
import com.app.samplelogin.entity.User;
import com.google.gson.JsonObject;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface API {


    String BASE_URL = "http://192.168.1.107:2000";

    @POST("/users/")
    Call<JsonObject> registerUser(@Body User user);

    @GET("/users/")
    Call<JsonObject> getAllUser();

    @POST("/users/login")
    Call<JsonObject> loginUser(@Body User user);

    @GET("/restaurants/")
    Call<JsonObject> getAllRestaurants();

    @GET("/dishes/restaurant/{id}")
    Call<JsonObject> getAllDish(@Path("id") int id);

    @GET("/dishes/user/{id}")
    Call<JsonObject> getUserDish(@Path("id") int id);

    @GET("/orders/{id}")
    Call<JsonObject> getUserOrders(@Path("id") int id);

    @POST("/order-menu-items")
    Call<JsonObject> addUserCartMenu(@Body OrderMenu orderMenu);

    @GET("/orders/{id}")
    Call<JsonObject> getOrderDetails(@Path("id")int id);
    @GET("/orders/details/{id}")
    Call<JsonObject>getOrder(@Path("id") int user_id);

    @POST("/orders/")
    Call<JsonObject> addOrderDetails(@Body Orders orders);

    @POST("/addresses/")
    Call<JsonObject> addAddress(@Body Address address);

    @GET("/addresses/{id}")
    Call<JsonObject> getAddress(@Path("id")int id);


    @GET("/order-menu-items/{id}")
    Call<JsonObject> getUserCartMenu(@Path("id") int id);

    @DELETE("/order-menu-items/{id}")
    Call<JsonObject> deleteDish(@Path("id")int id);

    @DELETE("/order-menu-items/{id}")
    Call<JsonObject> deleteOrderMenuDish(@Path("id")int id);


    @GET("/restaurants/{type}")
    Call<JsonObject>getSpecificRestaurants(@Path("type") String type);

    @PUT("/users/{id}")
    Call<JsonObject>updateUser(@Path("id") int id,@Body User user);
}
