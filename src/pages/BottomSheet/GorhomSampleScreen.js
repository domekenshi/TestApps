import React, {useMemo, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const Gorhom = ({Content = []}) => {
  const bottomSheetRef = useRef(null);

  // Bottom Sheetで使用するスナップポイントを定義
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // ボタンのデータ
  const buttons = Array.from({length: 10}, (_, index) => `Button ${index + 1}`);

  return (
    <View style={styles.container}>
      {/* Bottom Sheet */}
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Horizontal Scroll Buttons</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => console.log(`${button} clicked`)}>
                <Text style={styles.buttonText}>{button}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Gorhom;
