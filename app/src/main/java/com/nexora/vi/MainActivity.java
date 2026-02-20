package com.nexora.vi;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // layout load
        setContentView(R.layout.main);

        // WebView connect
        webView = findViewById(R.id.webview);

        // enable basic settings
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);

        // open links inside app
        webView.setWebViewClient(new WebViewClient());

        // load local file
        webView.loadUrl("file:///android_asset/index.html");
    }

}
