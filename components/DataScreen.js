import React, { useRef, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Ionicons from "react-native-vector-icons/Ionicons";

const DataScreen = ({navigation}) => {
  const modalRef = useRef(null);
  const pinModalRef = useRef(null);
  const receiptModalRef = useRef(null);
  
  const [selectedNetwork, setSelectedNetwork] = useState('mtn');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDataOption, setSelectedDataOption] = useState(null);
  const [error, setError] = useState(null);
  const [pin, setPin] = useState('');
  const [receiptInfo, setReceiptInfo] = useState(null);

  const dataOptions = {
    mtn: [
      { amount: 130.00, plan: '500MB' },
      { amount: 259.00, plan: '1GB' },
      { amount: 518.00, plan: '2GB' },
      { amount: 777.00, plan: '3GB' },
      { amount: 1295.00, plan: '5GB' },
      { amount: 2590.00, plan: '10GB' },
    ],
    airtel: [
      { amount: 50.00, plan: '100MB' },
      { amount: 100.00, plan: '500MB' },
      { amount: 200.00, plan: '1GB' },
      { amount: 400.00, plan: '2GB' },
      { amount: 750.00, plan: '5GB' },
      { amount: 1500.00, plan: '10GB' },
    ],
    glo: [
      { amount: 100.00, plan: '250MB' },
      { amount: 200.00, plan: '500MB' },
      { amount: 400.00, plan: '1GB' },
      { amount: 750.00, plan: '2GB' },
      { amount: 1500.00, plan: '4.5GB' },
      { amount: 2500.00, plan: '7.2GB' },
    ],
    etisalat: [
      { amount: 150.00, plan: '250MB' },
      { amount: 300.00, plan: '500MB' },
      { amount: 500.00, plan: '1GB' },
      { amount: 1000.00, plan: '2GB' },
      { amount: 1500.00, plan: '3GB' },
      { amount: 2500.00, plan: '5GB' },
    ],
  };

  const selectNetwork = (network) => {
    setSelectedNetwork(network);
    setPhoneNumber('');
    setError(null);
  };

  const openModal = (dataOption) => {
    if (!phoneNumber) {
      setError('Please Enter Your Phone Number!');
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    setSelectedDataOption(dataOption);
    if (modalRef.current) {
      modalRef.current.open();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const handlePinSubmit = () => {
    setReceiptInfo({
      amount: selectedDataOption.amount,
      plan: selectedDataOption.plan,
      network: selectedNetwork,
      phoneNumber: phoneNumber,
      message: 'Successful'
    });

    if (pinModalRef.current) {
      pinModalRef.current.close();
    }

    if (receiptModalRef.current) {
      receiptModalRef.current.open();
    }
  };

  const closeReceiptModal = () => {
    if (receiptModalRef.current) {
      receiptModalRef.current.close();
    }
  };

  const handleBuyPress = () => {
    if (pinModalRef.current) {
      if (modalRef.current) {
        modalRef.current.close();
      }
      pinModalRef.current.open();
    }
  };

  const renderDataOptions = () => {
    return dataOptions[selectedNetwork].map((option, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.dataOption, selectedNetwork === 'mtn' && styles.selectedOption]}
        onPress={() => openModal(option)}
      >
        <Image source={getNetworkLogo(selectedNetwork)} style={styles.networkLogo} />
        <Text>Plan: {option.plan}</Text>
        <Text>Amount: {option.amount} Naira</Text>
      </TouchableOpacity>
    ));
  };

  const getNetworkLogo = (network) => {
    switch (network) {
      case 'mtn':
        return require('../assets/mtn_logo.jpg');
      case 'airtel':
        return require('../assets/airtel_logo.jpg');
      case 'glo':
        return require('../assets/glo_logo.jpg');
      case 'etisalat':
        return require('../assets/9mobile_logo.jpg');
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.networkLogos}>
        {['mtn', 'airtel', 'glo', 'etisalat'].map(network => (
          <TouchableOpacity key={network} onPress={() => selectNetwork(network)}>
            <Image source={getNetworkLogo(network)} style={[styles.logo, selectedNetwork === network && styles.selectedLogo]} />
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.phoneNumberInput}
        placeholder="Enter a phone number"
        value={phoneNumber}
        keyboardType='decimal-pad'
        onChangeText={setPhoneNumber}
        placeholderTextColor="grey"
        
      />
      <Text style={styles.networkTypeText}>{selectedNetwork === 'mtn' ? 'SME' : 'Corporate'}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.dataOptionsContainer}>
          {renderDataOptions()}
        </View>
      </ScrollView>
      <Modalize ref={modalRef} adjustToContentHeight={true} snapPoint={300}>
        <TouchableOpacity onPress={closeModal}>
          <Ionicons name="close" size={30} style={styles.closeIcon} />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Purchase Your Data</Text>
        {selectedDataOption && (
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Phone Number: {phoneNumber}</Text>
            <Text style={styles.modalText}>Amount: {selectedDataOption.amount} Naira</Text>
            <Text style={styles.modalText}>Plan: {selectedDataOption.plan}</Text>
            <Text style={styles.modalText}>Network: {selectedNetwork}</Text>
            <TouchableOpacity style={styles.buyButton} onPress={handleBuyPress}>
              <Text style={styles.buyButtonText}>Buy</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modalize>

      <Modalize ref={pinModalRef} adjustToContentHeight={true} snapPoint={300}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Enter your 4-digit PIN</Text>
          <TextInput
            style={styles.pinInput}
            value={pin}
            onChangeText={setPin}
            maxLength={4}
            keyboardType="numeric"
            secureTextEntry={true}
            placeholder='ENTER PIN'
          />
          {pin.length ==4 ? 
          <TouchableOpacity style={styles.buyButton} onPress={handlePinSubmit}>
            <Text style={styles.buyButtonText}>Submit</Text> 
            
          </TouchableOpacity>
            :
            <TouchableOpacity activeOpacity={1} style={[styles.buyButton,{backgroundColor:"grey"}]} >
            <Text style={styles.buyButtonText}>Submit</Text> 
            
          </TouchableOpacity>
            }
        </View>
      </Modalize>

      <Modalize ref={receiptModalRef} adjustToContentHeight={true} snapPoint={800}>
        <TouchableOpacity onPress={closeReceiptModal}>
          <Ionicons name="close" size={30} style={[styles.closeIcon,{left:1}]} />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>RECEIPT</Text>
        {receiptInfo && (
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Amount: {receiptInfo.amount} Naira</Text>
            <Text style={styles.modalText}>Plan: {receiptInfo.plan}</Text>
            <Text style={styles.modalText}>Network: {receiptInfo.network}</Text>
            <Text style={styles.modalText}>Phone Number: {receiptInfo.phoneNumber}</Text>
            <Text style={styles.modalText}>Purchased: {receiptInfo.message}</Text>
            <TouchableOpacity onPress={closeReceiptModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Purchase again</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate("Home")} style={[styles.closeButton,{backgroundColor:"#dddddd"}]}>
              <Text style={styles.closeButtonText}>Go to back Dashboard</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modalize>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  networkLogos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  selectedLogo: {
    borderWidth: 2,
    borderColor: 'navy',
    padding: 15,
    width:90,
    height:90,
    
  },
  phoneNumberInput: {
    borderBottomWidth: 1,
    borderColor: 'navy',
    borderRadius: 5,
    paddingVertical: 16,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor:"#F0F0F0",
  },
  networkTypeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'navy',
  },
  dataOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  dataOption: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
  },
  networkLogo: {
    width: 30,
    height: 30,
    marginBottom: 5,
    borderRadius: 15,
  },
  selectedOption: {
    backgroundColor: '#F0F0F0',
  },
  purchaseButton: {
    marginTop: 10,
    backgroundColor: 'navy',
    padding: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  purchaseButtonText: {
    color: 'white',
  },
  modalContent: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 10,
    fontSize: 18,
    padding: 4,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
    margin: 5,
  },
  buyButton: {
    backgroundColor: 'navy',
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeIcon: {
    color: 'black',
    margin: 2,
  },
  pinInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    textAlign: 'center',
    width: '80%',
  },
  closeButton: {
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
  },
  closeButtonText: {
    color: 'navy',
    fontSize: 20,
  },
  errorContainer: {
    backgroundColor: 'brown',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  errorText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default DataScreen;
