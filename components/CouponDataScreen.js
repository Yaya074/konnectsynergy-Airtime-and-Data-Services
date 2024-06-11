import React, { useRef, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Ionicons from "react-native-vector-icons/Ionicons";

const CouponDataScreen = ({navigation}) => {
  const modalRef = useRef(null);
  const pinModalRef = useRef(null);
  const receiptModalRef = useRef(null);
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [error, setError] = useState(null);
  const [pin, setPin] = useState('');
  const [receiptInfo, setReceiptInfo] = useState(null);

  const mtnData = [
    { amount: 100, plan: '50MB', validity: '1 Day' },
    { amount: 200, plan: '100MB', validity: '2 Days' },
    { amount: 500, plan: '250MB', validity: '7 Days' },
    { amount: 1000, plan: '500MB', validity: '14 Days' },
    { amount: 2000, plan: '1GB', validity: '30 Days' },
    { amount: 5000, plan: '2.5GB', validity: '30 Days' },
  ];

  const openModal = (data) => {
    setSelectedData(data);
    if (modalRef.current) {
      modalRef.current.open();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const handleBuyPress = () => {
    if (pinModalRef.current) {
      pinModalRef.current.open();
    }
  };

  const handlePinSubmit = () => {
    setReceiptInfo({
      amount: selectedData.amount,
      plan: selectedData.plan,
      network: 'MTN',
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

  return (
    <View style={styles.container}>
      <View style={styles.networkLogos}>
        <TouchableOpacity onPress={() => setSelectedData(null)}>
          <Image source={require('../assets/mtn_logo.jpg')} style={[styles.logo]} />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.phoneNumberInput}
        placeholder="Enter a phone number"
        value={phoneNumber}
        keyboardType='decimal-pad'
        onChangeText={setPhoneNumber}
        placeholderTextColor="grey"
      />
      <Text style={{textAlign:"center",margin:10,fontSize:18, fontWeight:"bold", color:"navy"}}>SME</Text>
      <View style={styles.dataOptionsContainer}>
        {mtnData.map((data, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dataOption}
            onPress={() => openModal(data)}
          >
            <Image style={{width:20,height:20, borderRadius:20,margin:2}} source={require("../assets/mtn_logo.jpg")}  />
            <Text style={styles.dataOptionText}>N{data.amount}</Text>
            <Text style={styles.dataOptionText}>{data.plan}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modalize ref={modalRef} adjustToContentHeight={true} snapPoint={300}>
        <TouchableOpacity onPress={closeModal}>
          <Ionicons name="close" size={30} style={styles.closeIcon} />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Selected Data</Text>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Amount: {selectedData && selectedData.amount}</Text>
          <Text style={styles.modalText}>Plan: {selectedData && selectedData.plan}</Text>
          <Text style={styles.modalText}>Validity: {selectedData && selectedData.validity}</Text>
          <View style={{flexDirection:"row", justifyContent:"center",alignItems:"center"}}>
          <Text style={styles.modalText}>Network: MTN</Text>
          <Image style={{width:17,height:17,borderRadius:10}} source={require("../assets/mtn_logo.jpg")} />
            </View>
          <Text style={styles.modalText}>Phone Number: {phoneNumber}</Text>
          <TouchableOpacity style={styles.buyButton} onPress={handleBuyPress}>
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
            <View style={{flexDirection:"row", justifyContent:"center",alignItems:"center"}}>
          <Text style={styles.modalText}>Network: {receiptInfo.network}</Text>
          <Image style={{width:17,height:17,borderRadius:10}} source={require("../assets/mtn_logo.jpg")} />
            </View>
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
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth:2,
    borderColor:"navy"
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
  dataOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dataOption: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '30%',
  },
  dataOptionText: {
    fontSize: 16,
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
});

export default CouponDataScreen;
