package com.app.samplelogin.entity;

import java.io.Serializable;

public class Dish implements Serializable
{
    private int dish_id;
    private int restaurant_id; // Foreign key reference
    private String dish_type;
    private String dish_name;
    private double dish_price;
    private String dish_image;

    private int dish_qty;

    public Dish() {
    }

    public Dish(String dish_type, String dish_name, double dish_price, String dish_image) {

        this.dish_type = dish_type;
        this.dish_name = dish_name;
        this.dish_price = dish_price;
        this.dish_image = dish_image;
    }

    public int getDish_qty() {
        return dish_qty;
    }

    public void setDish_qty(int dish_qty) {
        this.dish_qty = dish_qty;
    }

    public int getDish_id() {
        return dish_id;
    }

    public void setDish_id(int dish_id) {
        this.dish_id = dish_id;
    }

    public int getRestaurant_id() {
        return restaurant_id;
    }

    public void setRestaurant_id(int restaurant_id) {
        this.restaurant_id = restaurant_id;
    }

    public String getDish_type() {
        return dish_type;
    }

    public void setDish_type(String dish_type) {
        this.dish_type = dish_type;
    }

    public String getDish_name() {
        return dish_name;
    }

    public void setDish_name(String dish_name) {
        this.dish_name = dish_name;
    }

    public double getDish_price() {
        return dish_price;
    }

    public void setDish_price(double dish_price) {
        this.dish_price = dish_price;
    }

    public String getDish_image() {
        return dish_image;
    }

    public void setDish_image(String dish_image) {
        this.dish_image = dish_image;
    }

    @Override
    public String toString() {
        return "Dish{" +
                "dish_id=" + dish_id +
                ", restaurant_id=" + restaurant_id +
                ", dish_type='" + dish_type + '\'' +
                ", dish_name='" + dish_name + '\'' +
                ", dish_price=" + dish_price +
                ", dish_image='" + dish_image + '\'' +
                ", dish_qty=" + dish_qty +
                '}';
    }
}
