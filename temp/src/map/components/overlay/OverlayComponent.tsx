/**
 * オーバーレイコンポーネント
 *
 * @format
 */

import React from 'react';
// import {StyleSheet} from 'react-native';
import {Overlay, MapOverlayProps} from 'react-native-maps';

// Coordinate 型を使用
const imageBoundsArray = [
  {
    id: 'a',
    image: require('../../../../assets/images/panda.jpg'),
    bounds: [
      [35.6576, 139.7444], // 南西
      [35.6596, 139.7464], // 北東
    ],
    opacity: 1,
  },
  {
    id: 'b',
    image: require('../../../../assets/images/panda.jpg'),
    bounds: [
      [35.6576, 139.7433], // 南西
      [35.6596, 139.7455], // 北東
    ],
    opacity: 0.7,
  },
  {
    id: 'c',
    image: require('../../../../assets/images/panda.jpg'),
    bounds: [
      [35.6578, 139.7447], // 南西
      [35.6597, 139.7474], // 北東
    ],
    opacity: 0.5,
  },
  {
    id: 'd',
    image: require('../../../../assets/images/panda.jpg'),
    bounds: [
      [35.6576, 139.7498], // 南西
      [35.6598, 139.7473], // 北東
    ],
    opacity: 1,
  },
];

const OverlayComponent = () => {
  return (
    <>
      {imageBoundsArray.map(item => {
        return (
          <Overlay
            key={item.id}
            image={item.image}
            bounds={item.bounds as MapOverlayProps['bounds']} // Coordinate 型を使用
            opacity={item.opacity}
          />
        );
      })}
    </>
  );
};

// const styles = StyleSheet.create({
//   backgroundStyle: {
//     flex: 1,
//   },
// });
export default OverlayComponent;
