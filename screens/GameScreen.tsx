import React, { Component, useState, useRef, useEffect, ReactNode } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList, ListRenderItemInfo, Dimensions } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import defaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';

/**
|--------------------------------------------------
| Generate number
|--------------------------------------------------
*/

const generateRandomBetween = (min: number, max: number, exclude?: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max,  exclude);
  }

  return rndNum;
}

export interface GuesScreenProps {
  userChoice: number;
  onEndGame: (value: number) => void;
}

const renderListItem = <T extends ReactNode>(numOfRounds: number, itemData: ListRenderItemInfo<T>) => (
  <View style={styles.listItem}>
    <Text style={defaultStyles.bodyText}>#{numOfRounds - itemData.index}</Text>
    <Text style={defaultStyles.bodyText}>{itemData.item}</Text>
  </View>
);

const GameScreen = (props: GuesScreenProps) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [pastGuesses, setPastGuesses] = useState<number[]>([initialGuess]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const {userChoice, onEndGame } = props;
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onEndGame(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onEndGame]);

  const nextGuessHandler = (direction: string) => {
    if ((direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert('Don\'t lie!', 'You know that this is wrong...', [
        {text: 'Sorry', style: 'cancel'}
      ]);
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextGuess = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextGuess);
    setPastGuesses(curPastGuesses => [nextGuess, ...curPastGuesses]);
  };

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.titleText18}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler("lower")}>
          <Ionicons name="md-remove"  size={24} color="white"/>
        </MainButton>
        <MainButton onPress={() => nextGuessHandler("greater")}>
          <Ionicons name="md-add"  size={24} color="white"/>
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView> */}
        <FlatList
          contentContainerStyle={styles.list}
          data={pastGuesses}
          renderItem={(itemData) => renderListItem(pastGuesses.length, itemData)}
          keyExtractor={(item) => item.toString()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: 350,
    maxWidth: '90%'
  },
  listContainer: {
    width: Dimensions.get('window').width > 500 ? "60%" : "90%",
    marginVertical: 15,
    flex: 1
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end"
  },
  listItem: {
    borderBottomColor: "#CCCCCC",
    borderBottomWidth: 1,
    padding: 15,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  }
});

export default GameScreen;