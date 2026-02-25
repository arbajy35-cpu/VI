package com.nexora.vi;

import android.os.Bundle;
import android.os.Environment;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.ConsoleMessage;
import androidx.appcompat.app.AppCompatActivity;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class MainActivity extends AppCompatActivity {

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        // --- CREATE HIDDEN STORAGE ---
        createHiddenStorage();

        // --- WEBVIEW SETUP ---
        webView = findViewById(R.id.webview);
        if (webView == null) throw new RuntimeException("WebView not found! Check layout ID");

        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setAllowFileAccess(true);
        webView.getSettings().setUseWideViewPort(true);
        webView.getSettings().setLoadWithOverviewMode(true);

        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onConsoleMessage(ConsoleMessage cm) {
                // ignore console messages
                return true;
            }
        });

        // Load local HTML
        webView.loadUrl("file:///android_asset/index.html");
    }

    // --- BACK PRESS ---
    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }

    // --- HIDDEN STORAGE CREATION ---
    private void createHiddenStorage() {
        try {
            // Path similar to /storage/emulated/0/Android/data/com.nexora.vi/files/.vi_hidden
            File baseDir = new File(getExternalFilesDir(null), ".vi_hidden");
            if (!baseDir.exists()) baseDir.mkdirs();

            // Dummy file to make folder "look alive"
            File dummyFile = new File(baseDir, "readme.txt");
            if (!dummyFile.exists()) {
                FileOutputStream fos = new FileOutputStream(dummyFile);
                fos.write("This is a hidden dummy file for VI app".getBytes());
                fos.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
