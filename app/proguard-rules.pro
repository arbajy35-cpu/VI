#############################################
# BASIC ANDROID RULES
#############################################

# Keep app package name
-keep class com.nexora.vi.** { *; }

# Keep MainActivity
-keep public class com.nexora.vi.MainActivity { *; }

#############################################
# WEBVIEW PROTECTION
#############################################

# Keep WebView classes
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep WebChromeClient / WebViewClient
-keep class android.webkit.** { *; }

#############################################
# REMOVE LOGS IN RELEASE
#############################################

-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** i(...);
    public static *** v(...);
    public static *** w(...);
}

#############################################
# OPTIMIZATION
#############################################

-optimizationpasses 5
-overloadaggressively
-repackageclasses ''
-flattenpackagehierarchy

#############################################
# REMOVE DEBUG INFO
#############################################

-dontwarn
-ignorewarnings
