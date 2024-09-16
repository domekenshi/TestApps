package com.testapps.geofence;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.google.android.gms.location.Geofence;
import com.google.android.gms.location.GeofenceStatusCodes;
import com.google.android.gms.location.GeofencingEvent;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * ブロードキャストレシーバー
 */
public class GeofenceBroadcastReceiver extends BroadcastReceiver {
    private static final String TAG = "GeofenceBroadcastRcvr";

    @Override
    public void onReceive(Context context, Intent intent) {
        GeofencingEvent geofencingEvent = GeofencingEvent.fromIntent(intent);
        // NullPointerExceptionの回避
        Optional.ofNullable(geofencingEvent)
                .ifPresent(event -> {
                    if (event.hasError()) {
                        // エラー処理
                        String errorMessage = GeofenceStatusCodes.getStatusCodeString(geofencingEvent.getErrorCode());
                        Log.e(TAG, errorMessage);
                    } else {
                        // 正常処理
                        // トランジション取得
                        int geofenceTransition = geofencingEvent.getGeofenceTransition();

                        // Test that the reported transition was of interest.
                        if (geofenceTransition == Geofence.GEOFENCE_TRANSITION_ENTER ||
                                geofenceTransition == Geofence.GEOFENCE_TRANSITION_EXIT) {

                            // トリガーされたジオフェンスを取得します。 1 つのイベントで複数のジオフェンスがトリガーされる場合があります。
                            List<Geofence> triggeringGeofences = geofencingEvent.getTriggeringGeofences();

                            // 遷移の詳細を文字列として取得します。
                            String geofenceTransitionDetails = getGeofenceTransitionDetails(geofenceTransition, triggeringGeofences);

                            // 通知を送信し、遷移の詳細を記録します。
                            sendNotification(geofenceTransitionDetails);
                            Log.i(TAG, geofenceTransitionDetails);
                        } else {
                            // Log the error.
                            Log.e(TAG, "Invalid geofence transition type: " + geofenceTransition);
                        }
                    }
                });
    }

    /**
     * トランジション詳細取得
     *
     * @param geofenceTransition  　ジオフェンストランジション
     * @param triggeringGeofences トリガーしたジオフェンス
     * @return トランジション詳細
     */
    private String getGeofenceTransitionDetails(int geofenceTransition, List<Geofence> triggeringGeofences) {
        // Geofenceの遷移タイプを文字列に変換
        String geofenceTransitionString = getTransitionString(geofenceTransition);
        // triggeringGeofencesのnull安全な処理とGeofence IDの文字列生成
        String triggeringGeofencesIdsString = Optional.ofNullable(triggeringGeofences)
                // triggeringGeofencesがnullでない場合の処理
                .map(geofences -> geofences.stream()
                        // 各GeofenceからリクエストIDを取得
                        .map(Geofence::getRequestId)
                        // リクエストIDをカンマ区切りの文字列に
                        .collect(Collectors.joining(", ")))
                // triggeringGeofencesがnullの場合のデフォルト値
                .orElse("No geofences");
        // 遷移タイプとGeofence IDsを組み合わせた最終的な文字列を返す
        return geofenceTransitionString + ": " + triggeringGeofencesIdsString;
    }

    /**
     * トランジション（文字列）取得
     *
     * @param transitionType トランジションタイプ
     * @return トランジション（文字列）
     */
    private String getTransitionString(int transitionType) {
        switch (transitionType) {
            case Geofence.GEOFENCE_TRANSITION_ENTER:
                return "Entered";
            case Geofence.GEOFENCE_TRANSITION_EXIT:
                return "Exited";
            default:
                return "Unknown Transition";
        }
    }

    /**
     * 通知送信
     *
     * @param notificationDetails 通知詳細
     */
    private void sendNotification(String notificationDetails) {
        // Here you would implement the code to send a notification
        // This could involve creating and showing a notification using NotificationCompat.Builder
        // For brevity, the actual implementation is omitted here
        Log.i(TAG, "Sending notification: " + notificationDetails);
    }
}