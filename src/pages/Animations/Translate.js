import React from 'react';
import {Button, View, StyleSheet, ScrollView} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';

export default function Translate() {
  //   const width = useSharedValue(100);
  const translateX = useSharedValue(0);
  //   const expandPress = () => {
  //     width.value = withSpring(width.value + 50);
  //   };
  //   const shrinkPress = () => {
  //     width.value = withSpring(width.value - 50);
  //   };

  const handleTranslatePlus = () => {
    translateX.value += 30;

    console.log(translateX.value);
  };
  const handleTranslateMinus = () => {
    translateX.value -= 30;

    console.log(translateX.value);
  };
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: withSpring(translateX.value * 2)}],
  }));
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <View style={styles.flex}>
          <Animated.View style={{...styles.box, width}} />
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button onPress={expandPress} title="拡大ボタン" />
            </View>
            <View style={styles.button}>
              <Button onPress={shrinkPress} title="縮小ボタン" />
            </View>
          </View>
        </View> */}
        {/* <View
          style={{
            height: 1,
            flex: 1,
            width: '100%',
            borderWidth: 1,
            marginVertical: 30,
          }}
        /> */}
        <View style={styles.flex}>
          <Animated.View style={[styles.box2, animatedStyles]} />
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button onPress={handleTranslatePlus} title="右へ" />
            </View>
            <View style={styles.button}>
              <Button onPress={handleTranslateMinus} title="左へ" />
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
