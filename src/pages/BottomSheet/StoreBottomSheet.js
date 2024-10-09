import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {ChevronUp} from 'lucide-react-native';

const {height} = Dimensions.get('window');
const HEADER_HEIGHT = 50;
const CONTENT_HEIGHT = height * 0.8;

const Gorhom = () => {
  const translateY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateY.value = Math.max(
        -CONTENT_HEIGHT,
        Math.min(0, ctx.startY + event.translationY),
      );
    },
    onEnd: event => {
      if (
        event.velocityY < -500 ||
        (event.velocityY >= -500 && translateY.value < -CONTENT_HEIGHT / 2)
      ) {
        translateY.value = withSpring(-CONTENT_HEIGHT, {damping: 50});
      } else {
        translateY.value = withSpring(0, {damping: 50});
      }
    },
  });

  const bottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const headerOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [-100, 0],
      [1, 0],
      Extrapolate.CLAMP,
    );
    return {opacity};
  });

  const renderContent = useCallback(() => {
    return (
      <>
        <Text>Search result 1</Text>
        <Text>Search result 2</Text>
        <Text>Search result 3</Text>
        {/* Add more search results here */}
      </>
    );
  }, []);

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.bottomSheet, bottomSheetStyle]}>
          <View style={styles.draggableArea}>
            <View style={styles.draggableIcon} />
          </View>
          <Animated.View style={[styles.header, headerOpacityStyle]}>
            <Text style={styles.headerTitle}>Search Results</Text>
            <ChevronUp color="#6b7280" size={24} />
          </Animated.View>
          <View style={styles.content}>{renderContent()}</View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: CONTENT_HEIGHT,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  draggableArea: {
    width: '100%',
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  draggableIcon: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default Gorhom;
