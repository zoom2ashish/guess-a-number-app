import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/colors';

export type HeaderProps = {
  title: string
};

const Header = (props: HeaderProps) => {
  return (
    <View style={{...styles.headerBase, ...Platform.select({ios: styles.headerIOS, android: styles.headerAndroid})}}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
    borderBottomColor: Platform.OS === 'ios' ? '#CCCCCC': 'transparent',
    borderBottomWidth: Platform.OS === 'ios' ? 1:  0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerIOS: {
    backgroundColor: 'white',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? Colors.primary : 'white',
    fontSize: 18,
    fontFamily: 'open-sans-bold'
  }
});

export default Header;