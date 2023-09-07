package com.app.samplelogin.entity;


import java.io.Serializable;

public class User implements Serializable {

    private int user_id;

    private String first_name;
    private String last_name;

    private String user_name;
    private String user_email;
    private String user_mobile;
    private String user_password;

    private String image;


    public User() {
    }

    public User(String first_name, String last_name, String user_name, String user_email, String user_password, String user_mobile) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.user_name = user_name;
        this.user_email = user_email;
        this.user_password = user_password;
        this.user_mobile = user_mobile;
    }

    public User(String first_name, String last_name, String user_email, String user_mobile) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.user_email = user_email;
        this.user_mobile = user_mobile;
    }


    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getUser_email() {
        return user_email;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public String getUser_mobile() {
        return user_mobile;
    }

    public void setUser_mobile(String user_mobile) {
        this.user_mobile = user_mobile;
    }

    public String getUser_password() {
        return user_password;
    }

    public void setUser_password(String user_password) {
        this.user_password = user_password;
    }

    @Override
    public String toString() {
        return "User{" +
                "first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", user_name='" + user_name + '\'' +
                ", user_email='" + user_email + '\'' +
                ", user_mobile='" + user_mobile + '\'' +
                ", user_password='" + user_password + '\'' +
                ", image='" + image + '\'' +
                '}';
    }
}

