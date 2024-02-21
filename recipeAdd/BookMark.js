{/* 그림자 모양 이상함, 정렬 컴포넌트 못만듦 */}

import React, {useState} from 'react';
import { TouchableOpacity, TextInput, Image, Text, ScrollView, View, FlatList, StyleSheet } from 'react-native';
//import { addBookmark, getBookmarkedRecipes } from './recipeFunctions';

const dishes = [
    { id: 1, food: '부대찌개', hour: 1, min: 30, lacking: '햄', img: ''}, { id: 2, food: '닭볶음탕', hour: 1, min: 30, lacking: '닭', img: ''}, { id: 3, food: '부대찌개', hour: 1, min: 30, lacking: '햄', lackMore: '+3', img: ''}, { id: 3, food: '부대찌개', hour: 1, min: 30, lacking: '햄', lackMore: '+3', img: ''}, { id: 3, food: '부대찌개', hour: 1, min: 30, lacking: '햄', lackMore: '+3', img: ''}, { id: 3, food: '부대찌개', hour: 1, min: 30, lacking: '햄', lackMore: '+3', img: ''}, { id: 3, food: '부대찌개', hour: 1, min: 30, lacking: '햄', lackMore: '+3', img: ''}, { id: 3, food: '부대찌개', hour: 1, min: 30, lacking: '햄', lackMore: '+3', img: ''}, { id: 3, food: '부대찌개', hour: 1, min: 30, lacking: '햄', lackMore: '+3', img: ''},{ id: 3, food: '부대찌개', hour: 1, min: 30, lacking: '햄', lackMore: '+3', img: ''}, { id: 3, food: '부대찌개', hour: 1, min: 30, lacking: '햄', lackMore: '+3', img: ''}]
    {/* 부족한 재료 수 string으로 변환가능한지 */}

const BookMark = () => {

{/* 검색 */}
const [searchQuery, setSearchQuery] = useState('');
  const allFood = [...dishes];
  const filteredData = allFood;

  {/* 북마크 */}
const [book, setBook] = useState({
    bookmark: true,
    bookmarkFill: true,
  });

  const handleBookmarkClick = (buttonName) => {
    setBook((prevStates) => ({
      ...prevStates,
      [buttonName]: !prevStates[buttonName],
    }));
  }; 

  const getImageForBookmark = (buttonName) => {
    if (book[buttonName]) {
      switch (buttonName) {
        case 'bookmarkFill':
          return require('../assets/icons/bookmarkFill.png');
        default:
          return require('../assets/icons/bookmark.png');
      }
    } 
    else{
      return require('../assets/icons/bookmark.png');
    }
  };


  return (
    <View style={styles.container}>
    <ScrollView style={styles.containerScroll}>
      <View>
  {/* 레시피 포스트 컴포넌트 */}
  <FlatList
        data={filteredData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
  <View style={{ alignItems: 'center', left: 20}}>
      <TouchableOpacity
        style={styles.post}
        onPress={() => navigation.navigate('RecipeMain')}>
         <Image source={{ uri: "https://via.placeholder.com/118x66"}} //source={item.img}
      style={{width: 132, height: 70, left: 12, top: 9, borderRadius: 7}} 
        />
        <Text style={styles.foodText}>{item.food}</Text>
        <View style={{left: 12, top: 15}}>
    <TouchableOpacity style={{position: 'absolute', left: 110, bottom: 23}} onPress={() => handleBookmarkClick('bookmarkFill')}>
        <Image source={getImageForBookmark('bookmarkFill')}/>
    </TouchableOpacity>
        
        <View
        style={{borderWidth: 1.5,
    borderColor: 'red',
    borderRadius: 50,
    width: 13,
    height: 13, top: 6}}>
        <Text style={{color: 'red',
    textAlign: 'center',
    textWeight: 'bold', fontSize: 9}}>i</Text>
      </View>
        <Text style={styles.lackingText}>{item.lacking}{item.lackMore} 부족</Text>
        </View>
         
        <View style={{left: 7, flexDirection: 'row'}}>
        {/*<Text style={styles.timeText}>{props.hour} 시간</Text>*/}
        <Image style={{top: 15, marginLeft: 4}} source={require('../assets/icons/clock.png')}/>
        <Text style={styles.timeText}>{item.min} 분 이내</Text>
        </View>
      </TouchableOpacity>
    </View>
      )}
        numColumns={2}
      />
  </View>
  
    </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
    backgroundColor: '#F8F9FA', // 배경색상 추가
    height: 'auto',
  },
  containerScroll: {
    top: 30,
    backgroundColor: '#F8F9FA', // 배경색상 추가
    height: 'auto',
  },
  cont: {
    flexDirections: 'row',
    justifyContent: 'center',
    felxWrap: 'wrap',
  },
  post: {
    margin: 10,
    position: 'relative',
    width: 155,
    height: 165,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 3,
    alignContent: 'flex-start',
    shadowColor: "#000000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10
  },
  foodText: {
    top: 14,
    paddingLeft: 12,
    fontWeight: 'bold',
  },
  lackingText: {
    paddingLeft: 16,
    bottom: 7,
    color: '#E50000',
    fontSize: 10,
    fontFamily: 'NanumGothic',
  },
  timeText: {
    top: 10,
    color: '#000',
    fontSize: 12,
    margin: 5,
    fontFamily: 'NanumGothic',
  },
  row: {
    flexDirection: 'row', 
    display:'flex',
    flexWrap:'wrap',
    justifyContent: 'space-around', 
    position: 'relative', 
    paddingHorizontal: 40, 
    paddingBottom: 80, 
    gap: 20,
    
  },
});

export default BookMark;
