import { StyleSheet, Text, View, TextInput, Button, Dimensions } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';


const AddEquipmentsScreen = () => {
    const [equpmentName, setEquimentName] = useState("");
    const [equpmentImageURL, setEquimentImageURL] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");


    const addEquipment=()=>{
        firestore().collection("Equipments").add({
            equipmentName: equpmentName,
            equipmenImageURL: equpmentImageURL,
            deliveryDate: deliveryDate,
            createdAt: firestore.FieldValue.serverTimestamp()
        }).catch((error)=>{
            alert(error);
        }).then(()=>{
            alert("Equipments Added Successfully");
            setEquimentName("");
            setEquimentImageURL("");
            setDeliveryDate("");
        })
    }

  return (
    <View style={styles.container}>
        

      <View style={styles.inputContainer}>
      <TextInput value={equpmentName} onChangeText={(text)=>setEquimentName(text)} style={styles.Input} placeholder='Equipment Name' />
      <TextInput value={equpmentImageURL} onChangeText={(text)=>setEquimentImageURL(text)} style={styles.Input}  placeholder='Equipments Image' />
      {/* <TextInput value={deliveryDate} onChangeText={(text)=>setDeliveryDate(text)} style={styles.Input} placeholder='Deliverery Date' /> */}
      </View>

      <View style={styles.buttonContainer}>
      <Button disabled={!equpmentName && !equpmentImageURL && !deliveryDate} onPress={addEquipment} title='Add Equipment' />
      </View>

    </View>
  )
}

export default AddEquipmentsScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    inputContainer:{
        width:"70%",
        padding:20,
        justifyContent:"center",
        alignItems:"center",
    },
    Input:{
        padding:10,
        borderWidth:1,
        borderRadius: 20,
        margin:10,
        width:Dimensions.get("window").width / 1.3,
        borderColor:"#cccccc"
    }
})