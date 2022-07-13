import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const buttonWidth = (Dimensions.get('window').width - (8 * 5)) / 4;

export default function App() {
  const [answerValue, setAnswerValue] = useState(0);
  const [readyToReplace, setReadyToReplace] = useState(true);
  const [memoryValue, setMemoryValue] = useState(0);
  const [operatorValue, setOperatorValue] = useState(0);
  const [chainValue, setChainValue] = useState(0);
  const [equationValue, setExpressionValue] = useState(0);

  function buttonPressed(value) {
    if (!isNaN(value) || value == '.') {
      setAnswerValue(() => handleNumber(value));
      if (equationValue == 0 || memoryValue == 0) {
        setExpressionValue(() => handleNumber(value));
      }
      else {
        setExpressionValue(equationValue + value);
      }
    }
    else if (value == 'C') {
      setAnswerValue(0);
      setMemoryValue(0);
      setOperatorValue(0);
      setReadyToReplace(true);
      setExpressionValue(0);
    }
    else if (value == '=') {
      calculateEquals();
      setMemoryValue(0);
      setOperatorValue(0);
      setReadyToReplace(true);
      setChainValue(0);
    }
    else if (value == '+/-') {
      setAnswerValue(-answerValue);
      if (operatorValue == 0) {
        setExpressionValue(-answerValue);
      } else {
        setExpressionValue(equationValue.slice(0, -answerValue.length) + -answerValue);
      }
    }
    else if (value == '%') {
      var newValue = answerValue * 0.01;
      setAnswerValue(newValue);
      if (operatorValue == 0) {
        setExpressionValue(newValue);
      } else {
        setExpressionValue(equationValue.slice(0, -answerValue.length) + (newValue))
      }
    }
    else {
      if (operatorValue != '0') {
        setChainValue(calculateEquals());
      }
      setExpressionValue(String(equationValue) + ' ' + value + ' ');
      setMemoryValue(answerValue);
      setReadyToReplace(true);
      setOperatorValue(value);
    }
  }

  function handleNumber(value) {
    if (readyToReplace == true) {
      setReadyToReplace(false);
      if (answerValue == 0 && value == '.') {
        return String(answerValue) + value;
      } else {
        return value;
      }
    } else {
      return String(answerValue) + value;
    }
  }

  function calculateEquals() {
    if (chainValue == 0) {
      var prev = parseFloat(memoryValue);
    } else {
      var prev = parseFloat(chainValue);
    }
    var curr = parseFloat(answerValue);
    var newValue;
    switch (operatorValue) {
      case '/':
        newValue = prev / curr;
        setAnswerValue(newValue);
        setExpressionValue(equationValue + ' = ' + (newValue));
        return newValue;
      case 'x':
        newValue = prev * curr;
        setAnswerValue(newValue);
        setExpressionValue(equationValue + ' = ' + (newValue));
        return newValue;
      case '-':
        newValue = prev - curr;
        setAnswerValue(newValue);
        setExpressionValue(equationValue + ' = ' + (newValue));
        return newValue;
      case '+':
        newValue = prev + curr;
        setAnswerValue(newValue);
        setExpressionValue(equationValue + ' = ' + (newValue));
        return newValue;
      default:
        return null;
    }
  }

  const CalBtn = (props) => (
    <TouchableOpacity style={[props.shape, props.btnColor]} onPress={()=>buttonPressed(props.txt)}>
      <Text style={props.txtColor}>{props.txt}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.equationText}>{equationValue}</Text>
        <Text style={styles.resultText}>{answerValue}</Text>
        <View style={styles.row}>
          <CalBtn shape={styles.roundBtn} btnColor={{backgroundColor:'#a5a5a5'}} txt='C' txtColor={styles.dark} />
          <CalBtn shape={styles.roundBtn} btnColor={{backgroundColor:'#a5a5a5'}} txt='+/-' txtColor={styles.dark} />
          <CalBtn shape={styles.roundBtn} btnColor={{backgroundColor:'#a5a5a5'}} txt='%' txtColor={styles.dark} />
          <CalBtn shape={styles.roundBtn} btnColor={{backgroundColor:'#47cc62'}} txt='/' txtColor={styles.light} />
        </View>
        <View style={styles.row}>
          <CalBtn shape={styles.roundBtn} btnColor={{backgroundColor:'#343434'}} txt='7' txtColor={styles.light} />
          <CalBtn shape={styles.roundBtn} btnColor={{backgroundColor:'#343434'}} txt='8' txtColor={styles.light} />
          <CalBtn shape={styles.roundBtn} btnColor={{backgroundColor:'#343434'}} txt='9' txtColor={styles.light} />
          <CalBtn shape={styles.roundBtn} btnColor={{backgroundColor:'#47cc62'}} txt='x' txtColor={styles.light} />
        </View>
        <View style={styles.row}>
          <CalBtn shape={styles.roundBtn} btnColor={{backgroundColor:'#343434'}} txt='4' txtColor={styles.light} />
          <CalBtn shape={styles.roundBtn} btnColor={{backgroundColor:'#343434'}} txt='5' txtColor={styles.light} />
          <CalBtn shape={styles.roundBtn} btnColor={{backgroundColor:'#343434'}} txt='6' txtColor={styles.light} />
          <CalBtn shape={styles.roundBtn} btnColor={{backgroundColor:'#47cc62'}} txt='-' txtColor={styles.light} />
        </View>
        <View style={styles.row}>
          <CalBtn shape={styles.roundBtn} btnColor={{backgroundColor:'#343434'}} txt='1' txtColor={styles.light} />
          <CalBtn shape={styles.roundBtn} btnColor={{backgroundColor:'#343434'}} txt='2' txtColor={styles.light} />
          <CalBtn shape={styles.roundBtn} btnColor={{backgroundColor:'#343434'}} txt='3' txtColor={styles.light} />
          <CalBtn shape={styles.roundBtn} btnColor={{backgroundColor:'#47cc62'}} txt='+' txtColor={styles.light} />
        </View>
        <View style={styles.row}>
          <CalBtn shape={styles.ovalBtn} btnColor={{backgroundColor:'#343434'}} txt='0' txtColor={styles.light} />
          <CalBtn shape={styles.roundBtn} btnColor={{backgroundColor:'#343434'}} txt='.' txtColor={styles.light} />
          <CalBtn shape={styles.roundBtn} btnColor={{backgroundColor:'#47cc62'}} txt='=' txtColor={styles.light} />
        </View>
        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-end',
  },
  equationText: {
    color: 'gray',
    textAlign: 'right',
    marginRight: 15,
    fontSize: 30,
  },
  resultText: {
    color: 'white',
    fontSize: 100,
    textAlign: 'right',
    marginRight: 10,
  },
  row: { flexDirection: 'row' },
  roundBtn: {
    margin: 5,
    width: buttonWidth,
    aspectRatio: 1,
    borderRadius: (buttonWidth / 2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ovalBtn: {
    margin: 5,
    width: (buttonWidth * 2) + 10,
    borderRadius: (buttonWidth / 2),
    paddingLeft: 35,
    justifyContent: 'center',
  },
  dark: { color: 'black', fontSize: 40 },
  light: { color: 'white', fontSize: 40 },
});
