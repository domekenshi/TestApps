import React, {useRef, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomSheet, {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnUI,
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-reanimated';

const Gorhom = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '90%'], []);
  const translateY = useSharedValue(0); // ボトムシートのY軸の位置
  const animatedOpacity = useSharedValue(1); // アニメーションの透明度

  const handleSheetChange = index => {
    console.log('Bottom Sheet Index:', index);
  };

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
      transform: [{translateY: translateY.value}],
    };
  });

  const handleGestureEvent = event => {
    // ドラッグ位置を取得
    const {translationY} = event.nativeEvent;

    // translateYの値を更新
    translateY.value = translationY;

    // ドラッグ位置に応じて透明度を変更
    if (translationY < 0) {
      animatedOpacity.value = withTiming(1); // 上にドラッグしたときはヘッダーを見せる
    } else {
      animatedOpacity.value = withTiming(1 - translationY / 100); // 下にドラッグしたときはヘッダーを隠す
    }
  };

  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView style={styles.container}>
        <View style={[styles.header, animatedHeaderStyle]}>
          <Text style={styles.headerText}>ヘッダー</Text>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          onGestureEvent={handleGestureEvent} // ドラッグ時にアニメーションを更新
        >
          <View style={styles.content}>
            <Text>Bottom Sheetのコンテンツ</Text>
          </View>
        </BottomSheet>
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Gorhom;
