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



function Loginpg({ navigation }) {
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
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={handlePasswordChange}
        placeholder="비밀번호"
        keyboardType="email"
      />

        {/* 비밀번호나 이메일 안맞았을떄-- 버튼누르고 체크후 띄울수 있게 어떻게하지 */}
        <Text style={{bottom: 20, fontSize: 12,
    color: '#ff0000', }}>{validation}</Text>


      <TouchableOpacity
        style={[styles.save, {backgroundColor: isPressed ? '#FEA655' : '#ccc'} ]} 
        onPress={toggleRememberMe}> 
        <Image style={{left: 2, top: 3}} source={require('./assets/checkIcon.png')}/>
      </TouchableOpacity>
    <Text style={{ fontSize: 12,
    color: '#757575', bottom: 22, right: 50 }}>로그인 정보 저장</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={()=> navigation.navigate('Budgetpg')}>
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

function Budgetpg() {
  const [budget, onChangeBudget] = React.useState('');

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
        onPress={() => navigation.navigate('Back')}>
        <Text style={styles.backBTN}> ⟨ </Text>
      </TouchableOpacity>

      <Text style={styles.introBudget}>이번 달 식비 예산을 설정해주세요.</Text>
      <Text style={styles.subTitle}>
        매달 1회 변경 가능하니 신중하게 해주세요 !
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeBudget}
        updatedData={budget}
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


function SignupPg() {

  const { useState } = React;

{/* catch 오류문구 */}
const [validation, setValidation] = useState("");


{/* try-catch로 수정했는데 맞는지 불확실: 이미 존재하는 이메일인지 체크해야함-- 아님 login()이랑 합쳐야할듯? */}
const addUser = async (userData) => {
try{
  const usersCollection = collection(db, 'users');
  await addDoc(usersCollection, userData);
} catch (error) {
  setValidation('이미 존재하는 이메일입니다.');
}

};



  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordContent, setPasswordContent] = useState('');
  const [passwordContent1, setPasswordContent1] = useState('');
  const [email, setEmail] = useState('');
  const [emailContent, setEmailContent] = useState('');

const validateEmail = email => {
  {/* 이메일 조건설정 */}
    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
}
  const handleEmailChange = (val) => {
    setEmail(val);

    if (val && !validateEmail(val)) {
      setEmailContent('허용되지 않는 이메일 형식입니다.');
    } 
    else {
      setEmailContent('');
    }
  };

{/* 비밀번호 조건설정 */}
  const reg = /^(?=.*[a-zA-Z])(?=.*[\W_])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  const pwCondition = (password) => {
    return reg.test(password);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);

    if (value && !pwCondition(value)) {
      setPasswordContent1('8-15자 이내의 영문, 숫자, 특수문자를 조합해주세요.');
    } else {
      setPasswordContent1('');
    }
  };

  const handlePassword2Change = (value) => {
    setPassword2(value);

    if (password !== value) {
      setPasswordContent('비밀번호가 일치하지 않습니다');
    } else {
      setPasswordContent('');
    }
  };


  return(
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('Back')}>
        <Text style={styles.backBTN}> ⟨ </Text>
      </TouchableOpacity>

      <Text style={styles.topTitle}>회원가입</Text>
      
      <TextInput
        style={styles.inputS}
        placeholder="이메일"
        keyboardType="email"
        val={email}
          onChangeText={handleEmailChange}
      />

<Text style={styles.errTxt}>{validation}</Text>
    <Text style={{top: 232,
    fontSize: 12,
    color: '#ff0000', position: 'absolute'}}>{emailContent}</Text>
      <TextInput
        style={styles.inputS}
        setPassword={setPassword}
        placeholder="비밀번호"
        keyboardType="email"
        secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
      />
      <Text style={styles.errTxt}>{passwordContent1}</Text>
      <TextInput
        style={styles.inputS}
        placeholder="비밀번호 확인"
        keyboardType="email"
        secureTextEntry={true}
          value={password2}
          onChangeText={handlePassword2Change}
      />
      
      <Text style={styles.errTxt}>{passwordContent}</Text>

      <TouchableOpacity
        style={styles.buttonS}
        onPress={addUser}
        >
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.log}
        onPress={() => navigation.navigate('Reset')}>
        <Text style={styles.saveTxt}>이미 계정이 있나요?  로그인하기</Text>
      </TouchableOpacity>
    </View>
  );
}

function SuccessLogin () {
  return (
    <View style={styles.container}>
    
      <Text style={styles.title}>Truffle</Text>
      <Text style={styles.center}>축하드립니다 !{"\n"}회원가입이 완료되었습니다.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      
    </View>
  );
}

function SuccessPW () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Truffle</Text>
      <Text style={styles.center}>비밀번호 변경이 완료되었습니다.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      
    </View>
  );
}



{/*비밀번호 재설정 */}
function ForgotPW() {

{/*const [imageSrc, setImageSrc] = useState("https://via.placeholder.com/118x66"); // 초기 상태는 선택이 되지 않은 상태를 나타내기 위함
const [isClicked, setIsClicked] = useState(false);

const handleClick = () => {
  if (isClicked) {
    setImageSrc("https://via.placeholder.com/118x66");
      setIsClicked(false); // 초기 상태 false 일 땐 초기 상태 이미지 src
    } else {
      setImageSrc("https://via.placeholder.com/118x66");
      setIsClicked(true); // true일 땐 변경될 이미지 src
    }
}; */}
  

  {/* 타이머 */}
    const initialTime = 540;
    const [remainingTime, setRemainingTime] = useState(initialTime);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(false);
    const [isStopButtonDisabled, setIsStopButtonDisabled] = useState(true);
    const [isResendButtonDisabled, setIsResendButtonDisabled] = useState(true);

    useEffect(() => {
        let timer;

        if (isTimerRunning && remainingTime > 0) {
            timer = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);
        }

        return () => clearInterval(timer);

    }, [isTimerRunning, remainingTime]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };


    const handleStartTimer = () => {{/* 인증번호 발송 눌렸을때 이메일 존재여부 확인 후 있으면 타이머 실행, 없으면 오류문 띄우기 */}

    {/* 존재하지않는 이메일 체크해주는 코드부분이 정확히 어떤건지 물어보기 */}
    if (password=="") {
      
      setEmailContent('존재하지 않는 이메일입니다.');
    } 
    else {
      setEmailContent('');
      setIsTimerRunning(true);
        setIsStartButtonDisabled(true);
        setIsStopButtonDisabled(false);
        setIsResendButtonDisabled(false);
    }
    };

    const handleStopTimer = () => {
        setIsTimerRunning(false);
        setIsStopButtonDisabled(true);
        setIsResendButtonDisabled(true);
        
    };

    const handleResetTimer = () => {
        setRemainingTime(initialTime);
        setIsTimerRunning(true);
        setIsStartButtonDisabled(true);
        setIsStopButtonDisabled(false);
        
    };

  {/*조건문 useState */}

  const [text, onChangeText] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordContent, setPasswordContent] = useState('');
  const [passwordContent1, setPasswordContent1] = useState('');
  const [email, setEmail] = useState('');
  const [emailContent, setEmailContent] = useState('');

{/* onChangeText시 */}
  const handleEmailChange = (val) => {
    setEmail(val);

{/* login()이 true/false 값으로 나오거나 else문 내용 전달: 어떤 내용이 들어가야하지 ? !login() */}
  };

  const reg = /^(?=.*[a-zA-Z])(?=.*[\W_])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

  const pwCondition = (password) => {
    return reg.test(password);
  };

  const handlePasswordChange = (updatedData) => {
    setPassword(updatedData);

    if (updatedData && !pwCondition(updatedData)) {
      setPasswordContent1('8-15자 이내의 영문, 숫자, 특수문자를 조합해주세요.');
    } else {
      setPasswordContent1('');
    }
  };

  const handlePassword2Change = (updatedData) => {
    setPassword2(updatedData);
  };


{/* 업뎃유저 비밀번호 일치 확인 */}
  const isPassword = (value1, value2) => {
    return value1 === value2;
  };

  const updateUser = async (userId, updatedData) => {
    if (isPassword(password, password2)) {
      const userDoc = doc(db, 'users', userId);
  await updateDoc(userDoc, updatedData);
    }
};


  return(

    <View style={styles.container}>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backBTN}> ⟨ </Text>
      </TouchableOpacity>

      <Text style={styles.topTitle}>비밀번호 재설정</Text>
      
      <TextInput
        style={styles.inputP}
        val={email}
          onChangeText={handleEmailChange}
        placeholder="이메일"
        keyboardType="email"
      />
      <Text style={{
        top: 50,
    fontSize: 12,
    color: '#ff0000'}}>{emailContent}</Text>


      <TouchableOpacity
        style={[styles.midButton, {backgroundColor: isStartButtonDisabled ? '#CCCCCC' : '#FEA655'} ]}
        onPress={handleStartTimer} 
                disabled={isStartButtonDisabled}> 
        <Text style={styles.buttonText}>인증번호 발송</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.resend}
        onPress={handleResetTimer}
        disabled={isResendButtonDisabled} >
        <Text style={styles.saveTxt}>인증번호 재발송</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.inputRe}   
    placeholder="인증번호"
    onChangeText={onChangeText}
        keyboardType="numeric"
      />
    

{/* 타이머 */}
<Text style={{ color: 'purple', position: 'absolute', top: 290, paddingLeft: 30}}>{formatTime(remainingTime)}</Text>


      <TouchableOpacity
        style={[styles.smallButton, {backgroundColor: isStopButtonDisabled ? '#CCCCCC' : '#FEA655'} ]}
        onPress={handleStopTimer} 
                disabled={isStopButtonDisabled} 
                
        >
        <Text style={styles.buttonText}>확인</Text>
      </TouchableOpacity>
<TouchableOpacity style={{top: 98}}>
    <Eye/>
   </TouchableOpacity>   
      <TextInput
        style={styles.inputP}
        setPassword={setPassword}
        updatedData={password}
        placeholder="비밀번호"
        keyboardType="email"
        secureTextEntry={true}
          
          onChangeText={handlePasswordChange}
      />
      <Text style={styles.passwordContent}>{passwordContent1}</Text>
      <TouchableOpacity style={{top: 98}}>
    {/*<Image src={imageSrc} onClick={handleClick}/>*/}
    <Eye/>
   </TouchableOpacity>   
      <TextInput
        style={styles.inputP}
        placeholder="비밀번호 확인"
        keyboardType="email"
        secureTextEntry={true}
          updatedData={password2}
          onChangeText={handlePassword2Change}
      />
      <Text style={styles.passwordContent}>{passwordContent}</Text>

      <TouchableOpacity
        style={styles.buttonP}
        onPress={updateUser}>
        <Text style={styles.buttonText} type="submit">비밀번호 변경</Text>
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
