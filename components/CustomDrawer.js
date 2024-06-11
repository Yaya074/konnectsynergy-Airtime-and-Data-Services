import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    Linking
  } from "react-native";
  import {
    DrawerContentScrollView,
  } from "@react-navigation/drawer";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
  import React, { useContext, useState } from "react";
 import { AuthContext } from "../navigation/AuthProvider";


  
  
  const CustomDrawer = ( props,{  navigation }) => {
    const { user, logout } = useContext(AuthContext);
    
  
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView
          {...props}
          // contentContainerStyle={{ backgroundColor: "orange" }}
        >
         
          <View style={{ flex: 1, paddingTop: 0 }}>
            <View style={{ marginLeft: 25 }}>
              {/* <DrawerItemList {...props} /> */}
              <View style={{flexDirection:"row",  justifyContent:"center", alignItems:"center", right:7 }}>
              <Image source={require("../assets/k.jpg")} style={{width:80, height:80}} />
              <Text style={{color:"purple", fontSize:28}}>Konnectsenergy</Text>
              </View>
              <View style={{backgroundColor:"#F5F5F5", borderColor:"navy", borderWidth:0.3,
               padding:4, top:5, borderRadius:6, width:200, justifyContent:"center",alignItems:"center"}}>
              <Text style={{color:"navy", fontSize:18}}>{user.email}</Text>
              <Text style={{color:"navy", fontSize:12}}>Wallet: ₦1000.00</Text>
              </View>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Home")}
                style={{ paddingVertical: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="home-outline"
                    size={28}
                    style={{ color: 'navy' }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
  
                      marginLeft: 15,
                      fontWeight: "bold",
                
                    }}>
                    Dashboard
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => props.navigation.navigate("Profile")}
                style={{ paddingVertical: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="person-outline"
                    size={28}
                    style={{ color: 'navy' }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
  
                      marginLeft: 15,
                      fontWeight: "bold",
                     
                    }}>
                    Profile
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => props.navigation.navigate("PDf's")}
                style={{ paddingVertical: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="wifi"
                    size={28}
                    style={{ color: "navy" }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
  
                      marginLeft: 15,
                      fontWeight: "bold",
                      
                    }}>
                   Buy Data
                  </Text>
                </View>
              </TouchableOpacity>
  
              <TouchableOpacity
                // onPress={() => props.navigation.navigate("StudentsProfile")}
                style={{ paddingVertical: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="flash-outline"
                    size={28}
                    style={{ color: "navy" }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
  
                      marginLeft: 15,
                      fontWeight: "bold",
                     
                    }}>
                   Bills
                  </Text>
                </View>
              </TouchableOpacity>
  
              <TouchableOpacity
                // onPress={() => props.navigation.navigate("About us")}
                style={{ paddingVertical: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="call-outline"
                    size={25}
                    style={{ color: 'navy'  }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      marginLeft: 15,
                      fontWeight: "bold",
                      
                    }}>
                    Buy Airtime VTU
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => props.navigation.navigate("About us")}
                style={{ paddingVertical: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="repeat-outline"
                    size={28}
                    style={{ color: 'navy'  }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
  
                      marginLeft: 15,
                      fontWeight: "bold",
                      
                    }}>
                    Convert Airtime to Cash
                  </Text>
                </View>
              </TouchableOpacity>
  
              <TouchableOpacity
                // onPress={() => props.navigation.navigate("About us")}
                style={{ paddingVertical: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="filter-outline"
                    size={28}
                    style={{ color: 'navy'  }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
  
                      marginLeft: 15,
                      fontWeight: "bold",
                      
                    }}>
                    Channels
                  </Text>
                </View>
              </TouchableOpacity>
              
            
              <TouchableOpacity
                // onPress={() => props.navigation.navigate("About us")}
                style={{ paddingVertical: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="calendar-outline"
                    size={28}
                    style={{ color: 'navy'  }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
  
                      marginLeft: 15,
                      fontWeight: "bold",
                      
                    }}>
                    Scheduled Transactions
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={() => props.navigation.navigate("About us")}
                style={{ paddingVertical: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="folder-outline"
                    size={28}
                    style={{ color: 'navy'  }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
  
                      marginLeft: 15,
                      fontWeight: "bold",
                      
                    }}>
                    My Wallet
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={() => props.navigation.navigate("About us")}
                style={{ paddingVertical: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="lock-closed"
                    size={28}
                    style={{ color: 'navy'  }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
  
                      marginLeft: 15,
                      fontWeight: "bold",
                      
                    }}>
                   Complete KYC
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => Linking.openURL("https://konnectsynergy.com.ng/")}
                style={{ paddingVertical: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="earth-outline"
                    size={28}
                    style={{ color: 'navy'  }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
  
                      marginLeft: 15,
                      fontWeight: "bold",
                      
                    }}>
                  Visit Website
                  </Text>
                </View>
              </TouchableOpacity>
              

            </View>
          </View>
        </DrawerContentScrollView>
        <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc",top:10 }}>
          <TouchableOpacity
            onPress={()=>{}}
            style={{ paddingVertical: 15 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="share-social-outline"
                size={22}
                style={{ color: 'navy'  }}
              />
              <Text
                style={{
                  fontSize: 15,
               
                  marginLeft: 5,
                  fontWeight: "bold",
                }}>
                Refer a Friend
              </Text>
            </View>
          </TouchableOpacity>
  
          <TouchableOpacity
          activeOpacity={0.7}
            onPress={() => logout()}
            style={{ paddingVertical: 15,width:100 }}>
            <View style={{ flexDirection: "row", alignItems: "center",
            backgroundColor:"navy",padding:10,borderRadius:60,marginRight:170,width:100 }}>
              <Ionicons
                name="exit-outline"
                size={22}
                style={{ color:"white"}}
              />
              <Text
                style={{
                  fontSize: 15,
  
                  marginLeft: 5,
                  color: 'white',
                  fontWeight: "bold",
                }}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default CustomDrawer;
  