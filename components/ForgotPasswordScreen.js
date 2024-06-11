import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../navigation/AuthProvider'

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState("")
  

  const {forgotPassword} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Reset Your Password</Text>
      <View style={styles.inputContainer}>
        <TextInput Value={email} onChangeText={(text)=>setEmail(text)} style={styles.input} placeholder="Email" />
        
        <View style={{width:200}}>
        <Button onPress={()=>forgotPassword(email)} title="Reset Password" />
        </View>
      </View>
      
    </View>
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  inputContainer:{
    justifyContent:"center",
    alignItems:"center",
    width:100,
  },
  input:{
    padding:10,
    width:300,
    borderWidth:1,
    margin:8,
    borderRadius:20,
    borderColor:"#ccc"
  }
})