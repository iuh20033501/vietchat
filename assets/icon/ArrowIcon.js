// ArrowIcon.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ArrowIcon = ({ width, height, color }) => {
  return (
    <View style={{ width, height }}>
     <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <Path d="M18 12L6 12M6 12L10 16M6 12L10 8" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
</Svg>

    </View>
  );
};

const styles = StyleSheet.create({});

export default ArrowIcon;
