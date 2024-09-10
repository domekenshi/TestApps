/**
 * スクロールビューの大枠
 */
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';

type TemplateProps = {
  children: React.ReactNode; // 子コンポーネント
};

const ScrollViewTemplate: React.FC<TemplateProps> = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>{children}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
  },
});
export default ScrollViewTemplate;
