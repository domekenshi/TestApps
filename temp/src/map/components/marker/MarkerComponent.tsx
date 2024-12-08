import React, {useState} from 'react';
import {Marker} from 'react-native-maps';
import {Coordinate} from '../../common/LatLonItems';
type MarkerDragEvent = {
  nativeEvent: {
    coordinate: Coordinate;
  };
};
interface MarkerProps {
  coord: Coordinate;
}
const MarkerComponent: React.FC<MarkerProps> = ({coord}) => {
  // const [markerCoords, setMarkerCoords] = useState({
  //   latitude: 35.68079810026042,
  //   longitude: 139.7546862065792,
  // });
  const [markerCoords, setMarkerCoords] = useState<Coordinate>(coord);
  const onMarkerDragEnd = (e: MarkerDragEvent) => {
    setMarkerCoords(e.nativeEvent.coordinate);
    console.info('新しい座標:', e.nativeEvent.coordinate);
  };
  return (
    <Marker draggable coordinate={markerCoords} onDragEnd={onMarkerDragEnd} />
  );
};

export default MarkerComponent;
