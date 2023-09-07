package com.app.samplelogin.entity;

import java.io.Serializable;

public class Delivery_Partner implements Serializable
{
    private int delivery_partner_id;
    private String delivery_partner_first_name;
    private String delivery_partner_last_name;
    private String status;
    private String city;
    private String pin;


    public Delivery_Partner() {
    }

    public Delivery_Partner(int delivery_partner_id, String delivery_partner_first_name, String delivery_partner_last_name, String status, String city, String pin) {
        this.delivery_partner_id = delivery_partner_id;
        this.delivery_partner_first_name = delivery_partner_first_name;
        this.delivery_partner_last_name = delivery_partner_last_name;
        this.status = status;
        this.city = city;
        this.pin = pin;
    }

    public int getDelivery_partner_id() {
        return delivery_partner_id;
    }

    public void setDelivery_partner_id(int delivery_partner_id) {
        this.delivery_partner_id = delivery_partner_id;
    }

    public String getDelivery_partner_first_name() {
        return delivery_partner_first_name;
    }

    public void setDelivery_partner_first_name(String delivery_partner_first_name) {
        this.delivery_partner_first_name = delivery_partner_first_name;
    }

    public String getDelivery_partner_last_name() {
        return delivery_partner_last_name;
    }

    public void setDelivery_partner_last_name(String delivery_partner_last_name) {
        this.delivery_partner_last_name = delivery_partner_last_name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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
}
