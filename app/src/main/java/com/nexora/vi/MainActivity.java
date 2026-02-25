package com.nexora.vi;

import android.Manifest;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.Settings;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.ConsoleMessage;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private static final byte ENCRYPT_KEY = 0x5A; // same as encrypt.py

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        // --- STORAGE PERMISSION CHECK FOR ANDROID 11+ ---
        requestFullStorageIfNeeded();

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
                return true; // ignore console logs
            }
        });

        // --- LOAD ENCRYPTED HTML ---
        loadEncryptedHTML("index.enc");
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }

    // --- CREATE HIDDEN STORAGE ---
    private void createHiddenStorage() {
        try {
            File baseDir = new File(getExternalFilesDir(null), ".vi_hidden");
            if (!baseDir.exists()) baseDir.mkdirs();

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

    // --- LOAD ENCRYPTED HTML FROM ASSETS ---
    private void loadEncryptedHTML(String assetFileName) {
        try {
            InputStream is = getAssets().open(assetFileName);
            int size = is.available();
            byte[] buffer = new byte[size];
            is.read(buffer);
            is.close();

            // Decrypt runtime
            for (int i = 0; i < buffer.length; i++) {
                buffer[i] = (byte) (buffer[i] ^ ENCRYPT_KEY);
            }

            // Convert to string & load in WebView
            String htmlContent = new String(buffer);
            webView.loadDataWithBaseURL(null, htmlContent, "text/html", "UTF-8", null);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // --- REQUEST MANAGE_EXTERNAL_STORAGE FOR ANDROID 11+ ---
    private void requestFullStorageIfNeeded() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            if (!Environment.isExternalStorageManager()) {
                Toast.makeText(this, "Please allow full storage access", Toast.LENGTH_LONG).show();
                Intent intent = new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION);
                intent.setData(Uri.parse("package:" + getPackageName()));
                startActivity(intent);
            }
        }
    }
}
