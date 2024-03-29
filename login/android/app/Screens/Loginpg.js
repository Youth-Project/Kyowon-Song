import React, { useState, useEffect } from 'react';
import {
  NavigationContainer,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet, Email
} from 'react-native';
import Eye from "./components/AssetExample";


const Loginpg = ({ navigation }) => {
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');
const [validation, setValidation] = useState("");

const handlePasswordChange = (value) => {
    setPassword(value);

   
  };
  const handleEmailChange = (val) => {
    setEmail(val);
  };


{/* 로그인 정보 저장 async storage */}
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Load stored email and password when the component mounts
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


{/* eye 버튼 */}
const [eye, setEye] = useState({
    eye: false,
    eyeOn: false,
  });
  const [isSecure, setIsSecure] = useState(true);

  const handleEyeClick = (buttonName) => {
    setEye((prevStates) => ({
      ...prevStates,
      [buttonName]: !prevStates[buttonName],
    }));
    setIsSecure((prevIsSecure) => !prevIsSecure);
  }; 

  const getImageForEye = (buttonName) => {
    if (eye[buttonName]) {
      switch (buttonName) {
        case 'eyeOpen':
          return require('./assets/icons/eyeOn.png');
        default:
          return require('./assets/icons/eye.png');
      }
    } 
    else{
      return require('./assets/icons/eye.png');
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
  event.navigation.navigate('Budgetpg');
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
        keyboardType="email"
      />


  <View>
  <TextInput
        style={styles.input}
        value={password}
        onChangeText={handlePasswordChange}
        placeholder="비밀번호"
        keyboardType="email"

secureTextEntry={isSecure}
      />
{/* eye버튼 */}
      <TouchableOpacity style={{ position: 'absolute', right: 60, }} onPress={() => handleEyeClick('eyeOpen')}>
        <Image style={{left: 50, top: 7 }} source={getImageForEye('eyeOpen')}/>
    </TouchableOpacity>
  </View>

        <Text style={{bottom: 105, fontSize: 12,
    color: '#ff0000', }}>{validation}</Text>


      <TouchableOpacity
        style={[styles.save, {backgroundColor: isPressed ? '#FEA655' : '#ccc'} ]} 
        onPress={toggleRememberMe}> 
        <Image style={{left: 2, top: 3}} source={require('./assets/icons/checkIcon.png')}/>
      </TouchableOpacity>
    <Text style={{ fontSize: 12,
    color: '#757575', bottom: 22, right: 50 }}>로그인 정보 저장</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={()=> navigation.navigate('SuccessLogin')}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signUp}
        onPress={() => navigation.navigate('SignupPg')}>
        <Text style={styles.saveTxt}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.reset}
        onPress={() => navigation.navigate('ForgotPW')}>
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
    height: 38,
    width: 232,
    marginBottom: 30,
    color: '#878787',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth:0,
    paddingTop: 7,
  },
  save: {
    position: 'absolute',
    left: 85,
    top: 395,
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
    height: 38,
    width: 232,
    top: 130,
    marginBottom: 40,
    color: '#878787',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth:0,
    paddingTop: 7,
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
    height: 38,
    width: 232,
    top: 80,
    marginBottom: 40,
    color: '#878787',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth:0,
    paddingTop: 7,
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
    height: 38,
    width: 160,
    top: 82,
    right: 35,
    marginBottom: 10,
    color: '#878787',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth:0,
    paddingTop: 7,
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
