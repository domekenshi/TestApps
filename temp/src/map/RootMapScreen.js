import React from 'react';
import {StyleSheet, View} from 'react-native';
import TopSheetComponent from './components/bottomSheet/TopSheetComponent';
import MapComponent from './components/map/MapComponent';
import ContentA from './components/bottomSheet/ContentA';

const MarkerView2 = React.memo(() => {
  return <View style={styles.circleBox} />;
});
/**
 * ルートマップ画面
 * @returns マップ画面トップ
 */
const RootMapScreen = () => {
  const bottomSheetRef = React.useRef(null);
  const mapRef = React.useRef(null);
  const [markerView, setMarkerView] = React.useState(<></>);

  return (
    // ボトムシートコンポーネント
    <TopSheetComponent
      ref={bottomSheetRef}
      mapRef={mapRef}
      // マップコンポーネント
      mapView={
        <MapComponent
          ref={mapRef}
          setMarkerView={View2 => {
            setMarkerView(View2);
          }}
        />
      }
      // マーカーコンポーネント
      markerView={<MarkerView2 />}
      // ボトムシートコンテンツ
      bottomSheetContent={<ContentA ref={bottomSheetRef} mapRef={mapRef} />}
    />
  );
};
const styles = StyleSheet.create({
  circleBox: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'blue',
    // zIndex: 1000,
  },
});
export default RootMapScreen;
