import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  // useAnimatedReaction,
} from 'react-native-reanimated';
// import DebugUtils from '../../../common/DebugUtils';

/**
 * bottomSheetComponent
 */
const TopSheetComponent = React.forwardRef(
  ({mapView, bottomSheetContent, markerView}, ref) => {
    const animatedValue = useSharedValue(0);
    const snapPoints = useMemo(() => ['10%', '50%', '99%'], []);
    const animatedStyle = useAnimatedStyle(() => {
      let newPosition = animatedValue.value - 70;
      if (newPosition < 10) {
        newPosition = 150;
      }
      console.log('test', newPosition);
      return {
        transform: [{translateY: newPosition}],
      };
    });

    return (
      <View style={styles.container}>
        {mapView ?? null}
        {markerView ? (
          <Animated.View style={[animatedStyle, styles.markerContainer]}>
            {markerView}
          </Animated.View>
        ) : null}

        <BottomSheet
          ref={ref}
          index={0} // 初期位置
          snapPoints={snapPoints}
          animatedPosition={animatedValue}
          // backdropComponent={props => (
          //   // props(
          //   //   animatedIndex: 現在のシートの位置インデックス（Animated.SharedValue<number>型）
          //   //   animatedPosition: 現在のシートの位置（Animated.SharedValue型）
          //   //   style: 背景のデフォルトスタイル
          //   // )
          //   <View {...props} style={[props.style, styles.backdrop]} />
          // )}
        >
          {bottomSheetContent ?? <></>}
        </BottomSheet>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1, // 親コンテナに flex: 1 を指定
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  markerContainer: {
    position: 'absolute',
    top: 0,
    right: 10,
    // zIndex: 1, // mapViewより上に表示
  },
});

export default React.memo(TopSheetComponent);
