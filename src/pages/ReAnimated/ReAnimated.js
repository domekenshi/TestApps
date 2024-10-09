import React, {useRef} from 'react';
import {View, ScrollView, Animated, Button, StyleSheet} from 'react-native';

const ReAnimated = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // 初期値を0（透明）に設定

  const handleScroll = event => {
    const scrollY = event.nativeEvent.contentOffset.y;

    // スクロール位置に応じてアニメーションの値を変更
    const opacity = scrollY > 100 ? 1 : scrollY / 100; // 100px以上スクロールしたら表示

    Animated.timing(fadeAnim, {
      toValue: opacity,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16} // スクロールイベントのサンプリング頻度
      >
        <View style={styles.content}>
          {/* コンテンツを追加 */}
          <View style={styles.box}>
            <Button title="Scroll to see the button" onPress={() => {}} />
          </View>
          {/* その他のコンテンツ */}
          {Array.from({length: 30}).map((_, index) => (
            <View key={index} style={styles.box}>
              <Button title={`Item ${index + 1}`} onPress={() => {}} />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* アニメーションされたボタン */}
      <Animated.View style={[styles.fadingButton, {opacity: fadeAnim}]}>
        <Button title="Action" onPress={() => alert('Button Pressed!')} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  box: {
    height: 100,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  fadingButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    width: 100,
  },
});

export default ReAnimated;
