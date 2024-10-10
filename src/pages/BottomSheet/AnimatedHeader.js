import React from 'react';
import {Animated} from 'react-native';
import {Header} from '@react-navigation/stack';

const AnimatedHeader = ({scene, previous, navigation, style}) => {
  const {options} = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Animated.View style={[style, options.headerAnimatedStyle]}>
      <Header
        title={title}
        leftButton={previous ? {onPress: navigation.goBack} : undefined}
        style={options.headerStyle}
      />
    </Animated.View>
  );
};

export default AnimatedHeader;
