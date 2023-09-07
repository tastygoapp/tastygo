package com.app.samplelogin.adapter;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.viewpager2.adapter.FragmentStateAdapter;

import com.app.samplelogin.fragments.Account_fragment;
import com.app.samplelogin.fragments.Cart_fragment;
import com.app.samplelogin.fragments.Home_fragment;
import com.app.samplelogin.fragments.Orders_Fragment;

public class TastyGoAdapters  extends FragmentStateAdapter {
    public TastyGoAdapters(@NonNull FragmentActivity fragmentActivity) {
        super(fragmentActivity);
    }

    @NonNull
    @Override
    public Fragment createFragment(int position) {

        switch (position)
        {
            case 0:
                return  new Home_fragment();
            case 1:
                return  new Orders_Fragment();
            case 2:
                return new Cart_fragment();
            case 3:
                return new Account_fragment();

        }
        return new Home_fragment();
    }

    @Override
    public int getItemCount() {
        return 4;
    }
}
