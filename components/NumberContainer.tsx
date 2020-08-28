import React, { PropsWithChildren } from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import Colors from '../constants/colors';

export interface NumberContainerProps {
  style?: TextStyle;
}

const NumberContainer = (props: PropsWithChildren<NumberContainerProps>) => {

  return (
  <View style={styles.container}>
    <Text style={{...styles.number, ...props.style}}>{props.children}</Text>
  </View>);
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  number: {
    color: Colors.primary,
    fontSize: 22
  }
});


export default NumberContainer;

