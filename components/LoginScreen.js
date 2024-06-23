import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../navigation/AuthProvider';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Konnectsynergy</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.passwordInput}
          secureTextEntry={secureTextEntry}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Ionicons
            name={secureTextEntry ? 'eye-off' : 'eye'}
            size={24}
            color="grey"
          />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={{flexDirection:"row",justifyContent:"center"}}>
      <Text style={{fontSize:18, color:"navy", marginRight:10}} >Don't have an account?</Text>
      <TouchableOpacity  onPress={() => navigation.navigate('Register')}>
        <Text style={{fontSize:18, color:"navy", fontWeight:"500"}}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={{width:160,}}>
              <TouchableOpacity  onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={{fontSize:18, color:"navy", fontWeight:"500", marginTop:10}}>Forgot Password?</Text>
        </TouchableOpacity>
        </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'navy',
    position:"absolute",
    top:0
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
  },
  button: {
    backgroundColor: 'navy',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
