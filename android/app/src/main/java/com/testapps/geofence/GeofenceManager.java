package com.testapps.geofence;

import android.Manifest;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;

import androidx.activity.result.ActivityResultLauncher;
import androidx.core.app.ActivityCompat;

import com.google.android.gms.location.Geofence;
import com.google.android.gms.location.GeofencingClient;
import com.google.android.gms.location.GeofencingRequest;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;

import java.util.ArrayList;
import java.util.List;

/**
 * GeofenceManagerクラス
 * <p>
 * Geofenceの管理を担当する中心的なクラス
 * Geofenceの追加、削除、更新などの操作を提供
 */
public class GeofenceManager {
    // アプリケーションコンテキスト
    // アプリケーション全体の設定や状態を保持する
    // ビーンの管理、イベント発行、メッセージソースへのアクセスなどの機能を提供
    // ただしAndroid Contextは少し違う
    // Androidアプリケーションの現在の状態に関する情報を提供するインターフェース
    // リソース、データベース、プリファレンスへのアクセスを可能にする
    // アプリケーションレベルの操作（アクティビティの起動、インテントのブロードキャストなど）を実行できる
    private Context context;
    private GeofencingClient geofencingClient;
    private PendingIntent geofencePendingIntent;
    private static final int REQUEST_LOCATION_PERMISSION = 1;
    private ActivityResultLauncher<String> requestPermissionLauncher;

    /**
     * コンストラクタ
     */
    public GeofenceManager(Context context) {
        // 後でAndroidシステムサービス(アプリケーションコンテキスト）にアクセスしたり、リソースを取得したりする際に使用
        this.context = context;
        // GeofencingClient は、Geofence を追加、削除、Geofenceイベントの監視をするための主要なクラス
        // Context を外部から注入することで、テストの容易性や柔軟性が向上します。
        // Geofenceの追加や削除は非同期で行われ、結果はコールバックで通知されます。
        this.geofencingClient = LocationServices.getGeofencingClient(context);
        // コンテキストの役割
        // 、位置情報サービスなどのシステムサービスにアクセスする
        // アプリケーションのリソース（文字列、設定など）にアクセスするため
        // アプリケーションの現在の状態（フォアグラウンド/バックグラウンド）を判断する
        // 位置情報の権限などを確認
        // Geofenceイベントを適切なコンポーネント（Activity、Service）に通知
    }

    /**
     * ジオフェンス生成と追加
     */
    public void createAndAddGeofence(double latitude, double longitude, float radius, String geofenceId) {
        // ジオフェンス作成
        Geofence geofence = buildGeofence(latitude, longitude, radius, geofenceId);
        List<Geofence> geofenceList = new ArrayList<>();
        // ジオフェンスリストに追加
        geofenceList.add(geofence);

        // 監視したいGeofenceのリストと、それらのGeofenceに関連するトリガー条件を含むオブジェクト
        GeofencingRequest geofencingRequest = buildGeofencingRequest(geofenceList);


        if (ActivityCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }

//        指定されたGeofenceを追加するリクエストを送信します。
//        Geofenceの追加は非同期で行われるため、メインスレッドをブロックしません
//        geofencingRequestは追加したいGeofenceの詳細を含んでいます。
//        getGeofencePendingIntent()は、Geofenceイベントが発生したときに実行されるPendingIntentを提供します。
        geofencingClient.addGeofences(geofencingRequest, getGeofencePendingIntent())
                .addOnSuccessListener(new OnSuccessListener<Void>() {
                    @Override
                    public void onSuccess(Void aVoid) {
                        // Geofences added successfully
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(Exception e) {
                        // Failed to add geofences
//                        失敗時の処理（エラーログの記録、ユーザーへの通知など）を実装
                    }
                });
    }

    private Geofence buildGeofence(double latitude, double longitude, float radius, String geofenceId) {
        return new Geofence.Builder()
                .setRequestId(geofenceId) // ジオフェンスに一意のIDを設定します。このIDは後でジオフェンスを識別するために使用されます。
                .setCircularRegion(latitude, longitude, radius)
                .setExpirationDuration(Geofence.NEVER_EXPIRE) // ジオフェンスの有効期限を設定します。NEVER_EXPIREは、ジオフェンスが永続的に有効
                .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER | Geofence.GEOFENCE_TRANSITION_EXIT)
                .build();
    }

    //GeofencingRequestは、Geofenceの監視を開始するために必要な情報をまとめたオブジェクト
    private GeofencingRequest buildGeofencingRequest(List<Geofence> geofenceList) {
        return new GeofencingRequest.Builder()
                .setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER)
                .addGeofences(geofenceList)
                .build();
    }

    //    Geofenceイベントが発生したときに実行されるPendingIntentを生成または取得するためのもの
    private PendingIntent getGeofencePendingIntent() {
//        キャッシュチェック
        if (geofencePendingIntent != null) {
            return geofencePendingIntent;
        }
//        GeofenceイベントをハンドリングするためのIntentを作成
        Intent intent = new Intent(context, GeofenceBroadcastReceiver.class);
        geofencePendingIntent = PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
        return geofencePendingIntent;
    }
}