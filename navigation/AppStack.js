import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer, StackRouter } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../components/HomeScreen'
import { AuthContext } from './AuthProvider'
import AddEquipmentsScreen from '../components/AddEquipmentsScreen'
import StoreScreen from '../components/StoreScreen'
import DataScreen from '../components/DataScreen'
import SettingsScreen from '../components/SettingsScreen'
import AirtimeScreen from '../components/AirtimeScreen'
import CouponDataScreen from '../components/CouponDataScreen'
import CableTvScreen from '../components/CableTvScreen'
import ElectricityScreen from '../components/ElectricityScreen'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CustomDrawer from '../components/CustomDrawer'
import Ionicons from "react-native-vector-icons/Ionicons";
import LoginScreen from '../components/LoginScreen'
import RegisterScreen from '../components/RegisterScreen'
import ForgotPasswordScreen from '../components/ForgotPasswordScreen'
import { StatusBar } from 'expo-status-bar'
import FundingAccounts from '../components/FundingAccounts'



const stack = createNativeStackNavigator();
const drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator;

 const HomeStack = ({navigation}) => {
  const {user, signOut} = useContext(AuthContext);

  return (
    <>
    <StatusBar style='dark' />
    <stack.Navigator 
       
         >
        <stack.Screen options={{ title:`Hello! ${user?.name}`,   headerRight:()=>(
      <TouchableOpacity style={{right:15}} onPress={()=>{}}>
        {/* <Text style={{color:"navy", right:10}}>Sign Out</Text> */}
        <Ionicons
              name="chatbubble-ellipses"
              size={30}
              style={{ color: "black" }}
              />
      </TouchableOpacity>
     ),
     headerLeft:()=>(
      <View>
        <TouchableOpacity style={{right:15}} onPress={()=>navigation.openDrawer()}>
        {/* <Text style={{color:"navy", right:10}}>Sign Out</Text> */}
        <Ionicons
              name="grid"
              size={30}
              style={{ color: "navy", marginLeft:10 }}
              />
      </TouchableOpacity>
      </View>
     )
     
     
     }}  name='Home' component={HomeScreen} />
     <stack.Screen  name='Login' component={LoginScreen} />
            <stack.Screen  name='Register' component={RegisterScreen} />
            <stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        <stack.Screen name='Equipments' options={{title:"Add Equipment"}} component={AddEquipmentsScreen} />
        <stack.Screen name='Store' 
        options={{title:"Store Equipment",headerSearchBarOptions:{placeholder:"Search", headerIconColor:"white", hintTextColor:"white", textColor:"white"},headerTintColor:"white"}} component={StoreScreen} />
        <stack.Screen name='Data' component={DataScreen} />
        <stack.Screen name='Airtime' component={AirtimeScreen} />
        <stack.Screen name='Coupon' component={CouponDataScreen} />
        <stack.Screen name='Cable' component={CableTvScreen} />
        <stack.Screen name='Electricity' component={ElectricityScreen} />
        <stack.Screen name='Settings' component={SettingsScreen} />
        <stack.Screen name='Fund' component={FundingAccounts} />
        </stack.Navigator>
        </>  
  )
}




const AppStack = ({props}) => {
  const {user, signOut} = useContext(AuthContext);
  return (
   <>
   <StatusBar style='dark' />
      <drawer.Navigator screenOptions={{headerShown:false}}  drawerContent={(props) => <CustomDrawer {...props} />}>
        <drawer.Screen  name='HomeStack' component={HomeStack} />
      </drawer.Navigator>  
      </>
  )
}

export default AppStack

const styles = StyleSheet.create({})