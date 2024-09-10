import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import itemList from '../../json/Item.json';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/RootStackParamList';

export default function ItemList(): JSX.Element {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const items = itemList.map(item => {
    return (
      <TouchableOpacity
        key={item.name}
        style={styles.touchableOpacity}
        onPress={() => {
          navigation.push(item.root as keyof RootStackParamList, {
            subItem: item.subItem.length > 0 ? item.subItem : null,
          });
        }}>
        <View style={styles.btnBox}>
          <Text style={styles.btnTxt}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  });
  return <>{items}</>;
}

const styles = StyleSheet.create({
  touchableOpacity: {
    marginVertical: 10,
  },
  btnBox: {
    backgroundColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  btnTxt: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
});
