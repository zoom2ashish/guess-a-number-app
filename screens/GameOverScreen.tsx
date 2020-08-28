import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';
import defaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';

export interface GameOverScreenProps {
  numOfRounds: number;
  userNumber: number;
  onNewGame: () => void;
}

const GameOverScreen = (props: GameOverScreenProps) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={defaultStyles.titleText18}>Game Over!!!</Text>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/success.png')} style={styles.image}/>
          {/* <Image source={{uri: 'https://cdn.pixabay.com/photo/2014/05/03/00/56/summerfield-336672_1280.jpg'}}
            style={styles.image}
            resizeMode="cover"
          /> */}
        </View>
        <Text style={defaultStyles.bodyText}>Number of rounds: {props.numOfRounds}</Text>
        <Text style={defaultStyles.bodyText}>Number was: {props.userNumber}</Text>
        <MainButton onPress={() => props.onNewGame()}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30
  },
  image: {
    width: '100%',
    height: '100%',
  }
});

export default GameOverScreen;