import React, { useState, useEffect } from 'react';
import {
  NavigationContainer,
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet, 
  TextInput,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

//import { onSubmit } from './authFunctions';
import { authService } from './firebaseConfig';


function Loginpg({ navigation }) {
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');
const [validation, setValidation] = useState("");
{/* 로그인 정보 저장 async storage */}
const [rememberMe, setRememberMe] = useState(false);

  
const handlePasswordChange = (value) => {
    setPassword(value);
  };
  const handleEmailChange = (val) => {
    setEmail(val);
  };

  useEffect(() => {
    loadLoginInfo();
  }, []);

  const loadLoginInfo = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('storedEmail');
      const storedPassword = await AsyncStorage.getItem('storedPassword');

      if (storedEmail && storedPassword) {
        setEmail(storedEmail);
        setPassword(storedPassword);
        setRememberMe(true);
      }
    } catch (error) {
      console.error('Error loading login information:', error);
    }
  };

{/* 로그인정보 버튼 */}
   const [isPressed, setIsPressed] = useState(false);

  const toggleRememberMe = () => {
    setIsPressed((prevIsRed) => !prevIsRed);
    if(isPressed){
      setRememberMe(!rememberMe);
    }
    
  };





{/* const getLogInfo = async () => {
  const email = await AsyncStorage.getItem('email');
  const password = await AsyncStorage.getItem('password');
}
const saveLogInfo = async () => {
  await AsyncStorage.setItem('email', JSON.stringify(email));
  await AsyncStorage.setItem('password', JSON.stringify(password));
} */}


{/* 수정됨 */}
const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (rememberMe) {
        {/* 로그인 정보 저장 */}
        await AsyncStorage.setItem('storedEmail', email);
        await AsyncStorage.setItem('storedPassword', password);
      }
      {/* 로그인 */}
        await authService.signInWithEmailAndPassword(email, password);
    } catch (error) {
      setValidation('일치하는 이메일 혹은 비밀번호가 없습니다.', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Truffle</Text>
      <TextInput
        style={styles.input}
        val={email}
        onChangeText={handleEmailChange}
        placeholder="이메일"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={handlePasswordChange}
        placeholder="비밀번호"
        keyboardType="email-address"
      />

        {/* 비밀번호나 이메일 안맞았을떄-- 버튼누르고 체크후 띄울수 있게 어떻게하지 */}
        <Text style={{bottom: 20, fontSize: 12,
    color: '#ff0000', }}>{validation}</Text>

      <TouchableOpacity
        style={[styles.save, {backgroundColor: isPressed ? '#FEA655' : '#ccc'} ]} 
        onPress={toggleRememberMe}> 
      </TouchableOpacity>
    <Text style={{ fontSize: 12,
    color: '#757575', bottom: 23, right: 50 }}>로그인 정보 저장</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onSubmit}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signUp}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.saveTxt}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.reset}
        onPress={() => navigation.ForgotPW()}>
        <Text style={styles.saveTxt}>비밀번호 재설정</Text>
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
  },
  save: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly',
    bottom: 15,
    right: 45,
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
  export default Loginpg;
