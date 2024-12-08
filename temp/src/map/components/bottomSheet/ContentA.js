import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
// import DebugUtils from '../../../common/DebugUtils';
const ContentA = React.forwardRef((props, ref) => {
  return (
    <BottomSheetScrollView>
      <View style={styles.content}>
        <Text>Test Content</Text>
      </View>
    </BottomSheetScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1, // 親コンテナに flex: 1 を指定
  },
});

export default React.memo(ContentA);
