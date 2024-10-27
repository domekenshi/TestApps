import React, {useState} from 'react';
import {Marker} from 'react-native-maps';

type MarkerDragEvent = {
  nativeEvent: {
    coordinate: {
      latitude: number;
      longitude: number;
    };
  };
};

const MarkerComponent = () => {
  const [markerCoords, setMarkerCoords] = useState({
    latitude: 35.68079810026042,
    longitude: 139.7546862065792,
  });

  const onMarkerDragEnd = (e: MarkerDragEvent) => {
    setMarkerCoords(e.nativeEvent.coordinate);
    console.info(
      '\x1b[32m' + 'e.nativeEvent.coordinate:',
      e.nativeEvent.coordinate,
    );
  };
  return (
    <Marker
      draggable={true}
      coordinate={markerCoords}
      onDragEnd={onMarkerDragEnd}
    />
  );
};

export default MarkerComponent;
