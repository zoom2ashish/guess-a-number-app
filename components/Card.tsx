import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ViewStyle } from 'react-native';

export type CardProps = PropsWithChildren<{
  style?: ViewStyle
}>

const Card = (props: CardProps) => {
  return (
    <View style={{...styles.card, ...props.style}}>
      {props.children}
    </View>
  )
};

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 6,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  }
});

export default Card;

