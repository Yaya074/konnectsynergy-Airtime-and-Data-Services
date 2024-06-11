import { StyleSheet, Text, View , Image, Button, Alert, ScrollView, Dimensions, TouchableOpacity} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import {AuthContext} from "../navigation/AuthProvider"

const StoreScreen = () => {
  const [EquipmentsList, setEquipmentsList] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(()=>{
      const unsubscribe = firestore().collection("Equipments").onSnapshot(querrySnapshot=>{
        const EquipList = querrySnapshot.docs.map((doc)=>({
          id: doc.id,
          data: doc.data()
        }))
        setEquipmentsList(EquipList);
        console.log(EquipList)

      });

      return unsubscribe;
  },[])


  const deleteEquipment = async (EquipId)=>{

    try{
  await firestore().collection("Equipments").doc(EquipId).delete().catch((error)=>{
          alert(error)
      }).then(()=>{
        alert("Equipment Deleted");
      })
    }catch(e){
        alert(e);
    }
  }

 

  const formatTimestamp = (timestamp) => {
    const dateObject = timestamp.toDate();
    return `${dateObject.toDateString()} ${dateObject.toLocaleTimeString()}`;
  };

const TDate = new Date();

  return (
    <View style={styles.container}>
      <ScrollView>
    
      <View style={styles.EquipmentContainer}>
      {EquipmentsList.map((equipments)=>(
        <View style={{marginBottom:40, borderBottomWidth:2, borderColor:"#ccc", padding:20}}> 
        
          <Image resizeMode='center' style={{width:300, height:200, borderRadius:30, marginBottom:6}} source={{uri: equipments.data.equipmenImageURL}} />
          <Text style={styles.text}>{equipments.data.equipmentName}</Text>
          
          <Text  style={styles.text}>Date:  {formatTimestamp(equipments.data.createdAt)}</Text>
          {user.email == "muhammadbellomusa17@gmail.com" ?
       
       <TouchableOpacity  onPress={ ()=>Alert.alert("Delete?", "Are you sure you want to delete this item?",[
        {text: "yes", onPress: ()=>deleteEquipment(equipments.id)},
        {text: "cancel" , style: "cancel"},
       ])} style={{backgroundColor:"#0080ff",width:70, borderRadius:20,padding:7,marginTop:5}}><Text style={{color:"white", textAlign:"center"}}>Delete</Text></TouchableOpacity>  : null }
          
        </View>
      ))}
      </View>
      </ScrollView>
    </View>
  )
}

export default StoreScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    // backgroundColor:"white"
  },
  EquipmentContainer:{
    width: Dimensions.get("window").width,
    justifyContent:"center",
    alignItems:"center",
   
  },
  text:{
    fontSize:15,
    left:10
  }
})