import React from 'react';
import {
  StatusBar,
  useColorScheme,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RootStackParamList} from '../types/appTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type navProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};
export default function HomeScreen({navigation}: navProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    // backgroundColor: 'black',
  };
  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.buttonContainar}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RootMapScreen');
          }}>
          <Text style={styles.buttonTxt}>test</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  buttonContainar: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'black',
  },
  buttonTxt: {
    textAlign: 'center',
    fontSize: 28,
    color: '#41bce9',
  },
});
