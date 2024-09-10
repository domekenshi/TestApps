import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ScrollViewTemplate from '../template/ScrollViewTemplate';
export default function Detail() {
  return (
    <ScrollViewTemplate>
      <View>
        <Text style={styles.text}>テストページ</Text>
      </View>
    </ScrollViewTemplate>
  );
}

const styles = StyleSheet.create({
  btnBox: {
    backgroundColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
});
