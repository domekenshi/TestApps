import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  withTiming,
  Easing,
} from 'react-native-reanimated';
// import {useNavigation} from '@react-navigation/native';

/**
 * ダミー
 * @returns
 */
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

// アニメーション用のTouchableOpacity;作成
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Gorhom = ({Content = DefaultContent}) => {
  const bottomSheetRef = useRef(null);
  const [isFullyExpanded, setIsFullyExpanded] = useState(false);
  const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);
  const animatedPosition = useSharedValue(0);
  const opacity = useSharedValue(1);
  // const navigation = useNavigation();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const handleSheetChanges = useCallback(index => {
    const isExpand = index === 2;
    if (isExpand) {
      setIsFullyExpanded(isExpand);
      // navigation.setOptions({
      //   headerShown: false,
      // });
    }
    // else {
    //   navigation.setOptions({
    //     headerShown: true,
    //   });
    // }
  }, []);

  const handleVButtonPress = useCallback(() => {
    if (isFullyExpanded) {
      bottomSheetRef.current?.snapToIndex(1);
      // navigation.setOptions({
      //   headerShown: true,
      // });
    }
  }, [isFullyExpanded]);

  const handleBackgroundPress = useCallback(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.collapse();
    }
  }, []);
  useAnimatedReaction(
    () => animatedPosition.value,
    position => {
      let newOpacity;
      if (position <= 0) {
        newOpacity = 1;
      } else if (position >= 100) {
        newOpacity = 0;
      } else {
        newOpacity = 1 - position / 100;
      }

      opacity.value = withTiming(newOpacity, {
        duration: 30,
        easing: Easing.out(Easing.cubic),
      });
    },
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.background}
        activeOpacity={1}
        onPress={handleBackgroundPress}>
        <View style={styles.bottonContainer}>
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current?.snapToIndex(1);
            }}>
            <Text style={styles.button}>botton</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <AnimatedTouchableOpacity
        style={[styles.vButton, animatedStyle]}
        onPress={handleVButtonPress}>
        <Text style={styles.vButtonText}>V</Text>
      </AnimatedTouchableOpacity>

      <BottomSheet
        backgroundStyle={styles.buttomSheetStyle}
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        animatedPosition={animatedPosition}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <Content />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
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
    zIndex: 100,
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
