package com.testapps;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.testapps.geofence.GeofenceManager;

import java.util.Objects;

public class MainActivity extends ReactActivity {
    private static final String TAG = "MainActivity";
    private GeofenceManager geofenceManager;
    private static final int PERMISSIONS_REQUEST_LOCATION = 100;

    /**
     * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
     * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
     * (aka React 18) with two boolean flags.
     * {@link ReactActivityDelegate} のインスタンスを返します。ここでは、2 つのブール フラグを使用して
     * Fabric と Concurrent React (別名 React 18) を簡単に有効にできるユーティリティ クラス {@link
     * DefaultReactActivityDelegate} を使用します。
     */
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        Log.d(TAG, "createReactActivityDelegate");
        return new DefaultReactActivityDelegate(
                this,
                Objects.requireNonNull(getMainComponentName()),
                // If you opted-in for the New Architecture, we enable the Fabric Renderer.
                DefaultNewArchitectureEntryPoint.getFabricEnabled());
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "onCreate START");
        // GeofenceManagerのインスタンスを作成（ContextとActivityの両方を渡す）
        geofenceManager = new GeofenceManager(this, this);// 2つ目のthisはActivity
        // 位置情報の権限をチェックし、必要に応じて要求する
        checkLocationPermission();
        Log.d(TAG, "onCreate END");
    }

    /**
     * 位置情報権限チェック
     */
    private void checkLocationPermission() {
        Log.d(TAG, "checkLocationPermission");
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            // 権限がない場合、ユーザーに権限を要求する
            Log.d(TAG, "権限なし");
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                    PERMISSIONS_REQUEST_LOCATION);
        } else {
            // 権限がある場合、ジオフェンスを作成する
            Log.d(TAG, "createGeofence");
            createGeofence();
        }
    }

    /**
     * ジオフェンス生成
     */
    private void createGeofence() {
        Log.d(TAG, "createGeofence START");
        // ジオフェンスのパラメータを設定
        double latitude = 35.6815617317; // 例: 東京駅の緯度
        double longitude = 139.765470028; // 例: 東京駅の経度
        float radius = 1000; // 半径（メートル）
        String geofenceId = "TokyoStation";

        // ジオフェンスを作成して追加
        geofenceManager.createAndAddGeofence(latitude, longitude, radius, geofenceId);
        Log.d(TAG, "Geofence created for Tokyo Station");
        Log.d(TAG, "createGeofence END");
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     * JavaScript から登録されたメイン コンポーネントの名前を返します。
     * これは、コンポーネントのレンダリングをスケジュールするために使用されます。
     */
    @Override
    protected String getMainComponentName() {
        Log.d(TAG, "getMainComponentName");
        return "TestApps";
    }


    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        Log.d(TAG, "onRequestPermissionsResult　START");
        if (requestCode == PERMISSIONS_REQUEST_LOCATION) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // 権限が付与された場合、ジオフェンスを作成する
                Log.d(TAG, "権限付与：createGeofence");
                createGeofence();
            } else {
                // 権限が拒否された場合の処理
                Log.d(TAG, "Location permission denied");
            }
        }
        Log.d(TAG, "onRequestPermissionsResult　END");
    }


}
