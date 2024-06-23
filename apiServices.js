// apiService.js

// apiServices.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'https://arewadatahub.com';

// Create an axios instance
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to store session flag and user data in AsyncStorage
const storeUserData = async (userData) => {
  try {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

// Function to clear session flag and user data from AsyncStorage
const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('userData');
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
};

// Register a new user
export const register = async (name, email, phone, password, address, referralCode = '') => {
  try {
    const response = await api.post('/register', {
      name,
      email,
      phone,
      password,
      password_confirmation: password,
      address,
      referral_code: referralCode,
    });

    // Store session flag and user data
    await storeUserData(response.data);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login a user
export const login = async (email, password) => {
  try {
    const response = await api.post('/login', {
      email,
      password,
    });

    // Store session flag and user data
    await storeUserData(response.data);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Logout a user
export const logout = async () => {
  try {
    const response = await api.post('/logout');

    // Clear session flag and user data
    await clearUserData();

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};



// Fetch transactions
export const fetchTransactions = async (search = '', page = 1, pageSize = 10) => {
  try {
    const response = await api.get(`/transactions?search=${search}&page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch electricity distributors
export const fetchElectricityDistributors = async () => {
  try {
    const response = await api.get('/electricity-distributors');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch cable networks
export const fetchCableNetworks = async (withPlans = true) => {
  try {
    const response = await api.get(`/cable-networks?withPlans=${withPlans}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Validate meter
export const validateMeter = async (meterNumber, discoName, meterType) => {
  try {
    const response = await api.get(`/validate_meter?meter_number=${meterNumber}&disco_name=${discoName}&meter_type=${meterType}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Validate ICU
export const validateICU = async (smartCardNumber, cableName) => {
  try {
    const response = await api.get(`/validate_icu?smart_card_number=${smartCardNumber}&cable_name=${cableName}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Buy data
export const buyData = async (phoneNumber, mobileNetwork, dataPlanId, amount) => {
  try {
    const response = await api.post('/buy_data', {
      phone_number: phoneNumber,
      mobile_network: mobileNetwork,
      data_plan_id: dataPlanId,
      amount,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Buy airtime
export const buyAirtime = async (phoneNumber, mobileNetwork, amount) => {
  try {
    const response = await api.post('/buy_airtime', {
      phone_number: phoneNumber,
      mobile_network: mobileNetwork,
      amount,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Pay electricity bill
export const payElectricityBill = async (electricityDistributorId, discoName, meterNumber, meterType, amount, name, address, phoneNumber) => {
  try {
    const response = await api.post('/electricity_bill_payments', {
      electricity_distributor_id: electricityDistributorId,
      disco_name: discoName,
      meter_number: meterNumber,
      meter_type: meterType,
      amount,
      name,
      address,
      phone_number: phoneNumber,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Subscribe to cable
export const subscribeCable = async (cableNetworkId, cableName, smartCardNumber, cableSubscriptionPlanId, name, amount) => {
  try {
    const response = await api.post('/cable_subscriptions', {
      cable_network_id: cableNetworkId,
      cable_name: cableName,
      smart_card_number: smartCardNumber,
      cable_subscription_plan_id: cableSubscriptionPlanId,
      name,
      amount,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
