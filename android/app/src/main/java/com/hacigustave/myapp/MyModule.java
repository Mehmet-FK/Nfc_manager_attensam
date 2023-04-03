package com.hacigustave.myapp;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.logging.LogManager;
import com.facebook.react.bridge.Callback;

import java.io.Console;
import java.util.HashMap;
import android.util.Log;
import android.util.Base64;

public class MyModule extends ReactContextBaseJavaModule {
    MyModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "MyModule";
    }

    @ReactMethods
    public void createString(String pass, Callback callback) {
        byte[] bytes = pass.getBytes();
        String encodedBytes = Base64.encodeToString(bytes, 0);

        callback.invoke(encodedBytes);

    }
}