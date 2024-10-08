import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';

// デフォルトのContentコンポーネント
const DefaultContent = () => (
  <View style={styles.defaultContent}>
    <Text style={styles.title}>デフォルトのボトムシート内容</Text>
    {[...Array(20)].map((_, i) => (
      <Text key={i} style={styles.item}>
        アイテム {i + 1}
      </Text>
    ))}
  </View>
);

const Gorhom = ({Content = DefaultContent}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isFullyExpanded, setIsFullyExpanded] = useState(false);

  // スナップポイントの設定
  const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);

  // ボトムシートの状態が変化したときのコールバック
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    setIsFullyExpanded(index === 2); // 100%のときはindex 2
  }, []);

  const handleVButtonPress = useCallback(() => {
    if (isFullyExpanded) {
      bottomSheetRef.current?.snapToIndex(1); // 50%に戻す
    }
  }, [isFullyExpanded]);

  return (
    <View style={styles.container}>
      <View style={styles.bottonContainer}>
        <TouchableOpacity>
          <Text style={styles.button}>botton</Text>
        </TouchableOpacity>
      </View>
      <BottomSheet
        backgroundStyle={{
          borderWidth: 1,
          borderRadius: 0,
        }}
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        handleComponent={null} // ヘッダーを削除
        onChange={handleSheetChanges}
        enablePanDownToClose={false}
        enableContentPanningGesture={!isFullyExpanded}
        enableOverDrag={!isFullyExpanded}>
        {/* 戻るボタン */}
        {isFullyExpanded ? (
          <TouchableOpacity style={styles.vButton} onPress={handleVButtonPress}>
            <Text style={styles.vButtonText}>V</Text>
          </TouchableOpacity>
        ) : null}
        <View style={styles.contentContainer}>
          <BottomSheetScrollView
            contentContainerStyle={styles.contentContainer}>
            <Content />
          </BottomSheetScrollView>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#e0f9e5',
  },
  bottonContainer: {
    flex: 1,
    backgroundColor: '#b3edf3',
    alignItems: 'center',
    paddingTop: 150,
  },
  button: {
    fontSize: 30,
    backgroundColor: '#eaa0a0',
    borderRadius: 15,
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  header: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 2,
  },
  vButton: {
    zIndex: 1000,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 10,
  },
  vButtonText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  defaultContent: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default Gorhom;
