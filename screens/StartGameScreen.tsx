import React, { useState, useEffect } from 'react';
import { Alert, Button, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';
import defaultStyles from '../constants/default-styles';

export type StartGameProps = {
  onStartGame: (value: number | undefined) => void;
};

const StartGameScreen = (props: StartGameProps) => {

  const [enteredValue, setEnteredValue] =useState<string>('');
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [selectedNumber, setSelectedNumber] = useState<number>();
  const [buttonWidth, setButtonWidth] = useState<number>(Dimensions.get('window').width / 4);

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };

    Dimensions.addEventListener('change', updateLayout);

    // Return function to remove event listener when component unmounted
    return () => Dimensions.removeEventListener('change', updateLayout);
  }, []);

  const numberInputHandler = (value: string) => {
    setEnteredValue(value.replace(/[^0-9]/ig, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber > 99) {
      Alert.alert('Invalid number.', 'Number has to be a number between 1 and 99.', [
        { text: 'Okey', style: 'destructive', onPress: resetInputHandler }
      ])
      return;
    }

    setConfirmed(true);
    setSelectedNumber(+enteredValue);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text style={styles.text}>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
      </Card>
    )
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game</Text>
            <Card style={styles.inputContainer}>
              <Text>Select a number</Text>
              <Input
                style={styles.textInput}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                value={enteredValue}
                onChangeText={numberInputHandler}
              />
              <View style={styles.buttonContainer}>
                <View style={{width: buttonWidth}}>
                  <Button title="Reset" onPress={() => resetInputHandler()} color={Colors.accent} />
                </View>
                <View style={{width: buttonWidth}}>
                  <Button
                    title="Confirm"
                    onPress={() => confirmInputHandler()}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  title: {
    ...{
      fontSize: 20,
      marginVertical: 10
    },
    ...defaultStyles.titleText18
  },
  inputContainer: {
    width: "90%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: 'center'
  },
  textInput: {
    width: 50,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: Dimensions.get('window').width / 4
  },
  summaryContainer: {
    marginVertical: 20,
    alignItems: 'center'
  },
  text: {
  }
});

export default StartGameScreen;

