import React, { useRef, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Ionicons from "react-native-vector-icons/Ionicons";

const AirtimeScreen = ({navigation}) => {
  const modalRef = useRef(null);
  const pinModalRef = useRef(null);
  const receiptModalRef = useRef(null);
  
  const [selectedNetwork, setSelectedNetwork] = useState('mtn');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [error, setError] = useState(null);
  const [pin, setPin] = useState('');
  const [receiptInfo, setReceiptInfo] = useState(null);

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
  

  const selectNetwork = (network) => {
    setSelectedNetwork(network);
    setPhoneNumber('');
    setError(null);
  };

  const openModal = () => {
    if (!phoneNumber || !selectedAmount) {
      setError('Please Enter Your Phone Number and Select Amount!');
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    if (modalRef.current) {
      modalRef.current.open();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const handleConfirm = () => {
    if (pinModalRef.current) {
      if (modalRef.current) {
        modalRef.current.close();
      }
      pinModalRef.current.open();
    }
  };

  const handlePinSubmit = () => {
    setReceiptInfo({
      amount: selectedAmount,
      phoneNumber: phoneNumber,
      network: selectedNetwork,
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

  const renderAmountButtons = () => {
    const amounts = [100, 200, 300, 400, 500, 1000];
    const rows = [];
    for (let i = 0; i < 2; i++) {
      const row = (
        <View key={i} style={styles.amountButtonRow}>
          {amounts.slice(i * 3, (i + 1) * 3).map((amount, index) => (
            <TouchableOpacity
              key={index}
              style={styles.amountButton}
              onPress={() => setSelectedAmount(amount.toString())}
            >
              <Text style={styles.amountButtonText}>₦{amount}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
      rows.push(row);
    }
    return rows;
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
     
        {renderAmountButtons()}
    
      <TextInput
        style={styles.amountInput}
        placeholder="Enter amount"
        value={selectedAmount}
        keyboardType='decimal-pad'
        onChangeText={setSelectedAmount}
        placeholderTextColor="grey"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.confirmButton} onPress={openModal}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modalize ref={modalRef} adjustToContentHeight={true} snapPoint={300}>
        <TouchableOpacity onPress={closeModal}>
          <Ionicons name="close" size={30} style={styles.closeIcon} />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Confirm Purchase</Text>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Phone Number: {phoneNumber}</Text>
          <Text style={styles.modalText}>Amount: {selectedAmount}</Text>
          <Text style={styles.modalText}>Network: {selectedNetwork}</Text>
          <TouchableOpacity style={styles.buyButton} onPress={handleConfirm}>
            <Text style={styles.buyButtonText}>Buy</Text>
          </TouchableOpacity>
        </View>
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
          {pin.length === 4 ? 
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
            <Text style={styles.modalText}>Phone Number: {receiptInfo.phoneNumber}</Text>
            <Text style={styles.modalText}>Network: {receiptInfo.network}</Text>
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
    marginBottom: 40,
    backgroundColor:"#F0F0F0",
    
  },
  amountInput: {
    borderBottomWidth: 1,
    borderColor: 'navy',
    borderRadius: 5,
    paddingVertical: 16,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor:"#F0F0F0",
    marginTop:40
  },
  confirmButton: {
    backgroundColor: 'navy',
    padding: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
  amountButtonsContainer: {
    marginBottom: 20,
  },
  amountButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    margin:10
  },
  amountButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '30%',
  },
  amountButtonText: {
    fontSize: 16,
  },
});

export default AirtimeScreen;
