package com.testapps;

import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.widget.Toast;

import androidx.core.app.ActivityCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.gms.location.Geofence;
import com.google.android.gms.location.GeofencingClient;
import com.google.android.gms.location.GeofencingRequest;
import com.google.android.gms.location.LocationServices;

public class GeofenceModule extends ReactContextBaseJavaModule {

    private Context context;
    private GeofencingClient geofencingClient;
    private PendingIntent geofencePendingIntent;
    private final double TOKYO_STATION_LAT = 35.681236;
    private final double TOKYO_STATION_LON = 139.767125;
    private final float GEOFENCE_RADIUS = 100.0f; // 半径100m

    public GeofenceModule(ReactApplicationContext reactContext) {
        super(reactContext);
        geofencingClient = LocationServices.getGeofencingClient(reactContext);
        this.context = context.getApplicationContext();
    }

    @Override
    public String getName() {
        return "GeofenceModule";
    }

    @ReactMethod
    public void startGeofenceMonitoring() {
        Geofence geofence = new Geofence.Builder()
                .setRequestId("TOKYO_STATION")
                .setCircularRegion(TOKYO_STATION_LAT, TOKYO_STATION_LON, GEOFENCE_RADIUS)
                .setExpirationDuration(Geofence.NEVER_EXPIRE)
                .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER | Geofence.GEOFENCE_TRANSITION_EXIT)
                .build();

        GeofencingRequest geofencingRequest = new GeofencingRequest.Builder()
                .setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER)
                .addGeofence(geofence)
                .build();

        geofencePendingIntent = getGeofencePendingIntent();

        if (ActivityCompat.checkSelfPermission(context, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        // ジオフェンス設定の成功/失敗リスナー
        geofencingClient.addGeofences(geofencingRequest, geofencePendingIntent)
                .addOnSuccessListener(aVoid -> {
                    Toast.makeText(context, "Geofence setup successful", Toast.LENGTH_SHORT).show();
                })
                .addOnFailureListener(e -> {
                    Toast.makeText(context, "Geofence setup failed: " + e.getMessage(), Toast.LENGTH_SHORT).show();
                });
    }

    private PendingIntent getGeofencePendingIntent() {
        Intent intent = new Intent(getReactApplicationContext(), GeofenceBroadcastReceiver.class);
        return PendingIntent.getBroadcast(getReactApplicationContext(), 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
    }
}
