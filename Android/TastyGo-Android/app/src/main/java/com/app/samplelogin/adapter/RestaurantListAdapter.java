package com.app.samplelogin.adapter;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.app.samplelogin.R;
import com.app.samplelogin.activity.DishDetailsActivity;
import com.app.samplelogin.entity.Restaurant;
import com.app.samplelogin.utils.API;
import com.bumptech.glide.Glide;

import java.util.List;

public class RestaurantListAdapter extends RecyclerView.Adapter<RestaurantListAdapter.MyViewHolder> {

    Context context;
    List<Restaurant> restaurantList;

    public RestaurantListAdapter(Context context, List<Restaurant> restaurantList) {
        this.context = context;
        this.restaurantList = restaurantList;
    }

    public  void setFilteredList(List<Restaurant> filteredList)
    {

        this.restaurantList=filteredList;
        notifyDataSetChanged();

    }


    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.recyclerview_restaurant_list,null);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
            Restaurant restaurant = restaurantList.get(position);
            holder.textName.setText(restaurant.getRestaurant_name());
            holder.textType.setText(restaurant.getRestaurant_type());
            Glide.with(context).load(API.BASE_URL +"/"+restaurant.getImage()).into(holder.image);
    }

    @Override
    public int getItemCount() {
        return restaurantList.size();
    }


    class MyViewHolder extends RecyclerView.ViewHolder{
        ImageView image;
        TextView textName,textType;
        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            image = itemView.findViewById(R.id.image);
            textName = itemView.findViewById(R.id.restaurantName);
            textType = itemView.findViewById(R.id.restaurantType);

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(context, DishDetailsActivity.class);
                    intent.putExtra("restaurant",restaurantList.get(getAdapterPosition()));
                    context.startActivity(intent);
                }
            });
        }
    }
}
