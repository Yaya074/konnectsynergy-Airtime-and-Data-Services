import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../navigation/AuthProvider'

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const {register} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Register at Khalil's data prototype</Text>
      <View style={styles.inputContainer}>
        <TextInput Value={email} onChangeText={(text)=>setEmail(text)} style={styles.input} placeholder="Email" />
        <TextInput  Value={password} onChangeText={(text)=>setPassword(text)}  style={styles.input} placeholder="Password" />
        <TextInput  Value={confirmPassword} onChangeText={(text)=>setConfirmPassword(text)}  style={styles.input} placeholder="Confirm Password" />
        <Button onPress={()=>register(email, password)} title="Register" />
      </View>
      <View style={{marginTop:10, flexDirection:"row"}}>
      <Text>Already have an account? </Text>
        <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
          <Text>Sign In </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RegisterScreen

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