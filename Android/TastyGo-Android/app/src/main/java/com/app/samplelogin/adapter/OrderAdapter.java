package com.app.samplelogin.adapter;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.app.samplelogin.R;
import com.app.samplelogin.entity.Dish;
import com.app.samplelogin.utils.API;
import com.bumptech.glide.Glide;

import java.util.List;

public class OrderAdapter extends RecyclerView.Adapter<OrderAdapter.MyViewHolder> {


    Context context;
    List<Dish> dishList;

    public OrderAdapter(Context context, List<Dish> dishList) {
        this.context = context;
        this.dishList = dishList;
    }


    @NonNull
    @Override
    public OrderAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.recyclerview_orders_list,null);
        return new OrderAdapter.MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull OrderAdapter.MyViewHolder holder, int position) {
        Dish dish = dishList.get(position);
        Log.e("data", dish.toString());
        holder.textName.setText(dish.getDish_name());
        holder.textType.setText(dish.getDish_type());
        holder.textPrice.setText(""+dish.getDish_price());
        Glide.with(context).load(API.BASE_URL +"/"+dish.getDish_image()).into(holder.image);
    }

    @Override
    public int getItemCount() {
        return dishList.size();
    }


    class MyViewHolder extends RecyclerView.ViewHolder{
        ImageView image;
        TextView textName,textType,textPrice,restaurantName;

        Button btnAdd;
        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            image = itemView.findViewById(R.id.dishImage);
            textName = itemView.findViewById(R.id.dishName);
            textType = itemView.findViewById(R.id.dishType);
            textPrice = itemView.findViewById(R.id.dishPrice);

        }

    }
}
