import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from '../components/RegisterScreen'
import LoginScreen from '../components/LoginScreen'
import ForgotPasswordScreen from '../components/ForgotPasswordScreen'
import { StatusBar } from 'expo-status-bar'
import HomeScreen from '../components/HomeScreen'
import Ionicons from "react-native-vector-icons/Ionicons";



const stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
   <>
   <StatusBar style='dark'/>
        <stack.Navigator screenOptions={{headerStyle:{backgroundColor:"white"},headerTintColor:"navy", headerTitleAlign:"center"}}>
          
            <stack.Screen  name='Login' component={LoginScreen} />
            <stack.Screen  name='Register' component={RegisterScreen} />
            <stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
            <stack.Screen options={{ title:`Hello!` ,   headerRight:()=>(
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
     
     
     }}   name='Home' component={HomeScreen} />
        </stack.Navigator>
        
</>
  )
}

export default AuthStack

const styles = StyleSheet.create({})