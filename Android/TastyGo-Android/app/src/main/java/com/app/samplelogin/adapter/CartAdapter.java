package com.app.samplelogin.adapter;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.PopupMenu;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.app.samplelogin.R;
import com.app.samplelogin.entity.Address;
import com.app.samplelogin.entity.Dish;
import com.app.samplelogin.utils.API;
import com.app.samplelogin.utils.RetrofitClient;
import com.bumptech.glide.Glide;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.util.Arrays;
import java.util.Dictionary;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CartAdapter extends RecyclerView.Adapter<CartAdapter.MyViewHolder> {

    Context context;
    List<Dish> dishList;

    float totalP = 0.0f;
    HashMap<Integer, Float> dict= new HashMap<>();


    public CartAdapter(Context context, List<Dish> dishList) {
        this.context = context;
        this.dishList = dishList;
    }


    @NonNull
    @Override
    public CartAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.recyclerview_cart_list,null);
        return new CartAdapter.MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CartAdapter.MyViewHolder holder, int position) {

        Dish dish = dishList.get(position);
        holder.textName.setText(dish.getDish_name());
        holder.textType.setText(dish.getDish_type());
        holder.textPrice.setText("₹ "+dish.getDish_price());
        holder.textQty.setText("QTY: "+dish.getDish_qty() +" * "+dish.getDish_price() +" = ₹ "+dish.getDish_price()*dish.getDish_qty());
        float dishPrice = (float) dish.getDish_price();
        float dishQty = dish.getDish_qty();
        totalP += dishPrice*dishQty;
        dict.put(dish.getDish_id(),dishPrice*dishQty);
        Log.e("totalP", ""+dict.get(2));

        context.getSharedPreferences("foodApp",Context.MODE_PRIVATE).edit().putFloat("totalPrice",totalP).apply();
        Glide.with(context).load(API.BASE_URL +"/"+dish.getDish_image()).into(holder.image);
//        totalP=0.0f;
    }

    @Override
    public int getItemCount() {
        return dishList.size();
    }


    class MyViewHolder extends RecyclerView.ViewHolder{
        ImageView image;
        TextView textName,textType,textPrice,textQty;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            image = itemView.findViewById(R.id.dishImage);
            textName = itemView.findViewById(R.id.dishName);
            textType = itemView.findViewById(R.id.dishType);
            textPrice = itemView.findViewById(R.id.dishPrice);
            textQty = itemView.findViewById(R.id.dishQty);

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    PopupMenu popupMenu = new PopupMenu(context,v);
                    Menu menu=popupMenu.getMenu();
                    menu.add("edit");
                    menu.add("Delete");
                    popupMenu.show();

                    popupMenu.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
                        @Override
                        public boolean onMenuItemClick(MenuItem item) {
                            Dish dish = dishList.get(getAdapterPosition());
                            if (item.getTitle().equals("edit"))
                            {
                                Toast.makeText(context, "edit", Toast.LENGTH_SHORT).show();
                            } else if (item.getTitle().equals("Delete"))
                            {

                            RetrofitClient.getInstance().getApi().deleteDish(dish.getDish_id()).enqueue(new Callback<JsonObject>() {
                                @Override
                                public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                                    Log.e("dish", response.body().toString());
                                    Toast.makeText(context, "Delete Successfully", Toast.LENGTH_SHORT).show();
                                }

                                @Override
                                public void onFailure(Call<JsonObject> call, Throwable t) {
                                    Toast.makeText(context, "Something went Wrong", Toast.LENGTH_SHORT).show();
                                }
                            });

                            }
                            return false;
                        }
                    });

                }
            });


        }

    }
}
