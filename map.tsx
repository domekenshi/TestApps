/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import MapView, {Overlay, MapOverlayProps} from 'react-native-maps';

const {width, height} = Dimensions.get('window');
const TOKYO_REGION = {
  latitude: 35.6586,
  longitude: 139.7454,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
// Coordinate 型を使用
const imageBounds: [[number, number], [number, number]] = [
  [35.6576, 139.7444], // 南西
  [35.6596, 139.7464], // 北東
];
const imageBounds2: [[number, number], [number, number]] = [
  [35.6576, 139.7445], // 南西
  [35.6596, 139.7464], // 北東
];
const imageBounds3: [[number, number], [number, number]] = [
  [35.6576, 139.7447], // 南西
  [35.6596, 139.7464], // 北東
];
const imageBounds4: [[number, number], [number, number]] = [
  [35.6576, 139.7484], // 南西
  [35.6596, 139.7474], // 北東
];
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[styles.backgroundStyle, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <Text style={styles.text}>test</Text>
      </View>
      <MapView style={styles.map} initialRegion={TOKYO_REGION}>
        <Overlay
          image={require('./assets/images/panda.jpg')}
          bounds={imageBounds as MapOverlayProps['bounds']} // Coordinate 型を使用
        />
        <Overlay
          image={require('./assets/images/panda.jpg')}
          bounds={imageBounds2 as MapOverlayProps['bounds']} // Coordinate 型を使用
        />
        <Overlay
          image={require('./assets/images/panda.jpg')}
          bounds={imageBounds3 as MapOverlayProps['bounds']} // Coordinate 型を使用
        />
        <Overlay
          image={require('./assets/images/panda.jpg')}
          bounds={imageBounds4 as MapOverlayProps['bounds']} // Coordinate 型を使用
        />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  map: {
    width: width,
    height: height,
  },
});

export default App;
