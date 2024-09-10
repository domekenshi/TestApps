import React from 'react';
import {Button, View, StyleSheet, ScrollView} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';

export default function Scaling() {
  const width = useSharedValue(100);
  const expandPress = () => {
    width.value = withSpring(width.value + 50);
  };
  const shrinkPress = () => {
    width.value = withSpring(width.value - 50);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.flex}>
          <Animated.View style={{...styles.box, width}} />
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button onPress={expandPress} title="拡大ボタン" />
            </View>
            <View style={styles.button}>
              <Button onPress={shrinkPress} title="縮小ボタン" />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  flex: {
    flex: 1,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#b58df1',
    borderRadius: 20,
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: '#b58df1',
    borderRadius: 20,
  },
  buttons: {
    flex: 1,
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    marginVertical: 50,
  },
  button: {
    flex: 1,
    paddingHorizontal: 30,
  },
});
