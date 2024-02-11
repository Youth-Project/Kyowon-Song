import React, {useState, useEffect} from "react";
import { Button, View, StyleSheet, Text, Dimensions,TouchableOpacity, Modal } from "react-native";

import WithdrawModal from "../assets/icons/WithdrawModal.svg";
import LogoutModal from "../assets/icons/LogoutModal.svg";
import YesBTN from "../assets/icons/YesBTN.svg";
import NoBTN from "../assets/icons/NoBTN.svg";
import { handleLogout, deleteUser } from './dbFunctions';

{/* budget불러오는 함수 ? */}
const budget=300000;
const formattedBudget = budget?.toLocaleString('en-US'); // 세 자릿수마다 쉼표 추가

const SettingsView = ({navigation}) => {
  const [logoutVisible, setLogoutVisible]=useState(false);
  const [withdrawVisible, setWithdrawVisible]=useState(false);

  const logoutModal = () => {
    setLogoutVisible(!logoutVisible);
  };

  const withdrawVisModal = () => {
    setWithdrawVisible(!withdrawVisible);
  };

  {/* 수정버튼제한 */}
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    checkAndDisableButton();
  }, []);

  const checkAndDisableButton = async () => {
    // 현재 날짜 정보 가져오기
    const currentDate = new Date();

    // AsyncStorage에서 저장된 마지막 버튼 클릭 날짜 가져오기
    const lastButtonPressDate = await AsyncStorage.getItem('lastButtonPressDate');

    if (lastButtonPressDate) {
      // 저장된 날짜가 있으면 마지막 버튼 클릭 날짜의 월과 현재 날짜의 월을 비교하여 버튼 활성화 여부 설정
      const lastDate = new Date(lastButtonPressDate);
      setButtonDisabled(lastDate.getMonth() === currentDate.getMonth());
    }
  };

  const handleButtonClick = async () => {
    
    setButtonDisabled(true);
    await AsyncStorage.setItem('lastButtonPressDate', new Date().toISOString());
  navigation.navigate('MonthlyModifyView');
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.Texts}>
        Setting
      </Text>

      <View style={Styles.MonthlyContainer}>
        <View style={Styles.MonthlyPlan}>
          <Text style={Styles.MonthlyText}>{formattedBudget ? `${formattedBudget}원` : '0원'}</Text>
            <View style={{flexDirection:'row', marginTop:15, gap: 70}}>
              <Text style={{fontSize:10, marginLeft:20, marginTop:10}}>이번 달 예산을 설정해주세요!</Text>
              <TouchableOpacity style={{width:54, height: 22, borderWidth: 1, borderColor: isButtonDisabled ? '#ccc' : '#FEA655', backgroundColor: 'white', borderRadius: 3, top: 4, }} onPress={handleButtonClick} disabled={isButtonDisabled}
              >
                <Text style={{textAlign: 'center', paddingTop: 2, fontSize: 12, color: isButtonDisabled ? '#ccc': '#FEA655'}}>수정</Text>
              </TouchableOpacity>
            </View>
        </View>

        <View style={[Styles.SettingSelect, {marginTop:45}]}>
          <TouchableOpacity onPress={()=> navigation.navigate('ForgotPW')}>
            <View style={Styles.SelectContainer}>
              <Text style={Styles.SelectText}>비밀번호 변경</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={Styles.SettingSelect}>
          <TouchableOpacity>
            <View style={Styles.SelectContainer}>
              <Text style={Styles.SelectText}>이용약관</Text>
            </View>
          </TouchableOpacity>
        </View>
          
        <View style={Styles.SettingSelect}>
          <TouchableOpacity onPress={logoutModal}>
            <View style={Styles.SelectContainer}>
              <Text style={Styles.SelectText}>로그아웃</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={Styles.SettingSelect}>
          <TouchableOpacity onPress={withdrawVisModal}>
            <View style={Styles.SelectContainer}>
              <Text style={Styles.SelectText}>탈퇴하기</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={Styles.SettingSelect}>
          <TouchableOpacity onPress={()=> navigation.navigate('CreditView')}>
            <View style={Styles.SelectContainer}>
              <Text style={Styles.SelectText}>크레딧</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <Modal
        animationType="slide"
        transparent={true}
        visible={logoutVisible}
        onRequestClose={logoutModal}
        >
          <View style={Styles.ModalContainer}>
            <View style={Styles.ModalOpen}>
              <LogoutModal/>
              <View style={Styles.ModalBTN}>
                <TouchableOpacity onPress={handleLogout}>
                  <YesBTN/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <NoBTN/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
        animationType="slide"
        transparent={true}
        visible={withdrawVisible}
        onRequestClose={withdrawVisModal}
        >
          <View style={Styles.ModalContainer}>
            <View style={Styles.ModalOpen}>
             <WithdrawModal/>
             <View style={Styles.ModalBTN}>
                <TouchableOpacity onPress={deleteUser}>
                  <YesBTN/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <NoBTN/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height:Dimensions.get('window').height ,
    backgroundColor: '#f8f9fa',
  },
  Texts: {
    color: '#474646',
    //fontFamily: 'NanumGothic, sans-serif',
    fontSize: 24,
    alignItems:"center",
    justifyContent:"center",
    marginLeft: 22,
    marginTop: 20,
  },
  MonthlyContainer:{
    flex:1,
    alignItems:'center',
  },
  MonthlyPlan:{
    width: Dimensions.get('window').width/1.15,
    height:100,
    marginTop:40,
    backgroundColor:'white',
  },
  MonthlyText:{
    fontSize:25,
    marginLeft:20,
    marginTop:15
  },
  SettingSelect:{
    width: Dimensions.get('window').width/1.15,
    marginTop:5,
    backgroundColor:'white',
    borderRadius:5,
  },
  SelectText:{
  marginLeft:20,
  fontSize:20,
  },

  SelectContainer:{
    height:50,
    justifyContent:'center',
  },
  ModalContainer:{
    flex:1,
    justifyContent:'flex-end',
  },
  ModalOpen:{
    backgroundColor:'white',
    width:Dimensions.get('window').width,
    height: 200,
  },
  ModalBTN:{
    flexDirection:'row',
    gap:30,
    position:'absolute',
    zIndex:1,
    bottom: 50,
    left: 70,
}

})
export default SettingsView;
