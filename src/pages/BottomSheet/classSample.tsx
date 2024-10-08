import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

class Gorhom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullyExpanded: false,
    };
    this.bottomSheetRef = React.createRef();
    this.snapPoints = ['25%', '50%', '100%'];
  }

  handleSheetChanges = index => {
    console.log('handleSheetChanges', index);
    this.setState({isFullyExpanded: index === 2});
  };

  handleVButtonPress = () => {
    if (this.state.isFullyExpanded) {
      this.bottomSheetRef.current?.snapToIndex(1);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* ... rest of the JSX ... */}
        <BottomSheet
          backgroundStyle={{
            borderWidth: 1,
            borderRadius: 0,
          }}
          ref={this.bottomSheetRef}
          index={1}
          snapPoints={this.snapPoints}
          handleComponent={null}
          onChange={this.handleSheetChanges}
          enablePanDownToClose={false}
          enableContentPanningGesture={!this.state.isFullyExpanded}
          enableOverDrag={!this.state.isFullyExpanded}>
          {this.state.isFullyExpanded ? (
            <TouchableOpacity
              style={styles.vButton}
              onPress={this.handleVButtonPress}>
              <Text style={styles.vButtonText}>V</Text>
            </TouchableOpacity>
          ) : null}
          <View style={styles.contentContainer}>
            <Text>ボトムシートの内容</Text>
          </View>
        </BottomSheet>
      </View>
    );
  }
}

// ... styles remain the same ...

export default Gorhom;
