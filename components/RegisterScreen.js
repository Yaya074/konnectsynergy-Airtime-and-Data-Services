import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../navigation/AuthProvider';

const RegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { register } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      await register(name, email, phone, password, address, referralCode);
    } catch (error) {
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Register to Konnectsynergy</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
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
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <TextInput
        placeholder="Referral Code (Optional)"
        value={referralCode}
        onChangeText={setReferralCode}
        style={styles.input}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={{flexDirection:"row",justifyContent:"center"}}>
      <Text style={{fontSize:18, color:"navy", marginRight:10}} >Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{fontSize:18, color:"navy", fontWeight:"500"}}>Login</Text>
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
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'navy',
    
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

export default RegistrationScreen;
