package com.nexora.vi;

import android.os.Bundle;
import android.webkit.*;
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

        // 🔥 NO BACK, NO SILENT FAIL
        webView.setWebViewClient(new WebViewClient() {

            @Override
            public void onReceivedError(
                    WebView view,
                    WebResourceRequest request,
                    WebResourceError error
            ) {
                showError("WEBVIEW ERROR:\n" + error.getDescription());
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                // page loaded = good sign
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onConsoleMessage(ConsoleMessage cm) {
                showError("JS ERROR:\n" + cm.message());
                return true;
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
        // ❌ Disable back completely
    }
}
