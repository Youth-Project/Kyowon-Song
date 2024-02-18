import React, {useState} from 'react';
import { TouchableOpacity, TextInput, Image, Text, ScrollView, View, Button, StyleSheet, FlatList, Dimensions, Modal } from 'react-native';
import firestore from "@react-native-firebase/firestore";


const dishes = [
    { id: 1, name: '부대찌개', hour: 1, min: 30, lacking: '햄', img: ''}, { id: 2, name: '닭볶음탕', hour: 1, min: 30, lacking: '닭', img: ''}, { id: 3, name: '부대찌개', hour: 1, min: 30, lacking: '햄', lackMore: '+3', img: ''}, { id: 3, name: '부대찌개', hour: 1, min: 30, lacking: '햄', lackMore: '+3', img: ''}, { id: 3, name: '부대찌개', hour: 1, min: 30, lacking: '햄', lackMore: '+3', img: ''}, { id: 3, name: '부대찌개', hour: 1, min: 30, lacking: '햄', lackMore: '+3', img: ''}, { id: 3, name: '부대찌개', hour: 1, min: 30, lacking: '햄', lackMore: '+3', img: ''}, { id: 3, name: '부대찌개', hour: 1, min: 30, lacking: '햄', lackMore: '+3', img: ''}, { id: 3, name: '부대찌개', hour: 1, min: 30, lacking: '햄', lackMore: '+3', img: ''},{ id: 3, name: '부대찌개', hour: 1, min: 30, lacking: '햄', lackMore: '+3', img: ''}, { id: 3, name: '부대찌개', hour: 1, min: 30, lacking: '햄', lackMore: '+3', img: ''}]
    //부족한 재료 수 string으로 변환가능한지



const RecipeTab = ({ item, navigation }) => {

    //레시피포스트 순서정렬 
    const [showUserRecipes, setShowUserRecipes] = useState(false);
    const [recipeData, setRecipeData] = useState([]);
    const [refrigeratorIngredients, setRefrigeratorIngredients] = useState([]);
    const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);

    useEffect(() => {
        fetchRecipeData();
    //    fetchBookmarkedRecipes();
      }, []);

    //이거 내레시피만 보기인가..?
    const handleToggleSwitch = () => {
        setShowUserRecipes((prev) => !prev);
    };

      //가나다순 함수..?
      const orderByKorean = async () => {
        const koreanOrder = await firestore().collection('recipe').orderBy('recipeName').get();
        return koreanOrder.docs.map((doc) => doc.data());
      };
    
      // 부족한 재료 갯수가 적은 순으로 정렬하는 함수
const refrigeratorOrderByLack = async (refrigeratorIngredients) => {
    const lackOrder = await firestore().collection('recipe').get();
  
    const sortedRecipe = lackOrder.docs
      .map((recipeDoc) => {
        const recipeDocData = recipeDoc.data();
        const lack = compareIngredients(refrigeratorIngredients, recipeDocData.recipe_ingredients);
  
        return {
          recipeId: recipeDoc.recipeId,
          lackCount: lack.length,
        };
      })
      .sort((a, b) => a.lackCount - b.lackCount);
  
    return sortedRecipe.map((recipeDocData) => ({
      recipeId: recipeDocData.recipeId,
      lackCount: recipeDocData.lackCount,
    }));
  };

  //이거 레시피포스트 가져오는 함수...?
  const fetchRecipeData = async() => {

    try {
      const userId = 'xxvkRzKqFcWLVx4hWCM8GgQf1hE3';
      const fetchedRecipes = [];
  
      for (let i = 1; i <= 100; i++) {
        const docName = i.toString();
        const recipeRef = firestore().collection('recipes').doc(docName);
        const recipeSnapshot = await recipeRef.get();
  
        if (recipeSnapshot.exists) {
          const recipeData = recipeSnapshot.data();
          const recipeContents = {
            id: docName,
            name: recipeData.recipe_name,
            image: recipeData.recipe_image,
            time: recipeData.recipe_time,
          };
          fetchedRecipes.push(recipeContents);
        } else {
          console.warn(`레시피 문서 "${docName}"을(를) 찾을 수 없습니다.`);
        }
      }
  
      setRecipeData(fetchedRecipes);
    } catch (error) {
      console.error('북마크 레시피를 가져오는데 실패했습니다.', error);
    }
  };

  //searchQuery용 음식name
  const fetchRecipeData2 = async() => {

    try {
      const userId = 'xxvkRzKqFcWLVx4hWCM8GgQf1hE3';
      const fetchedRecipes = [];
  
      for (let i = 1; i <= 100; i++) {
        const docName = i.toString();
        const recipeRef = firestore().collection('recipes').doc(docName);
        const recipeSnapshot = await recipeRef.get();
  
        if (recipeSnapshot.exists) {
          const recipeData = recipeSnapshot.data();
          const name = recipeData.recipe_name;
          fetchedRecipes.push(name);
        } else {
          console.warn(`레시피 문서 "${docName}"을(를) 찾을 수 없습니다.`);
        }
      }
  
      setRecipeData(fetchedRecipes);
    } catch (error) {
      console.error('북마크 레시피를 가져오는데 실패했습니다.', error);
    }
  };

  const displayLackingIngredients = async (recipeId, recipeIngredients) => {
    const lackingIngredients = compareIngredients(refrigeratorIngredients, recipeIngredients);
    if (lackingIngredients.length > 0){
      try{
        const lackId = await addLackToCollection({ recipeId, lackingIngredients });
        console.log('Lack added with ID: ', lackId);
      } catch (error) {
        console.error('Error adding lack: ', error);
      }
    }
    return lackingIngredients.join(', ');
  };
    


      //조리가능순 버튼 (난이도 재활용)
       const [star, setStar] = useState({
        button1: false,
        button2: false,
      });
    
      const handleSmallButtonClick = (buttonName) => {
        setStar((prevStates) => ({
          ...prevStates,
          [buttonName]: !prevStates[buttonName],
        }));
      }; 

      //handleSortOrder() 변형함
      const getImageForButton = async (buttonName) => {
        if (star[buttonName]) {
          switch (buttonName) {
            case 'button2':
              const koreanOrder = await orderByKorean();
              setRecipeData(koreanOrder);
              return require('./assets/icons/koreanOrder.png');
            default:
              const lackOrder = await refrigeratorOrderByLack(refrigeratorIngredients);
              setRecipeData(lackOrder);
              return require('./assets/icons/avail.png');
          }
        } 
        else{
          const lackOrder = await refrigeratorOrderByLack(refrigeratorIngredients);
          setRecipeData(lackOrder);
          return require('./assets/icons/avail.png');
        }
      };

      const photoImage = () => {
        if(item.image==''){
          return require('./assets/icons/photoNotReady.png');
        }
        else{
          return {uri: item.image};
        }
      };



 const [modalVisible, setModalVisible] = useState(false);


{/* 검색 */}
const [searchQuery, setSearchQuery] = useState('');
  const allFood = [...fetchedRecipes];
  const filteredData = searchQuery
    ? allFood.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allFood;

  
{/* 내 레시피만 보기 */}
const [my, setMy] = useState({
    check: false,
    checkFill: false,
  });

  const handleCheckboxClick = (buttonName) => {
    setMy((prevStates) => ({
      ...prevStates,
      [buttonName]: !prevStates[buttonName],
    }));
  }; 

  const getImageForCheckbox = (buttonName) => {
    if (my[buttonName]) {
      switch (buttonName) {
        case 'checkFill':
          return require('../assets/icons/checkFill.png');
        default:
          return require('../assets/icons/check.png');
      }
    } 
    else{
      return require('../assets/icons/check.png');
    }
  };


  const [book, setBook] = useState({
    bookmarkFill: false,
});

const handleBookmarkClick = () => {
    setBook((prevBook) => ({
        ...prevBook,
        bookmarkFill: !prevBook.bookmarkFill,
    }));
};

const getImageForBookmark = () => {
    return book.bookmarkFill 
        ? require('../assets/icons/bookmark.png')
        : require('../assets/icons/bookmarkFill.png');
};

  return (
    <View style={styles.container}>
 <View>
    <View style={{ left: 40, top: 20, width: 310, height: 48, paddingVertical: 8, paddingHorizontal: 40, backgroundColor: 'white', borderRadius: 15, justifyContent: 'center', flexDirection: 'column', }}>
        <TextInput style={{ borderWidth: 0, top: 16, width: 300, height: 20, left: 10, color: '#9C9C9C', fontSize: 14, fontFamily: 'NanumGothic', flexWrap: 'wrap',  }} placeholder="검색" onChangeText={setSearchQuery}
value={searchQuery} keyboardType="default"/>
 {/* 돋보기 */}
  <Image style={{position: 'absolute', marginLeft: 16}} source={require('../assets/icons/search.png')}/>
      
  <View style={{flexDirection: 'row', top: 48, right: 55, gap: 4}}>
  {/* 레시피 도움말 i버튼 */}
  <TouchableOpacity
        style={styles.infoBtn}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.infoTxt}>i</Text>
      </TouchableOpacity>
        <Text style={{ fontSize: 10}}>
          내가 만든 레시피만 보기
        </Text>
    <TouchableOpacity onPress={() => handleCheckboxClick('checkFill')} onValueChange={handleToggleSwitch}
            value={showUserRecipes}>
        <Image source={getImageForCheckbox('checkFill')}/>
    </TouchableOpacity>
    
  </View>
  

  {/* 조리가능 순 */}
<TouchableOpacity onPress={() => handleSmallButtonClick('button2')} style={{ border: 'none', backgroundColor: 'transparent', left: 180, top: 33 }}>
          <Image source={getImageForButton('button2')}/>
        </TouchableOpacity>
      </View>

  {/* 동그라미 추가 버튼 */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddRecipeMain')}>
      <Text style={{color: 'white', textAlign: 'center', fontSize: 47, bottom: 7, }}>+</Text>
        </TouchableOpacity>
</View>

    <ScrollView style={styles.containerScroll}>
      <View style={{ alignItems: 'center', }}>
  {/* 레시피 포스트 컴포넌트 */}
  {recipeData.map((recipe) => (
  <FlatList
        data={filteredData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
            
      <TouchableOpacity key={recipe.id}
        style={styles.post}
        onPress={() => navigation.navigate('RecipeMain', { recipeId: recipe.id })}>
         <Image source={photoImage()}  
      style={{width: 132, height: 70, left: 12, top: 9, borderRadius: 7}} 
        />
        <Text style={styles.foodText}>{item.food}</Text>
        <View style={{left: 12, top: 15}}>

    <TouchableOpacity style={{position: 'absolute', left: 110, bottom: 23}} key={index} onPress={handleBookmarkClick}>
        <Image source={getImageForBookmark()} />
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
        <Text style={styles.timeText}>{item.min}분 이내</Text>
        </View>
      </TouchableOpacity>
      )} 
        numColumns={2} 
      />
      ))}
  </View>
  
    </ScrollView>

  {/* 레시피 도움말 모달 */}
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

<View style={{justifyContent: 'center', flexDirection: 'row', gap: 5}}>
  <Image style={{marginTop: 10}} source={require('../assets/icons/avail.png')}/>
  <Image style={{marginTop: 10}} source={require('../assets/icons/koreanOrder.png')}/>
</View>

   <Text style={{fontSize: 12, top: 8, marginVertical: 5}}>
   위 두가지 필터를 통해 레시피 목록의 정렬 순서를 변경할 수 있습니다.</Text> 

<View style={{alignItems: 'center'}}>
  <Image style={{marginTop: 8, }} source={require('../assets/icons/bookmarkFill.png')}/>
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
  <Image style={{marginTop: 10, }} source={require('../assets/icons/add.png')}/>
</View>

<Text style={{fontSize: 12,  marginVertical: 5}}>
    우측 하단의 버튼을 이용하여 내가 만든 레시피를 등록할 수 있습니다. </Text> 

<View style={{alignItems: 'center'}}>
    <Image style={{marginTop: 10,}} source={require('../assets/icons/isMyRecipe.png')}/>
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
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA', 
    width: '100%',
    height: '100%',
  },
  containerScroll: {
    top: 60,
    backgroundColor: '#F8F9FA',
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

  addButton:{
    width:55,
    height:55,
    borderRadius: 50,
    position: 'absolute',
    right: 30,
    bottom: 80,
    zIndex: 2,
    backgroundColor: '#FEA655',
    shadowColor: "#000000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10
  },
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
  infoBtn: {
    borderWidth: 1.5,
    borderColor: 'red',
    borderRadius: 50,
    width: 15,
    height: 15,
    marginHorizontal: 5
  },

  infoTxt: {
    color: 'red',
    textAlign: 'center',
    textWeight: 'bold',
    bottom: 1,
  },
});

export default RecipeTab;
