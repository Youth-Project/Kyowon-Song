import SettingsView from "../Screens/SettingsView";
import MonthlyModifyView from "../Screens/MonthlyModifyView";
import CreditView from "../Screens/CreditView";
{/* 로그아웃, 탈퇴 모달에서 넘어가는 화면추가 */}
import Loginpg from "../Screens/Loginpg";
import SignupPg from "../Screens/SignupPg";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const SettingStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SetView" component={SettingsView} />
      <Stack.Screen name="MonthlyModifyView" component={MonthlyModifyView} />
      <Stack.Screen name="Loginpg" component={Loginpg} />
      <Stack.Screen name="SignupPg" component={SignupPg} />
      <Stack.Screen name="CreditView" component={CreditView} />
    </Stack.Navigator>
  )
};

export default SettingStackNavigation
