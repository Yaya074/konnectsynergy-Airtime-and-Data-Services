// DataScreen.js
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Ionicons from "react-native-vector-icons/Ionicons";
import { buyData } from '../apiServices'; // Import the buyData function

const DataScreen = ({ navigation }) => {
  const modalRef = useRef(null);
  const receiptModalRef = useRef(null);

  const [selectedNetwork, setSelectedNetwork] = useState('mtn');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [error, setError] = useState(null);
  const [receiptInfo, setReceiptInfo] = useState(null);

  const getNetworkId = (network) => {
    switch (network) {
      case 'mtn':
        return 1;
      case 'airtel':
        return 2;
      case 'glo':
        return 3;
      case 'etisalat':
        return 4;
      default:
        return null;
    }
  };

  const selectNetwork = (network) => {
    setSelectedNetwork(network);
    setPhoneNumber('');
    setSelectedPlan(null);
    setError(null);
  };

  const openModal = () => {
    if (!phoneNumber || !selectedPlan) {
      setError('Please Enter Your Phone Number and Select a Plan!');
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

  const handleConfirm = async () => {
    try {
      if (!selectedPlan) {
        throw new Error('Please select a data plan.');
      }

      const planId = selectedPlan.id; // Assuming selectedPlan is an object containing { id, name, price }

      const response = await buyData(phoneNumber, getNetworkId(selectedNetwork), planId);
      setReceiptInfo({
        plan: selectedPlan.name,
        phoneNumber: phoneNumber,
        network: selectedNetwork,
        message: 'Successful',
      });

      if (modalRef.current) {
        modalRef.current.close();
      }

      if (receiptModalRef.current) {
        receiptModalRef.current.open();
      }
    } catch (error) {
      Alert.alert('Error', `Data purchase failed: ${error.message}`);
    }
  };

  const closeReceiptModal = () => {
    if (receiptModalRef.current) {
      receiptModalRef.current.close();
    }
  };

  const renderPlanButtons = () => {
    const plans = getPlansForNetwork(selectedNetwork);

    if (!plans || plans.length === 0) {
      return null;
    }

    return (
      <View style={styles.planButtonRow}>
        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[styles.planButton, selectedPlan && selectedPlan.id === plan.id && styles.selectedPlanButton]}
            onPress={() => setSelectedPlan(plan)}
          >
            <Text style={styles.planButtonText}>{plan.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const getPlansForNetwork = (network) => {
    switch (network) {
      case 'mtn':
        return [
          { id: 1, name: '1 GB', price: 267.00 },
          { id: 2, name: '2 GB', price: 534.00 },
          { id: 3, name: '3 GB', price: 801.00 },
          { id: 4, name: '500 MB', price: 135.00 },
          { id: 81, name: '5 GB', price: 1335.00 },
          { id: 82, name: '10 GB', price: 2670.00 },
        ];
      case 'airtel':
        return [
          { id: 33, name: '1 GB', price: 285.00 },
          { id: 34, name: '2 GB', price: 570.00 },
          { id: 35, name: '5 GB', price: 1425.00 },
          { id: 36, name: '500 MB', price: 145.00 },
          { id: 84, name: '10 GB', price: 2850.00 },
          { id: 85, name: '100 MB', price: 85.00 },
          { id: 86, name: '300 MB', price: 130.00 },
          { id: 87, name: '15 GB', price: 4275.00 },
          { id: 88, name: '20 GB', price: 5700.00 },
        ];
      case 'glo':
        return [
          { id: 53, name: '1 GB', price: 245.00 },
          { id: 54, name: '2 GB', price: 490.00 },
          { id: 55, name: '3 GB', price: 735.00 },
          { id: 56, name: '500 MB', price: 125.00 },
          { id: 57, name: '5 GB', price: 1225.00 },
          { id: 58, name: '10 GB', price: 2450.00 },
          { id: 93, name: '200 MB', price: 70.00 },
        ];
      case 'etisalat':
        return [
          { id: 73, name: '1 GB', price: 185.00 },
          { id: 74, name: '2 GB', price: 370.00 },
          { id: 75, name: '3 GB', price: 555.00 },
          { id: 76, name: '500 MB', price: 95.00 },
          { id: 94, name: '4 GB', price: 576.00 },
        ];
      default:
        return [];
    }
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderPlanButtons()}
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
          <Text style={styles.modalText}>Plan: {selectedPlan ? selectedPlan.name : ''}</Text>
          <Text style={styles.modalText}>Network: {selectedNetwork}</Text>
          <TouchableOpacity style={styles.buyButton} onPress={handleConfirm}>
            <Text style={styles.buyButtonText}>Buy</Text>
          </TouchableOpacity>
        </View>
      </Modalize>

      <Modalize ref={receiptModalRef} adjustToContentHeight={true} snapPoint={800}>
        <TouchableOpacity onPress={closeReceiptModal}>
          <Ionicons name="close" size={30} style={[styles.closeIcon,{left:1}]} />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>RECEIPT</Text>
        {receiptInfo && (
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Plan: {receiptInfo.plan}</Text>
            <Text style={styles.modalText}>Phone Number: {receiptInfo.phoneNumber}</Text>
            <Text style={styles.modalText}>Network: {receiptInfo.network}</Text>
            <Text style={styles.modalText}>Purchased: {receiptInfo.message}</Text>
            <TouchableOpacity onPress={closeReceiptModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modalize>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  networkLogos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedLogo: {
    borderColor: '#4CAF50',
  },
  phoneNumberInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 20,
  },
  planButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  planButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedPlanButton: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  planButtonText: {
    color: 'white',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeIcon: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  modalContent: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DataScreen;
