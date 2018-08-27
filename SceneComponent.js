import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import StaticContainer from 'react-static-container';

const SceneComponent = (Props) => {
  const { shouldUpdated, ...props } = Props;
  return <View {...props}>
    <StaticContainer shouldUpdate={shouldUpdated}>
      {props.children}
    </StaticContainer>
  </View>;
};

export default SceneComponent;
