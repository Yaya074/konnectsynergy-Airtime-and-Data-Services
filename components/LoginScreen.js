import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../navigation/AuthProvider'

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {signIn} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Login to Khalil Mu'azu Data and airtime prototype</Text>
      <View style={styles.inputContainer}>
        <TextInput Value={email} onChangeText={(text)=>setEmail(text)} style={styles.input} placeholder="Email" />
        <TextInput  Value={password} onChangeText={(text)=>setPassword(text)}  style={styles.input} placeholder="Password" />
        <Button onPress={()=>signIn(email, password)} title="Login" />
      </View>
      <TouchableOpacity style={{marginTop:10,marginRight:220}} onPress={()=>navigation.navigate("ForgotPassword")}>
          <Text>Forgot password? </Text>
        </TouchableOpacity>

      
      <View style={{marginTop:10, flexDirection:"row"}}>
      <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
          <Text>Register </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen

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