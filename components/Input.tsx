import React from 'react';
import { StyleSheet, TextInput, View, TextStyle, StyleProp, TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
  style?: TextStyle
}

const Input = (props: InputProps) => {
  return (
      <TextInput {...props} style={{...styles.textInput, ...props.style}}></TextInput>
  );
};

const styles = StyleSheet.create({
  inputContainer: {},
  textInput: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10
  }
});

export default Input;