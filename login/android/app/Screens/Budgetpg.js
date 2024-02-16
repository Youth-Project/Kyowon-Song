import React, { useState, useEffect } from 'react';
import {
  NavigationContainer,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet, 
} from 'react-native';

import { updateUser } from './dbFunctions';



const Budgetpg = ({navigation}) => {
  const [budget, onChangeBudget] = useState('');

  const changeBudget = (value: string) => {
    const removedCommaValue: number = Number(value.replace(/,/g, ''));
    onChangeBudget(removedCommaValue.toLocaleString());
  };


{/* updateUser()들 Budget page랑 ForgotPW랑 각각 다름 */}
  const updateUser = async (userId, updatedData) => {
    if (budget!=="") {
      const userDoc = doc(db, 'users', userId);
  await updateDoc(userDoc, updatedData);
    }
};


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backBTN}> ⟨ </Text>
      </TouchableOpacity>

      <Text style={styles.introBudget}>이번 달 식비 예산을 설정해주세요.</Text>
      <Text style={styles.subTitle}>
        매달 1회 변경 가능하니 신중하게 해주세요 !
      </Text>
      <TextInput
        style={styles.input}
        value={budget}
        onChangeText={changeBudget}
        placeholder="300,000원"
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={updateUser}>
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F9FA', // 배경색상 추가
  },
  title: {
    fontSize: 40,
    top: 47,
    marginBottom: 211,
    fontFamily: 'NanumGothic',
    color: '#000', // 글자색상 추가
  },

  input: {
    fontSize: 15,
    borderWidth: 0.5,
    height: 28,
    width: 232,
    marginBottom: 30,
    color: '#878787',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth:0,
    paddingVertical: 0
  },
  save: {
    position: 'absolute',
    left: 85,
    top: 375,
    width: 15,
    height: 15, 
    borderRadius: 25,
    marginBottom: 20,
  },
  saveTxt: {
    fontSize: 12,
    color: '#757575',
  },
  signUp: {
    top: 105,
    right: 100,
    paddingHorizontal: 100,
  },
  reset: {
    top: 90,
    left: 100,
    paddingHorizontal: 100,
  },

  button: {
    top: 85,
    backgroundColor: '#FEA655',
    paddingVertical: 10,
    paddingHorizontal: 48,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'NanumGothic',
  },

  //budgetpg
  introBudget: {
    fontSize: 20,
    top: 149,
    marginBottom: 211,
    fontFamily: 'NanumGothic',
    color: '#000', // 글자색상 추가
  },
  subTitle: {
    color: '#727272',
    bottom: 45,
  },
    back: {
    top: 42,
    right: 163,
  },
  backBTN: {
    fontSize: 25,
  },

  //signuppg
  topTitle: {
    fontSize: 24,
    top: 12,
  },
  log: {
    top: 193,

  },
  inputS: {
    fontSize: 15,
    borderWidth: 0.5,
    height: 28,
    width: 232,
    top: 130,
    marginBottom: 40,
    color: '#878787',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth:0,
    paddingVertical: 0
  },
  buttonS: {
    top: 183,
    backgroundColor: '#FEA655',
    paddingVertical: 10,
    paddingHorizontal: 48,
    borderRadius: 25,
    marginBottom: 20,
  },
  
  //success
  center: {
    fontSize: 20,
    top: 20,
    marginBottom: 55,
    textAlign: 'center',
  },

  //forgotPW
  inputP: {
    fontSize: 15,
    borderWidth: 0.5,
    height: 28,
    width: 232,
    top: 80,
    marginBottom: 40,
    color: '#878787',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth:0,
    paddingVertical: 0
  },
  buttonP: {
    top: 93,
    backgroundColor: '#FEA655',
    paddingVertical: 10,
    paddingHorizontal: 48,
    borderRadius: 25,
  },
  midButton: {
    right: 48,
    top: 64,
    backgroundColor: '#FEA655',
    paddingVertical: 10,
    paddingHorizontal: 23,
    borderRadius: 25,
  },
  resend: {
    top: 33,
    left: 75,
  },
  inputRe: {
    fontSize: 15,
    borderWidth: 0.5,
    height: 28,
    width: 160,
    top: 82,
    right: 35,
    marginBottom: 10,
    color: '#878787',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth:0,
    paddingVertical: 0
  },
  smallButton: {
    left: 85,
    top: 36,
    backgroundColor: '#FEA655',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
  },
  passwordContent: {
    top: 50,
    fontSize: 12,
    color: '#ff0000',
  },
  errTxt: {
    top: 100,
    fontSize: 12,
    color: '#ff0000',
  },
});

export default Budgetpg;
