import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  useAnimatedReaction,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';

const AnimatedHeader = ({animatedIndex}) => {
  const opacity = useSharedValue(0);

  useAnimatedReaction(
    () => animatedIndex.value,
    currentIndex => {
      opacity.value = withTiming(interpolate(currentIndex, [0, 1], [0, 1]), {
        duration: 300,
      });
    },
    [animatedIndex],
  );

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.header, headerStyle]}>
      <Text style={styles.headerText}>店舗検索結果</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AnimatedHeader;
