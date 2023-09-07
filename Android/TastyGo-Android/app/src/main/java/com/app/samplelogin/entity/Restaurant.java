package com.app.samplelogin.entity;

import java.io.Serializable;

public class Restaurant implements Serializable {
    private int restaurant_id;
    private String restaurant_name;
    private String  restaurant_type;
    private String state;
    private  String city;
    private String pin;

    private String image;


    public int getRestaurant_id() {
        return restaurant_id;
    }

    public void setRestaurant_id(int restaurant_id) {
        this.restaurant_id = restaurant_id;
    }

    public String getRestaurant_name() {
        return restaurant_name;
    }

    public void setRestaurant_name(String restaurant_name) {
        this.restaurant_name = restaurant_name;
    }

    public String getRestaurant_type() {
        return restaurant_type;
    }

    public void setRestaurant_type(String restaurant_type) {
        this.restaurant_type = restaurant_type;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }


    public Restaurant() {
    }

    public Restaurant(String restaurant_name, String restaurant_type, String state, String city, String pin) {
        this.restaurant_name = restaurant_name;
        this.restaurant_type = restaurant_type;
        this.state = state;
        this.city = city;
        this.pin = pin;
    }

    @Override
    public String toString() {
        return "Restaurant{" +
                "restaurant_id=" + restaurant_id +
                ", restaurant_name='" + restaurant_name + '\'' +
                ", restaurant_type='" + restaurant_type + '\'' +
                ", state='" + state + '\'' +
                ", city='" + city + '\'' +
                ", pin='" + pin + '\'' +
                ", image='" + image + '\'' +
                '}';
    }
}
