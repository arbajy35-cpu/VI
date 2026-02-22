package com.nexora.vi;

import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Environment;
import android.webkit.*;
import androidx.appcompat.app.AppCompatActivity;
import java.io.*;

public class MainActivity extends AppCompatActivity {

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.main);
        webView = findViewById(R.id.webview);

        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(true);
        s.setAllowContentAccess(true);

        // ✅ OLD + SAFE WebViewClient (NO API ISSUE)
        webView.setWebViewClient(new WebViewClient() {

            @Override
            public void onReceivedError(
                    WebView view,
                    int errorCode,
                    String description,
                    String failingUrl
            ) {
                showError("WEBVIEW ERROR:\n" + description);
            }
        });

        // ✅ SAFE WebChromeClient
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onConsoleMessage(String message, int lineNumber, String sourceID) {
                showError("JS ERROR:\n" + message + "\nline: " + lineNumber);
            }
        });

        try {
            setContentView(R.layout.main);

            webView = findViewById(R.id.webview);
            if (webView == null)
                throw new RuntimeException("WebView not found! Check layout ID");

            // WebView settings
            WebSettings s = webView.getSettings();
            s.setJavaScriptEnabled(true);
            s.setDomStorageEnabled(true);
            s.setAllowFileAccess(true);
            s.setAllowContentAccess(true);
            s.setCacheMode(WebSettings.LOAD_DEFAULT);
            s.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
            s.setUseWideViewPort(true);
            s.setLoadWithOverviewMode(true);

            // WebView client for error catching
            webView.setWebViewClient(new WebViewClient() {
                @Override
                public void onReceivedError(
                        WebView view,
                        WebResourceRequest request,
                        WebResourceError error) {
                    logError("WebViewError: " + error.getDescription());
                }
            });

            // JS console messages
            webView.setWebChromeClient(new WebChromeClient() {
                @Override
                public boolean onConsoleMessage(ConsoleMessage cm) {
                    logError("JS: " + cm.message());
                    return true;
                }
            });

            // Clear old cache/history
            webView.clearCache(true);
            webView.clearHistory();

            // Load local HTML
            webView.loadUrl("file:///android_asset/index.html");

        } catch (Exception e) {
            logError("CRASH: " + e.toString());
        }
    }

    // Save log inside app + copy to external storage
    private void logError(String msg) {
        try {
            // 1️⃣ Save inside app
            FileOutputStream fos = openFileOutput("vi_error_log.txt", MODE_APPEND);
            fos.write((msg + "\n").getBytes());
            fos.close();

            // 2️⃣ Copy to external storage (Termux accessible)
            File srcFile = new File(getFilesDir(), "vi_error_log.txt");
            File destFile = new File(Environment.getExternalStorageDirectory(), "VI_logs/vi_error_log.txt");

            File parent = destFile.getParentFile();
            if (!parent.exists()) parent.mkdirs();

            FileInputStream in = new FileInputStream(srcFile);
            FileOutputStream out = new FileOutputStream(destFile);

            byte[] buffer = new byte[1024];
            int read;
            while ((read = in.read(buffer)) != -1) {
                out.write(buffer, 0, read);
            }

            in.close();
            out.close();

        } catch (Exception ignored) {}
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    private void showError(String msg) {
        webView.loadData(
                "<html><body style='background:#111;color:#f55;font-family:monospace;padding:16px;'>" +
                "<h2>VI ERROR</h2><pre>" + msg + "</pre></body></html>",
                "text/html",
                "utf-8"
        );
    }

    @Override
    public void onBackPressed() {
        // 🔒 Disable back
    }
}
