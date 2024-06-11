import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from '../components/RegisterScreen'
import LoginScreen from '../components/LoginScreen'
import ForgotPasswordScreen from '../components/ForgotPasswordScreen'
import { StatusBar } from 'expo-status-bar'

const stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
   <>
   <StatusBar style='light'/>
        <stack.Navigator screenOptions={{headerStyle:{backgroundColor:"navy"},headerTintColor:"#fff", headerTitleAlign:"center"}}>
          
            <stack.Screen  name='Login' component={LoginScreen} />
            <stack.Screen  name='Register' component={RegisterScreen} />
            <stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        </stack.Navigator>
</>
  )
}

export default AuthStack

const styles = StyleSheet.create({})