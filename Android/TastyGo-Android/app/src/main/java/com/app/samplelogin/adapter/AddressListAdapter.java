package com.app.samplelogin.adapter;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.app.samplelogin.R;
import com.app.samplelogin.activity.DishDetailsActivity;
import com.app.samplelogin.activity.OrdersActivity;
import com.app.samplelogin.entity.Address;
import com.app.samplelogin.entity.Orders;

import java.util.HashMap;
import java.util.List;

public class AddressListAdapter extends RecyclerView.Adapter<AddressListAdapter.MyViewHolder> {


    Context context;
    List<Address> addressList;


    public AddressListAdapter(Context context, List<Address> addressList) {
        this.context = context;
        this.addressList = addressList;
    }


    @NonNull
    @Override
    public AddressListAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.recyclerview_address_list,null);
        return new AddressListAdapter.MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull AddressListAdapter.MyViewHolder holder, int position) {
        Address address = addressList.get(position);
        holder.textState.setText("State : "+address.getState());
        holder.textCity.setText("City : "+address.getCity());
        holder.textPinCode.setText("PinCode : "+address.getPin());

    }

    @Override
    public int getItemCount() {
        return addressList.size();
    }


    class MyViewHolder extends RecyclerView.ViewHolder{
        TextView textState,textCity,textPinCode;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            textState = itemView.findViewById(R.id.textState);
            textCity = itemView.findViewById(R.id.textCity);
            textPinCode = itemView.findViewById(R.id.textPinCode);


            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(context, OrdersActivity.class);
                    intent.putExtra("address",addressList.get(getAdapterPosition()));
                    context.startActivity(intent);
                }
            });
        }

    }
}
