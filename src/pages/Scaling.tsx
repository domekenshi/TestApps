import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ScrollViewTemplate from '../template/ScrollViewTemplate';

export default function Scaling() {
  return (
    <ScrollViewTemplate>
      <View style={styles.titleBox}>
        <Text style={styles.titleTxt}>遊び場</Text>
      </View>
    </ScrollViewTemplate>
  );
}

const styles = StyleSheet.create({
  titleBox: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  titleTxt: {
    fontSize: 50,
  },
});
