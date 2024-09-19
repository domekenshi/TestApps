import {NativeModules} from 'react-native';
const {GeofenceModule} = NativeModules;
export default {
  startGeofenceMonitoring() {
    GeofenceModule.startGeofenceMonitoring();
  },
};
