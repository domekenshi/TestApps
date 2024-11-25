import React, {useCallback, useMemo, useRef, useState, memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
// import {useNavigation} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const handleScroll = event => {
  console.log('Scroll event:', event.nativeEvent.contentOffset);
};
/**
 * タブコンポーネント
 * @returns
 */
const ScrolleButton = memo(() => {
  const buttonItem = useMemo(
    () => [
      {title: 'btn1'},
      {title: 'btn2'},
      {title: 'btn3'},
      {title: 'btn4'},
      {title: 'btn5'},
      {title: 'btn6'},
    ],
    [],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const setActiveTab = useCallback(
    index => {
      setActiveIndex(index);
    },
    [activeIndex],
  );

  return (
    <BottomSheetScrollView
      horizontal={true} //横スクロールを有効
      scrollEnabled={true}
      enableOverDrag={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      nestedScrollEnabled={true}
      showsHorizontalScrollIndicator={false}
      Style={styles.bottomsheetscrollrow}>
      {buttonItem.map((item, index) => {
        return (
          <BottomSheetView key={index}>
            <AnimatedTouchableOpacity
              style={[
                styles.btnContainer,
                {backgroundColor: activeIndex === index ? 'aqua' : 'gray'},
              ]}
              onPress={() => setActiveTab(index)}>
              <Text style={styles.btnTxt}>{item.title}</Text>
            </AnimatedTouchableOpacity>
          </BottomSheetView>
        );
      })}
    </BottomSheetScrollView>
  );
});
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
const statusBarHeight = getStatusBarHeight();
// アニメーション用のTouchableOpacity;作成
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Gorhom = ({Content = DefaultContent}) => {
  const bottomSheetRef = useRef(null);
  const [isFullyExpanded, setIsFullyExpanded] = useState(false);
  const snapPoints = useMemo(() => ['25%', '70%', '90%'], []);
  const animatedPosition = useSharedValue(0);
  const opacity = useSharedValue(1);
  // const navigation = useNavigation();
  // ステータスバーの高さを取得

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
    console.log(bottomSheetRef.current);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.collapse();
    }
  }, []);

  const logPosition = useCallback(position => {
    console.log('現在の位置情報:', position);
  }, []);

  useAnimatedReaction(
    () => animatedPosition.value,
    position => {
      // 数字が低いほどトップに近い
      const maxSnapPoint = 90; // スナップポイントの最大値（90%）
      const fadeStartPoint = 110; // ヘッダーがフェードアウトし始めるポイント
      let newOpacity;
      if (maxSnapPoint >= position) {
        newOpacity = 1;
      } else if (fadeStartPoint <= position) {
        newOpacity = 0;
      } else {
        // フェードアウトの範囲を縮小して、より早く変化が始まるように調整
        newOpacity = maxSnapPoint / position;
      }
      opacity.value = withTiming(newOpacity, {
        duration: 250,
        easing: Easing.inOut(Easing.ease),
      });
      // デバック用ボトムシート位置情報取得
      runOnJS(logPosition)(position);
    },
  );

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
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
        enableContentPanningGesture={true}
        enablePanDownToClose={true}>
        {/* ScrollViewが使われていたら内部のScrollViewにnestedScrollEnabled={true} */}
        <ScrolleButton />
        {/* <BottomSheetScrollView
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.contentContainer}>
          <ScrolleButton />
          <Content />
        </BottomSheetScrollView> */}
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  bottomsheetscrollrow: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    paddingHorizontal: 10, // 横方向のパディングを追加
    gap: 20,
    height: '100%',
  },

  btnContainer: {
    backgroundColor: 'aqua',
    borderRadius: 5,
  },
  btnTxt: {
    fontSize: 40,
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
    zIndex: 200,
    borderRadius: 0,
    width: '100%',
    height: 60 + statusBarHeight,
    paddingLeft: 20,
    paddingTop: statusBarHeight + 10,
    backgroundColor: '#f0efef',
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
