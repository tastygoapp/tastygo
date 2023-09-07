package com.app.samplelogin.adapter;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.NumberPicker;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.app.samplelogin.R;
import com.app.samplelogin.entity.Dish;
import com.app.samplelogin.entity.OrderMenu;
import com.app.samplelogin.entity.User;
import com.app.samplelogin.utils.API;
import com.bumptech.glide.Glide;
import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DishAdapter extends RecyclerView.Adapter<DishAdapter.MyViewHolder> {

    Context context;
    List<Dish> dishList;
//    Map<Integer,String> cartMap=new HashMap<Integer,String>();

    JSONObject cartMap = new JSONObject();

    public DishAdapter(Context context, List<Dish> dishList) {
        this.context = context;
        this.dishList = dishList;
    }


    @NonNull
    @Override
    public DishAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.recyclerview_dish_list,null);
        return new DishAdapter.MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull DishAdapter.MyViewHolder holder, int position) {
        Dish dish = dishList.get(position);
        Log.e("data", dish.toString());
        holder.textName.setText(dish.getDish_name());
        holder.textType.setText(dish.getDish_type());
        holder.textPrice.setText(""+dish.getDish_price());
        Glide.with(context).load(API.BASE_URL +"/"+dish.getDish_image()).into(holder.image);
        Log.e("dish", dish.toString());

        String user_data = context.getSharedPreferences("foodApp", Context.MODE_PRIVATE).getString("user_data",null);
        Gson g = new Gson();
        User user = g.fromJson(user_data, User.class);

        OrderMenu orderMenu = new OrderMenu();
        orderMenu.setDish_id(dish.getDish_id());
        orderMenu.setUser_id(user.getUser_id());

        holder.qtyPicker.setOnValueChangedListener(new NumberPicker.OnValueChangeListener() {
            @Override
            public void onValueChange(NumberPicker picker, int oldVal, int newVal) {
                holder.textQty.setText(String.format(String.valueOf(newVal)));
                try {
                    cartMap.put(String.valueOf(dish.getDish_id()),holder.textQty.getText().toString());
                } catch (JSONException e) {
                    throw new RuntimeException(e);
                }
                context.getSharedPreferences("foodApp",Context.MODE_PRIVATE).edit().putString("cart",cartMap.toString()).apply();
            }
        });


    }

    @Override
    public int getItemCount() {
        return dishList.size();
    }


    class MyViewHolder extends RecyclerView.ViewHolder{
        ImageView image;
        TextView textName,textType,textPrice,textQty;

        NumberPicker qtyPicker;
        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            image = itemView.findViewById(R.id.dishImage);
            textName = itemView.findViewById(R.id.dishName);
            textType = itemView.findViewById(R.id.dishType);
            textPrice = itemView.findViewById(R.id.dishPrice);

            textQty = itemView.findViewById(R.id.textQty);
            qtyPicker=itemView.findViewById(R.id.qtyPicker);


            qtyPicker.setMaxValue(10);
            qtyPicker.setMinValue(0);
            textQty.setText(qtyPicker.toString());

        }
    }
}
