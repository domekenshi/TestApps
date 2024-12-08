import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import {getMapProvider, getMapType} from '../../mapUtil';
import {MAP_TYPES, INITIAL_REGION} from '../../../common/const';
// import LatLonMoveMarkerComponent from './components/marker/LatLonMoveMarkerComponent';
import MarkerComponent from '../marker/MarkerComponent';
import {LatLonItems} from '../../common/LatLonItems';
const {width, height} = Dimensions.get('window');

// provider 0:google 1:undefind
const PROVIDER_TYPE = 0;

/**
 * ルートマップ画面
 * @returns マップ画面トップ
 */
const MapComponent = React.forwardRef(({setMarkerView}, ref) => {
  // [Reanimated] Reading from `value` during component render. Please ensure that you do not access the `value` property or use `get` method of a shared value while React is rendering a component.
  // useCallbackでエラー回避

  return (
    <MapView
      ref={ref}
      provider={getMapProvider(PROVIDER_TYPE)}
      style={styles.map}
      initialRegion={INITIAL_REGION.TOKYO}
      mapType={getMapType(MAP_TYPES.STANDARD)}
      showsUserLocation={true}
      showsCompass={true}
      showsBuildings={true}
      showsTraffic={true}
      showsIndoors={true}
      showsIndoorLevelPicker={true}
      zoomControlEnabled={true}
      loadingEnabled={true}
      //   onMapReady={handleMapReady}
    >
      {/* マーカー */}
      {LatLonItems?.map(item => {
        return <MarkerComponent key={item.id} coord={item.coord} />;
      })}
    </MapView>
  );
});
const styles = StyleSheet.create({
  map: {
    width: width,
    height: height,
  },
  circleBox: {
    position: 'absolute',
    top: 50,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'blue',
  },
});
export default React.memo(MapComponent);
