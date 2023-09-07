package com.app.samplelogin.activity;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager2.widget.ViewPager2;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.PopupMenu;
import android.widget.TableLayout;
import android.widget.Toast;

import androidx.appcompat.widget.Toolbar;

import com.app.samplelogin.R;
import com.app.samplelogin.adapter.TastyGoAdapters;
import com.google.android.material.tabs.TabLayout;
import com.google.android.material.tabs.TabLayoutMediator;

public class MainActivity extends AppCompatActivity {
Toolbar toolbar;
ViewPager2 viewPager2;
TabLayout tabLayout;
TastyGoAdapters tastyGoAdapters;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        toolbar=findViewById(R.id.toolBar);
        viewPager2=findViewById(R.id.viewPager2);
        tabLayout=findViewById(R.id.tabLayout);
        setSupportActionBar(toolbar);

        tastyGoAdapters =new TastyGoAdapters(this);
        viewPager2.setAdapter(tastyGoAdapters);

        new TabLayoutMediator(tabLayout, viewPager2, new TabLayoutMediator.TabConfigurationStrategy() {
            @Override
            public void onConfigureTab(@NonNull TabLayout.Tab tab, int position) {
            switch (position)
            {
                case 0:
                    tab.setIcon(R.drawable.home);
                    break;
                case 1:
                    tab.setIcon(R.drawable.menu);
                    break;
                case 2:
                    tab.setIcon(R.drawable.cart);
                    break;
                case 3:

                    tab.setIcon(R.drawable.account);
                    break;


            }
            }
        }).attach();

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main_menu,menu);
        return super.onCreateOptionsMenu(menu);
    }


    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {

        if(item.getTitle().equals("logout"))
        {
            getSharedPreferences("foodApp",MODE_PRIVATE).edit().putBoolean("login_status",false).apply();
            startActivity(new Intent(MainActivity.this, Login_Activity.class));
            finish();
       }
            else if(item.getTitle().equals("Edit")) {

            Intent intent=new Intent(MainActivity.this, ProfileEditMainActivity.class);
            startActivity(intent);

            } else if (item.getTitle().equals("setting")) {
                Intent intent=new Intent(MainActivity.this, SettingActivity.class);
                startActivity(intent);

            }
        return super.onOptionsItemSelected(item);
    }


}