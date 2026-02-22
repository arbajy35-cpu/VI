package com.nexora.vi;

import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceError;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.ConsoleMessage;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        // WebView setup
        webView = findViewById(R.id.webview);
        if (webView == null) throw new RuntimeException("WebView not found! Check layout ID");

        WebSettings ws = webView.getSettings();
        ws.setJavaScriptEnabled(true);
        ws.setDomStorageEnabled(true);
        ws.setAllowFileAccess(true);
        ws.setAllowContentAccess(true);
        ws.setCacheMode(WebSettings.LOAD_DEFAULT);
        ws.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        ws.setUseWideViewPort(true);
        ws.setLoadWithOverviewMode(true);

        // Handle page errors
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                showError("WEBVIEW ERROR:\n" + error.getDescription());
            }
        });

        // Capture JS console errors
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onConsoleMessage(ConsoleMessage cm) {
                showError("JS ERROR:\n" + cm.message() + "\nLine: " + cm.lineNumber());
                return true;
            }
        });

        // Clear cache/history
        webView.clearCache(true);
        webView.clearHistory();

        // Load local HTML
        webView.loadUrl("file:///android_asset/index.html");
    }

    @Override
    public void onBackPressed() {
        // Go back in WebView if possible
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } 
        // Otherwise, disable back or exit
        // super.onBackPressed(); // Enable this if you want default back behavior
    }

    private void showError(String msg) {
        webView.loadData(
                "<html><body style='background:#111;color:#f55;font-family:monospace;padding:16px;'>" +
                        "<h2>VI ERROR</h2><pre>" + msg + "</pre></body></html>",
                "text/html",
                "utf-8"
        );
    }
}
