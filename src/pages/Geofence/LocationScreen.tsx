import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  PermissionsAndroid,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

interface GeoPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
  timestamp: number;
}

const LocationScreen = () => {
  const [location, setLocation] = useState<GeoPosition | null>(null);

  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: '位置情報の許可',
            message: 'アプリで位置情報を取得します',
            buttonNeutral: '後で',
            buttonNegative: 'キャンセル',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  }, []);

  const getLocation = useCallback(async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        return;
      }

      Geolocation.getCurrentPosition(
        position => {
          setLocation(position);
        },
        error => {
          console.error('位置情報エラー:', error);
          Alert.alert('位置情報エラー', error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (e) {
      console.error(e);
    }
  }, [requestLocationPermission]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return (
    <View style={styles.container}>
      <Text>現在地:</Text>
      {location ? (
        <Text>
          緯度: {location.coords.latitude}, 経度: {location.coords.longitude}
        </Text>
      ) : (
        <Text>位置情報を取得中...</Text>
      )}
      <Button title="現在地を再取得" onPress={getLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
export default LocationScreen;
