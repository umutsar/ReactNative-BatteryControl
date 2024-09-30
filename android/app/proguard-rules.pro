-keepattributes *Annotation*
-keep class com.facebook.** { *; }
-dontwarn com.facebook.**

-keep class com.umutsar.batterycontrol.** { *; }

-keep class com.facebook.jni.** { *; }
-keep class com.facebook.hermes.** { *; }

-keep class com.facebook.react.bridge.WritableNativeMap { *; }
-keep class com.facebook.react.bridge.WritableNativeArray { *; }

-keepclassmembers class * {
    @com.facebook.react.bridge.ReactMethod <methods>;
    @com.facebook.react.bridge.ReactProperty <methods>;
}

-dontwarn javax.annotation.**
