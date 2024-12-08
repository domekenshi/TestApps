import React, {useRef, useEffect, useState, useMemo} from 'react';
import {Marker, AnimatedRegion} from 'react-native-maps';

const LatLonMoveMarkerComponent = () => {
  //   const [location, setLocation] = useState<Coordinate>({
  //     latitude: 35.680959106959,
  //     longitude: 139.76730676352,
  //   });

  //       const [location, setLocation] = useState({
  //     latitude: 34.6937,  // 初期値（例: 大阪）
  //     longitude: 135.5023, // 初期値
  //   });

  //   useEffect(() => {
  //     const reference = database().ref('/objectLocation');

  //     // Firebaseからリアルタイムで位置データを取得
  //     const unsubscribe = reference.on('value', snapshot => {
  //       const data = snapshot.val();
  //       if (data) {
  //         setLocation({
  //           latitude: data.latitude,
  //           longitude: data.longitude,
  //         });
  //       }
  //     });
  // 東京駅周辺の座標リスト
  const locations = useMemo(
    () => [
      {latitude: 35.681236, longitude: 139.767125}, // 中心: 東京駅
      {latitude: 35.689236, longitude: 139.767225}, // 東京駅の北
      {latitude: 35.681436, longitude: 139.769525}, // 東京駅の東
      {latitude: 35.680036, longitude: 139.767425}, // 東京駅の南
      {latitude: 35.681536, longitude: 139.764725}, // 東京駅の西
      {latitude: 35.689236, longitude: 139.767225}, // 東京駅の北
    ],
    [],
  ); // 空の依存配列
  // `AnimatedRegion`のインスタンスを作成
  const [coordinate] = useState(
    new AnimatedRegion({
      latitude: locations[0].latitude,
      longitude: locations[0].longitude,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03,
    }),
  );

  // マーカーのRef
  const markerRef = useRef(null);

  useEffect(() => {
    let currentIndex = 0;

    // 2秒ごとに次の位置にアニメーションさせる
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % locations.length;

      // const newLocation = locations[currentIndex];

      // マーカーを新しい座標にアニメーションさせる
      // coordinate.timing({
      //   toValue: {
      //     latitude: newLocation.latitude,
      //     longitude: newLocation.longitude,
      //     latitudeDelta: 0.03,
      //     longitudeDelta: 0.03,
      //   } as unknown as number, // 型アサーションを追加
      //   duration: 2000,
      //   useNativeDriver: false,
      // });
    }, 2000); // 2000ミリ秒（2秒）間隔

    // コンポーネントがアンマウントされたらインターバルをクリア
    return () => clearInterval(intervalId);
  }, [locations, coordinate]);

  return (
    <Marker.Animated
      ref={markerRef}
      title={'title'}
      description={'description'}
      //   image={require('../../../../assets/images/panda.jpg')}
      coordinate={coordinate as any}
      //     animateMarkerToCoordinate={{
      //         35.682599088059,
      //         139.77350117154,
      //     },
      //         1000
      //  }
    >
      {/* {Object.keys(MarkerContents).length !== 0 ? (
        <View style={styles.itemTrueBg}>
          <Text>MarkerContents</Text>
        </View>
      ) : (
        <View key={'test'}>
          <Text style={styles.itemFalseBg}>llllllllll</Text>
        </View>
      )} */}
    </Marker.Animated>
  );
};

// const styles = StyleSheet.create({
//   itemTrueBg: {
//     backgroundColor: 'red',
//     padding: 160,
//   },
//   itemFalseBg: {
//     backgroundColor: 'blue',
//     color: 'white',
//   },
// });
export default LatLonMoveMarkerComponent;
