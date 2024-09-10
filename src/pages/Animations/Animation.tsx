import React from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';

export default function Animation(props?) {
  const subItem = props.route.params.subItem;
  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
    );
  };
  return (
    <>
      <FlatList data={subItem} renderItem={renderItem} />
    </>
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
