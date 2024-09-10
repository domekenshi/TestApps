import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import app from '../../app.json';
import ItemList from './ItemList';
import {RootStackParamList} from '../types/RootStackParamList';
import {StackNavigationProp} from '@react-navigation/stack';
import ScrollViewTemplate from '../template/ScrollViewTemplate';

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList, // ここにはあなたのルートスタックのパラメータリストを指定
  'Home' // この画面の名前
>;

type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<HomeProps> = () => {
  return (
    <ScrollViewTemplate>
      <View style={styles.titleBox}>
        <Text style={styles.titleTxt}>{app.name}</Text>
      </View>
      <ItemList />
    </ScrollViewTemplate>
  );
};

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

export default HomeScreen;
