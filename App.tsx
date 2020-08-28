import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState<number>();
  const [guessRounds, setGuessRounds] = useState<number>(0);
  const [isAppReady, setIsAppReady] = useState(false);

  if (!isAppReady) {
    return <AppLoading startAsync={fetchFonts}
      onFinish={() => setIsAppReady(true)}
      onError={(err) => console.log(err) }
      />
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(undefined);
  };

  const startGameHandler = (selectedNumber?: number) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const endGameHandler = (numOfRounds: number) => {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onEndGame={endGameHandler}/>
  } else if (guessRounds > 0) {
    content = <GameOverScreen numOfRounds={guessRounds} userNumber={userNumber || 0} onNewGame={configureNewGameHandler}/>
  }

  return (
    <View style={styles.screen}>
      <Header title='Guess a Number' />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
