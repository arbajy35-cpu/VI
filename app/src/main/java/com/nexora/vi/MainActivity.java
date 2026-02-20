package com.nexora.vi;

import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

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

        webView.loadUrl("file:///android_asset/index.html");
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
