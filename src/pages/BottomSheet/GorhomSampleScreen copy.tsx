import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const DefaultContent = () => (
  <View style={styles.defaultContent}>
    <Text style={styles.title}>デフォルトのボトムシート内容</Text>
    {[...Array(20)].map((_, i) => (
      <Text key={i} style={styles.item}>
        アイテム {i + 1}
      </Text>
    ))}
  </View>
);
// AnimatedTouchableOpacity を作成
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Gorhom = ({Content = DefaultContent}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isFullyExpanded, setIsFullyExpanded] = useState(false);
  const opacity = useSharedValue(0); // ReanimatedのsharedValueを使う

  const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log('handleSheetChanges', index);
      setIsFullyExpanded(index === 2);
      opacity.value = withTiming(index === 2 ? 1 : 0, {duration: 300}); // 透明度のアニメーション
    },
    [opacity],
  );

  const handleVButtonPress = useCallback(() => {
    if (isFullyExpanded) {
      bottomSheetRef.current?.snapToIndex(1);
    }
  }, [isFullyExpanded]);

  // アニメーションスタイル
  const animatedVButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <AnimatedTouchableOpacity
        style={[styles.vButton, animatedVButtonStyle]}
        onPress={handleVButtonPress}>
        <Text style={styles.vButtonText}>V</Text>
      </AnimatedTouchableOpacity>

      <View style={styles.bottonContainer}>
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current?.snapToIndex(1);
          }}>
          <Text style={styles.button}>botton</Text>
        </TouchableOpacity>
      </View>

      <BottomSheet
        backgroundStyle={styles.buttomSheetStyle}
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}>
        <View style={styles.contentContainer}>
          <BottomSheetScrollView
            contentContainerStyle={styles.contentContainer}>
            <Content />
          </BottomSheetScrollView>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f9e5',
  },
  bottonContainer: {
    flex: 1,
    backgroundColor: '#b3edf3',
    alignItems: 'center',
    paddingTop: 150,
  },
  button: {
    fontSize: 30,
    backgroundColor: '#eaa0a0',
    borderRadius: 15,
    padding: 10,
  },
  buttomSheetStyle: {
    borderWidth: 1,
    borderRadius: 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  header: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  panelHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 2,
  },
  vButton: {
    zIndex: 1000,
    borderRadius: 0,
    width: '100%',
    height: 40,
    paddingLeft: 20,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  vButtonText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  defaultContent: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Gorhom;
