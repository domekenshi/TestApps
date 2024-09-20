package com.testapps.geofence;

import android.Manifest;
import android.app.Activity;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.util.Log;
import android.widget.Toast;

import androidx.core.app.ActivityCompat;

import com.google.android.gms.location.Geofence;
import com.google.android.gms.location.GeofencingClient;
import com.google.android.gms.location.GeofencingRequest;
import com.google.android.gms.location.LocationServices;

import java.util.ArrayList;
import java.util.List;

/**
 * GeofenceManagerクラス
 * <p>
 * Geofenceの管理を担当する中心的なクラス
 * Geofenceの追加、削除、更新などの操作を提供
 */
public class GeofenceManager {
    private static final String TAG = "GeofenceManager";
    private static final int REQUEST_LOCATION_PERMISSION = 1001; // 任意の一意な値でOK
    // アプリケーションコンテキスト
    // アプリケーション全体の設定や状態を保持する
    // ビーンの管理、イベント発行、メッセージソースへのアクセスなどの機能を提供
    // ただしAndroid Contextは少し違う
    // Androidアプリケーションの現在の状態に関する情報を提供するインターフェース
    // リソース、データベース、プリファレンスへのアクセスを可能にする
    // アプリケーションレベルの操作（アクティビティの起動、インテントのブロードキャストなど）を実行できる
    private final Context context;
    private final Activity activity;
    private final GeofencingClient geofencingClient;
    private PendingIntent geofencePendingIntent;

    /**
     * コンストラクタ
     */
    public GeofenceManager(Context context, Activity activity) {
        // 後でAndroidシステムサービス(アプリケーションコンテキスト）にアクセスしたり、リソースを取得したりする際に使用
        this.context = context;
        this.activity = activity;
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
        Log.d(TAG, "createAndAddGeofence start");

        // GeofenceのIDのリストで削除
//        List<String> geofenceIds = Arrays.asList("geofence1", "geofence2");
//        geofencingClient.removeGeofences(geofenceIds)
//                .addOnSuccessListener(ContextCompat.getMainExecutor(context), aVoid -> Log.d(TAG, "Geofencesが正常に削除された"))
//                .addOnFailureListener(ContextCompat.getMainExecutor(context), e -> Log.d(TAG, "Geofencesの削除に失敗した"));

        // ジオフェンス作成
        Geofence geofence = buildGeofence(latitude, longitude, radius, geofenceId);
        List<Geofence> geofenceList = new ArrayList<>();
        // ジオフェンスリストに追加
        geofenceList.add(geofence);
        Log.d(TAG, "geofenceList" + geofenceList);
        // 監視したいGeofenceのリストと、それらのGeofenceに関連するトリガー条件を含むオブジェクト
        GeofencingRequest geofencingRequest = buildGeofencingRequest(geofenceList);

        if (ActivityCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(activity, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, REQUEST_LOCATION_PERMISSION);
            return;
        }

        //        指定されたGeofenceを追加するリクエストを送信します。
        //        Geofenceの追加は非同期で行われるため、メインスレッドをブロックしません
        //        geofencingRequestは追加したいGeofenceの詳細を含んでいます。
        //        getGeofencePendingIntent()は、Geofenceイベントが発生したときに実行されるPendingIntentを提供します。
        geofencingClient.addGeofences(geofencingRequest, getGeofencePendingIntent())
                .addOnSuccessListener(aVoid -> Toast.makeText(context, "Geofences added successfully", Toast.LENGTH_SHORT).show())
                .addOnFailureListener(e -> Toast.makeText(context, "Failed to add geofences", Toast.LENGTH_SHORT).show());
        Log.d(TAG, "createAndAddGeofence end");
    }

    /**
     * ジオフェンス構築
     *
     * @param latitude   経度
     * @param longitude  緯度
     * @param radius     半径
     * @param geofenceId ジオフェンスID
     * @return ジオフェンス
     */
    private Geofence buildGeofence(double latitude, double longitude, float radius, String geofenceId) {
        return new Geofence.Builder()
                .setRequestId(geofenceId) // ジオフェンスに一意のIDを設定します。このIDは後でジオフェンスを識別するために使用されます。
                .setCircularRegion(latitude, longitude, radius)
                .setExpirationDuration(Geofence.NEVER_EXPIRE) // ジオフェンスの有効期限を設定します。NEVER_EXPIREは、ジオフェンスが永続的に有効
                .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER | Geofence.GEOFENCE_TRANSITION_EXIT)
                .build();
    }

    /**
     * GeofencingRequestは、Geofenceの監視を開始するために必要な情報をまとめたオブジェクト
     *
     * @param geofenceList ジオフェンスリスト
     * @return ジオフェンス作成リクエスト
     */
    private GeofencingRequest buildGeofencingRequest(List<Geofence> geofenceList) {
        return new GeofencingRequest.Builder()
                .setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_EXIT)
                .addGeofences(geofenceList)
                .build();
    }

    /**
     * Geofenceイベントが発生したときに実行されるPendingIntentを生成または取得するためのもの
     *
     * @return ペンディングインテント
     */
    private PendingIntent getGeofencePendingIntent() {
//        キャッシュチェック
        if (geofencePendingIntent != null) {
            Log.d(TAG, "キャッシュチェック:あり");
            return geofencePendingIntent;
        }
//        GeofenceイベントをハンドリングするためのIntentを作成
        Intent intent = new Intent(context, GeofenceBroadcastReceiver.class);
        intent.setAction("com.testapps.ACTION_GEOFENCE_EVENT");
        geofencePendingIntent = PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        return geofencePendingIntent;
    }
}