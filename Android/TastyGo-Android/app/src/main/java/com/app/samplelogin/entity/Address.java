package com.app.samplelogin.entity;

import java.io.Serializable;

public class Address  implements Serializable
{
    private int address_id;
    private String state;
    private String city;
    private String pin;
    private int user_id; // Foreign key reference

    public Address() {
    }

    public Address(String state, String city, String pin, int user_id) {
        this.state = state;
        this.city = city;
        this.pin = pin;
        this.user_id = user_id;
    }

    public int getAddress_id() {
        return address_id;
    }

    public void setAddress_id(int address_id) {
        this.address_id = address_id;
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

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    @Override
    public String toString() {
        return "Address{" +
                "address_id=" + address_id +
                ", state='" + state + '\'' +
                ", city='" + city + '\'' +
                ", pin='" + pin + '\'' +
                ", user_id=" + user_id +
                '}';
    }
}
