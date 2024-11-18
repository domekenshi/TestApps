import {useCallback} from 'react';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const MyAnimatedBottomSheetScrollView = () => {
  const scrollY = useSharedValue(0);

  const handleScroll = useCallback(event => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    // スクロール位置に基づいたスタイルの変更
    return {
      opacity: interpolate(scrollY.value, [0, 100], [1, 0.5]),
    };
  });

  return (
    <BottomSheetScrollView onScroll={handleScroll} scrollEventThrottle={16}>
      <Animated.View style={animatedStyle}>
        {/* アニメーションされるコンテンツ */}
      </Animated.View>
    </BottomSheetScrollView>
  );
};
