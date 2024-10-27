import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import {getMapProvider, getMapType} from './mapUtil';
import {MAP_TYPES, INITIAL_REGION} from '../common/const';
// import OverlayComponent from './components/overlay/OverlayComponent';
// import MarkerComponent from './components/marker/MarkerComponent';
import BusMarkerComponent from './components/marker/BusMarkerComponent';
const {width, height} = Dimensions.get('window');

// provider 0:google 1:undefind
const PROVIDER_TYPE = 0;

const RootMapScreen = () => {
  return (
    <>
      <MapView
        provider={getMapProvider(PROVIDER_TYPE)}
        // region={RESION}
        // customMapStyle={[]}
        style={styles.map}
        initialRegion={INITIAL_REGION.TOKYO}
        // camera={}
        // initialCamera={}
        // mapPadding={{
        //   top: 0,
        //   right: 0,
        //   bottom: 180,
        //   left: 0,
        // }}
        // paddingAdjustmentBehavior={}
        // liteMode={false}
        // googleMapId={}
        mapType={getMapType(MAP_TYPES.STANDARD)}
        // userInterfaceStyle={}
        showsUserLocation={true}
        // userLocationPriority={102}
        // userLocationUpdateInterval={}
        // userLocationFastestInterval={}
        // userLocationAnnotationTitle={'here'} //IOS
        // followsUserLocation={} //IOS
        // showsMyLocationButton={false}
        // showsPointsOfInterest={} //IOS
        showsCompass={true}
        // showsScale={} //IOS
        showsBuildings={true}
        showsTraffic={true}
        showsIndoors={true}
        showsIndoorLevelPicker={true}
        zoomControlEnabled={true}
        loadingEnabled={true}
        // cameraZoomRange={}
        onMapReady={() => {}}>
        {/* <MarkerComponent /> */}
        <BusMarkerComponent />
        {/* <OverlayComponent /> */}
      </MapView>
    </>
  );
};
const styles = StyleSheet.create({
  map: {
    width: width,
    height: height,
  },
});
export default RootMapScreen;
