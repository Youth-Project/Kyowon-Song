

import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
  <View style={{flexDirection: 'row', borderBottomWidth: 3, borderColor: '#FEA655', padding: 15, width: 304, justifyContent: 'center', }}> 
          <Text style={{fontSize: 15, color: '#FEA655', }}>레시피</Text>
            <Text style={{fontSize: 15,}}>에서는 무엇을 하나요?</Text>
 </View> 

  <View style={{ padding: 20, width: 304, justifyContent: 'center', }}> 
  <View style={{flexDirection: 'row',}}>
          <Text style={{fontSize: 12, color: '#FEA655', }}>레시피</Text>
            <Text style={{fontSize: 12,}}>에서는 </Text>
            <Text style={{fontSize: 12, color: '#FEA655', }}>냉장고</Text>
<Text style={{fontSize: 12,}}>에 등록한 재료 목록을 기반 </Text> 
  </View>
  <Text style={{fontSize: 12,}}>으로, 조리 가능한 레시피 목록과 부족한 재료의 개수를 볼 수 있습니다. </Text>

<View style={{alignItems: 'center'}}>
  <Image style={{marginTop: 15}} source={require('./assets/cookOrder.png')}/>
</View>

   <Text style={{fontSize: 12, top: 8, marginVertical: 5}}>
   위 두가지 필터를 통해 레시피 목록의 정렬 순서를 변경할 수 있습니다.</Text> 

<View style={{alignItems: 'center'}}>
   <Image style={{marginTop: 15, }} source={require('./assets/bookMark.png')}/>
</View>

   <Text style={{fontSize: 12, top: 8, marginVertical: 5}}>
    레시피 박스 우측 하단 북마크를 이용하여 원하는</Text> 

  <View style={{flexDirection: 'row', marginTop: 3}}>
    <Text style={{fontSize: 12,}}>
    레시피를 </Text> 
    <Text style={{fontSize: 12, color: '#FEA655',}}>
    북마크</Text> 
    <Text style={{fontSize: 12,}}>
    에서 따로 모아볼 수 있습니다.</Text> 
</View>

<View style={{alignItems: 'center'}}>
<Image style={{marginTop: 18, }} source={require('./assets/add.png')}/>
</View>

<Text style={{fontSize: 12, top: 8, marginVertical: 5}}>
    우측 하단의 버튼을 이용하여 내가 만든 레시피를 등록할 수 있습니다. </Text> 

<View style={{alignItems: 'center'}}>
    <Image style={{marginTop: 15,}} source={require('./assets/isMyRecipe.png')}/>
</View>
    <Text style={{fontSize: 12, top: 8, marginVertical: 5}}>
     좌측 상단의 체크박스를 이용하여 내가 만든 레시피만 따로 볼 수 있습니다.</Text> 
 </View> 

    <TouchableOpacity
              style={{width: 304, borderTopWidth: 2, borderColor: '#ccc'}}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{fontSize: 15, color: '#000', textAlign: 'center', padding: 10}}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>i</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 304, 
    height: 526,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderWidth: 1.5,
    borderColor: 'red',
    borderRadius: 50,
    width: 24,
    height: 24,
  },

  textStyle: {
    color: 'red',
    textAlign: 'center',
    textWeight: 'bold',
    top: 1,
  },

});

export default App;
