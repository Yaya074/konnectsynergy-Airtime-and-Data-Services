// AuthProvider.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginService, register as registerService, logout as logoutService } from '../apiServices';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        const storedUserData = await AsyncStorage.getItem('userData');
        if (isLoggedIn === 'true' && storedUserData) {
          setUser(JSON.parse(storedUserData)); // Set user to the stored user data
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginService(email, password);
      setUser(response);
      console.log("Login Successful", response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (name, email, phone, password, address, referralCode = '') => {
    try {
      const response = await registerService(name, email, phone, password, address, referralCode);
      setUser(response);
      console.log("Register Successfully", response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutService();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
