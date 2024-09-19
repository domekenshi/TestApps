package com.testapps;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

import com.google.android.gms.location.Geofence;
import com.google.android.gms.location.GeofencingEvent;

public class GeofenceBroadcastReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        GeofencingEvent geofencingEvent = GeofencingEvent.fromIntent(intent);

        if (geofencingEvent.hasError()) {
            Toast.makeText(context, "Geofence error", Toast.LENGTH_SHORT).show();
            return;
        }

        int geofenceTransition = geofencingEvent.getGeofenceTransition();

        if (geofenceTransition == Geofence.GEOFENCE_TRANSITION_ENTER) {
            // ジオフェンス内に侵入
            Toast.makeText(context, "Entered Tokyo Station", Toast.LENGTH_SHORT).show();
        } else if (geofenceTransition == Geofence.GEOFENCE_TRANSITION_EXIT) {
            // ジオフェンスから退出
            Toast.makeText(context, "Exited Tokyo Station", Toast.LENGTH_SHORT).show();
        }
    }
}