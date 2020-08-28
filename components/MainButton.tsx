import React, { Component, PropsWithChildren } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Button } from 'react-native';
import Colors from '../constants/colors';
import { TouchableNativeFeedback } from 'react-native';
export interface MainButtonProps {
  onPress: () => void
}

const MainButton = (props: PropsWithChildren<MainButtonProps>) => {
  let ButtonComponent: any = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 25
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18
  }
});
export default MainButton;