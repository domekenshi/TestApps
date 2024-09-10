import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
const AddBtn = ({onPress}) => {
  return (
    <TouchableOpacity>
      <Button
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.containerStyle}
        titleStyle={styles.titleStyle}
        // style={styles.btnBox}
        title="追加"
        onPress={onPress}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: 100,
    backgroundColor: 'blue',
    borderRadius: 100,
  },
  containerStyle: {
    alignSelf: 'center',
    margin: 5,
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddBtn;
