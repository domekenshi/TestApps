import React, {useEffect, useCallback} from 'react';
import {Marker} from 'react-native-maps';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
  withSequence,
  cancelAnimation,
} from 'react-native-reanimated';

// MarkerコンポーネントをAnimated.createAnimatedComponentでラップし、アニメーション可能にする
const AnimatedMarker = Animated.createAnimatedComponent(Marker as any);

/**
 * バスコンポーネント
 * 地図上でバスが円を描いて動くアニメーションを表現する
 * @returns
 */
const BusMarkerComponent = () => {
  // 円の中心座標と半径を設定
  const centerLatitude = 35.6576;
  const centerLongitude = 139.7444;
  const radius = 0.002; // 半径（約100m）

  // アニメーションの角度を表す共有値を作成
  const angle = useSharedValue(0);
  const memoizedFunction = useCallback(() => {
    const duration = 10000; // 1周10秒で回転
    // 4周分のアニメーションシーケンスを作成
    const animation = withSequence(
      withTiming(2 * Math.PI, {duration, easing: Easing.linear}),
      withTiming(4 * Math.PI, {duration, easing: Easing.linear}),
      withTiming(6 * Math.PI, {duration, easing: Easing.linear}),
      withTiming(8 * Math.PI, {duration, easing: Easing.linear}),
    );

    // アニメーションを無限に繰り返す
    angle.value = withRepeat(animation, -1, false);

    // クリーンアップ関数：コンポーネントのアンマウント時にアニメーションをキャンセル
    return () => {
      cancelAnimation(angle);
    };
  }, [angle]);

  // コンポーネントのマウント時にアニメーションを開始
  useEffect(() => {
    memoizedFunction();
  }, [memoizedFunction]);

  // マーカーの座標をアニメーションさせるためのプロパティを定義
  const animatedProps = useAnimatedProps(() => {
    'worklet';
    return {
      coordinate: {
        // 円運動の数式を使用して、現在の角度に基づいた座標を計算
        latitude: centerLatitude + radius * Math.sin(angle.value),
        longitude: centerLongitude + radius * Math.cos(angle.value),
      },
    };
  });
  // アニメーション可能なマーカーをレンダリング
  return <AnimatedMarker animatedProps={animatedProps as any} />;
};

export default BusMarkerComponent;
