import { StyleSheet, View, ActivityIndicator, Image, Dimensions, Modal } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { AuthContext } from './AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WaveIndicator } from 'react-native-indicators';


const Route = () => {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
          setUser(true);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setInitializing(false);
      }
    };

    checkSession();
  }, []);

  if (initializing) {
    return (
      <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/icon.png")} />
      <Modal
        visible={true}
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="pink" />
        </View>
      </Modal>
    </View>
    );
  }

  return (
    <NavigationContainer> 
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Route;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -50,
    marginTop: -50,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darker semi-transparent black background
  },
});
