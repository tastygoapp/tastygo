package com.app.samplelogin.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

public class Orders  implements Serializable
{
    private int order_id;
    private int user_id; // Foreign key reference
    private int restaurant_id; // Foreign key reference
    private int dish_id; // Foreign key reference
    private int user_address_id; // Foreign key reference
    private int delivery_partner_id; // Foreign key reference
    private int order_status_id; // Foreign key reference
    private LocalDateTime order_datetime;
    private double total_amount;

    public Orders() {
    }

    public Orders(int user_id, int restaurant_id, int dish_id, int user_address_id, int delivery_partner_id, int order_status_id, LocalDateTime order_datetime, double total_amount) {

        this.user_id = user_id;
        this.restaurant_id = restaurant_id;
        this.dish_id = dish_id;
        this.user_address_id = user_address_id;
        this.delivery_partner_id = delivery_partner_id;
        this.order_status_id = order_status_id;
        this.order_datetime = order_datetime;
        this.total_amount = total_amount;
    }

    public int getOrder_id() {
        return order_id;
    }

    public void setOrder_id(int order_id) {
        this.order_id = order_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getRestaurant_id() {
        return restaurant_id;
    }

    public void setRestaurant_id(int restaurant_id) {
        this.restaurant_id = restaurant_id;
    }

    public int getDish_id() {
        return dish_id;
    }

    public void setDish_id(int dish_id) {
        this.dish_id = dish_id;
    }

    public int getUser_address_id() {
        return user_address_id;
    }

    public void setUser_address_id(int user_address_id) {
        this.user_address_id = user_address_id;
    }

    public int getDelivery_partner_id() {
        return delivery_partner_id;
    }

    public void setDelivery_partner_id(int delivery_partner_id) {
        this.delivery_partner_id = delivery_partner_id;
    }

    public int getOrder_status_id() {
        return order_status_id;
    }

    public void setOrder_status_id(int order_status_id) {
        this.order_status_id = order_status_id;
    }

    public LocalDateTime getOrder_datetime() {
        return order_datetime;
    }

    public void setOrder_datetime(LocalDateTime order_datetime) {
        this.order_datetime = order_datetime;
    }

    public double getTotal_amount() {
        return total_amount;
    }

    public void setTotal_amount(double total_amount) {
        this.total_amount = total_amount;
    }

    @Override
    public String toString() {
        return "Orders{" +
                "order_id=" + order_id +
                ", user_id=" + user_id +
                ", restaurant_id=" + restaurant_id +
                ", dish_id=" + dish_id +
                ", user_address_id=" + user_address_id +
                ", delivery_partner_id=" + delivery_partner_id +
                ", order_status_id=" + order_status_id +
                ", order_datetime=" + order_datetime +
                ", total_amount=" + total_amount +
                '}';
    }
}
