import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ElectricityScreen = () => {
  const [meterNumber, setMeterNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handlePay = () => {
    // Handle payment logic
    console.log('Payment processed for meter number:', meterNumber, 'Amount:', amount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Electricity Payment</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter meter number"
        value={meterNumber}
        onChangeText={(text) => setMeterNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handlePay}>
        <Text style={styles.buttonText}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0080FF',
    paddingVertical: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ElectricityScreen;
