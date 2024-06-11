import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';

const servicesData = {
  gotv: [
    { name: 'GOTV Max', price: 72000, validity: '1 month' },
    { name: 'GOTV Ninja', price: 3300, validity: '1 month' },
    { name: 'GOTV Basic', price: 2000, validity: '1 month' },
    { name: 'GOTV Lite', price: 800, validity: '1 month' },
    { name: 'GOTV Plus', price: 1500, validity: '1 month' },
    { name: 'GOTV Jolli', price: 2400, validity: '1 month' },
    { name: 'GOTV Yangas', price: 2200, validity: '1 month' },
    { name: 'GOTV Jinja', price: 2700, validity: '1 month' },
    { name: 'GOTV Entertainer', price: 3000, validity: '1 month' },
    { name: 'GOTV Family', price: 1200, validity: '1 month' },
  ],
  dstv: [
    { name: 'DSTV Premium', price: 15000, validity: '1 month' },
    { name: 'DSTV Compact Plus', price: 10500, validity: '1 month' },
    { name: 'DSTV Compact', price: 6800, validity: '1 month' },
    { name: 'DSTV Family', price: 4000, validity: '1 month' },
    { name: 'DSTV Padi', price: 1850, validity: '1 month' },
    { name: 'DSTV Yanga', price: 2550, validity: '1 month' },
    { name: 'DSTV Confam', price: 4500, validity: '1 month' },
    { name: 'DSTV Access', price: 2000, validity: '1 month' },
    { name: 'DSTV Bouquet', price: 12000, validity: '1 month' },
    { name: 'DSTV Biggy', price: 4000, validity: '1 month' },
  ],
  startimes: [
    { name: 'Startimes Classic', price: 1800, validity: '1 month' },
    { name: 'Startimes Nova', price: 600, validity: '1 month' },
    { name: 'Startimes Smart', price: 1900, validity: '1 month' },
    { name: 'Startimes Super', price: 3800, validity: '1 month' },
    { name: 'Startimes Basic', price: 1300, validity: '1 month' },
    { name: 'Startimes Unique', price: 4800, validity: '1 month' },
    { name: 'Startimes Classic Bouquet', price: 2200, validity: '1 month' },
    { name: 'Startimes Unique Bouquet', price: 6500, validity: '1 month' },
    { name: 'Startimes Basic Bouquet', price: 3000, validity: '1 month' },
    { name: 'Startimes Super Bouquet', price: 4500, validity: '1 month' },
  ],
};

const CableTVScreen = () => {
  const [selectedTV, setSelectedTV] = useState('gotv');
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [smartCardNumber, setSmartCardNumber] = useState('');
  const [pin, setPin] = useState('');
  const [receiptInfo, setReceiptInfo] = useState(null);
  const modalizeRef = useRef(null);
  const pinModalizeRef = useRef(null);
  const receiptModalizeRef = useRef(null);

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity style={styles.serviceItem} onPress={() => handleServicePress(item)}>
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.servicePrice}>N{item.price}</Text>
      <Text style={styles.serviceValidity}>{item.validity}</Text>
    </TouchableOpacity>
  );

  const handleServicePress = (service) => {
    setIsLoading(true);
    setSelectedService(service);

    // Simulate loading and then show modal
    setTimeout(() => {
      setIsLoading(false);
      modalizeRef.current?.open();
    }, 2000);
  };

  const renderTabButton = (tv) => (
    <TouchableOpacity
      style={[styles.tabButton, selectedTV === tv && styles.selectedTabButton]}
      onPress={() => setSelectedTV(tv)}
    >
      <Text>{tv.toUpperCase()}</Text>
    </TouchableOpacity>
  );

  const handlePurchase = () => {
    modalizeRef.current?.close();
    pinModalizeRef.current?.open();
    
  };

  const handlePinSubmit = () => {
    // Validate pin
    if (pin.length !== 4) {
      alert('Please enter a valid 4-digit PIN');
      return;
    }

    // Close pin modal and open receipt modal
    pinModalizeRef.current?.close();
    setReceiptInfo({
      service: selectedService,
      smartCardNumber: smartCardNumber,
      pin: pin,
    });
    receiptModalizeRef.current?.open();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.smartCardInput}
        placeholder="Enter Smart Card Number"
        value={smartCardNumber}
        onChangeText={setSmartCardNumber}
      />
      <View style={styles.tabContainer}>
        {renderTabButton('gotv')}
        {renderTabButton('dstv')}
        {renderTabButton('startimes')}
      </View>
      <FlatList
        data={servicesData[selectedTV]}
        renderItem={renderServiceItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      />
      <Modalize  ref={modalizeRef} adjustToContentHeight={true} modalStyle={styles.modalContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <Text>Service Name: {selectedService?.name}</Text>
            <Text>Price: N{selectedService?.price}</Text>
            <Text>Validity: {selectedService?.validity}</Text>
            <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
              <Text>Purchase</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modalize>
      <Modalize ref={pinModalizeRef} adjustToContentHeight={true} modalStyle={styles.modalContainer}>
        <View>
          <Text>Enter your 4-digit PIN</Text>
          <TextInput
            style={styles.pinInput}
            value={pin}
            onChangeText={setPin}
            maxLength={4}
            keyboardType="numeric"
            secureTextEntry={true}
            placeholder="ENTER PIN"
          />
          <TouchableOpacity style={styles.confirmButton} onPress={handlePinSubmit}>
            <Text>Confirm</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
      <Modalize adjustToContentHeight={true} ref={receiptModalizeRef} modalStyle={styles.modalContainer}>
        <View>
          <Text>Receipt</Text>
          <Text>Service: {receiptInfo?.service?.name}</Text>
          <Text>Smart Card Number: {receiptInfo?.smartCardNumber}</Text>
          <Text>PIN: {receiptInfo?.pin}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => receiptModalizeRef.current?.close()}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  smartCardInput: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabButton: {
    padding: 10,
  },
  selectedTabButton: {
    borderBottomWidth: 2,
    borderColor: 'blue',
  },
  flatListContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  serviceItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  serviceName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  servicePrice: {
    fontSize: 16,
  },
  serviceValidity: {
    fontSize: 12,
    color: 'grey',
  },
  modalContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  purchaseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    borderRadius: 5,
  },
  pinInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  confirmButton: {
    padding: 10,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default CableTVScreen;
