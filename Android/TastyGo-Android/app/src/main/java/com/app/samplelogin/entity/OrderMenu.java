package com.app.samplelogin.entity;

public class OrderMenu
{
    private int order_menu_id;
    private int user_id;
    private int dish_id;
    private int qty_ordered;

    public OrderMenu() {
    }

    public OrderMenu(int user_id, int dish_id, int qty_ordered) {
        this.user_id = user_id;
        this.dish_id = dish_id;
        this.qty_ordered = qty_ordered;
    }

    public int getOrder_menu_id() {
        return order_menu_id;
    }

    public void setOrder_menu_id(int order_menu_id) {
        this.order_menu_id = order_menu_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getDish_id() {
        return dish_id;
    }

    public void setDish_id(int dish_id) {
        this.dish_id = dish_id;
    }

    public int getQty_ordered() {
        return qty_ordered;
    }

    public void setQty_ordered(int qty_ordered) {
        this.qty_ordered = qty_ordered;
    }

    @Override
    public String toString() {
        return "OrderMenu{" +
                "user_id=" + user_id +
                ", dish_id=" + dish_id +
                ", qty_ordered=" + qty_ordered +
                '}';
    }
}
