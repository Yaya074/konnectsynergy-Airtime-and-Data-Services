import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, RefreshControl, Clipboard, TouchableWithoutFeedback } from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from '../navigation/AuthProvider';
import { WaveIndicator } from 'react-native-indicators';
import { fetchTransactions } from '../apiServices'; // Import fetchTransactions if needed

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [transactions, setTransactions] = useState([]); // State to hold transactions data
  const [isBalanceVisible, setIsBalanceVisible] = useState(true); // State to toggle balance visibility

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onRefresh();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // Fetch transactions data when component mounts or when focused
    const fetchTransactionsData = async () => {
      try {
        const data = await fetchTransactions('', 1, 10); // Fetch transactions (adjust parameters as needed)
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactionsData();
  }, []);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const sterlingAccount = user?.funding_accounts?.find(account => account.bank_name === 'Sterling bank');

  return (
    <View style={styles.container}>
      <View>
        <ScrollView style={styles.topSection} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.heading}>Account Details</Text>
            {refreshing && <WaveIndicator color="navy" size={60} style={{ left: 70 }} />}
          </View>
          {sterlingAccount && (
            <View style={styles.accountDetails}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.accountInfo}>Account Number: </Text>
                <TouchableOpacity activeOpacity={1} onPress={() => copyToClipboard(sterlingAccount.account_number)}>
                  <Text style={{ fontSize: 16, marginBottom: 5, color: "navy" }}>{sterlingAccount.account_number}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => copyToClipboard(sterlingAccount.account_number)}>
                  <Ionicons name="copy-outline" color="navy" style={{ right: 8, justifyContent: "center" }} size={17} />
                </TouchableOpacity>
                <TouchableWithoutFeedback onPress={() => copyToClipboard(sterlingAccount.account_number)}>
                  <Text style={{ fontSize: 16 }}>{sterlingAccount.bank_name}</Text>
                </TouchableWithoutFeedback>
              </View>
              <View style={{ flexDirection: 'row', }}>
                <Text style={[styles.accountInfo, { fontSize: 20 }]}>
                  Balance: {user.wallet ? (isBalanceVisible ? `₦${user.wallet.balance ?? '0.00'}` : '₦***.**') : 'Loading...'}
                </Text>
                <TouchableOpacity onPress={toggleBalanceVisibility}>
                  <Ionicons
                    name={isBalanceVisible ? 'eye-off' : 'eye'}
                    color="black"
                    style={{ left: 10 }}
                    size={21}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.accountInfo]}>{sterlingAccount.account_name} - </Text>
                <Text style={[styles.accountInfo, { color: "navy" }]}> 1% charge</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.topSection}>
          <Text style={{ fontSize: 18 }}>Bonus Balance</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 18 }}>₦0.00</Text>
            <TouchableOpacity activeOpacity={0.5} style={{ backgroundColor: "navy", borderRadius: 10, width: 100, padding: 9, bottom: 20 }} onPress={() => { }}>
              <Text style={styles.buttonText}>Referrals</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Data")}>
              <Ionicons name="earth" color="white" size={25} />
              <Text style={styles.buttonText}>Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Airtime")}>
              <FontAwesome5 name="phone" size={29} color="white" />
              <Text style={styles.buttonText}>Airtime</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Coupon")}>
              <Ionicons name="wifi" size={29} color="white" />
              <Text style={styles.buttonText}>Coupon Data</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Cable")}>
              <Ionicons name="tv" color="white" size={25} />
              <Text style={styles.buttonText}>Cable TV</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Electricity")}>
              <Ionicons name="flash-outline" color="white" size={25} />
              <Text style={styles.buttonText}>Electricity</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Settings")}>
              <Ionicons name="settings-outline" color="white" size={25} />
              <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.middleSection}></View>
        <View style={styles.bottomSection}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.heading}>Transaction History</Text>
            {refreshing && <WaveIndicator color="navy" size={60} style={{ left: 70 }} />}
          </View>
          {/* Render transactions fetched from SettingsScreen */}
          {transactions.map((item) => (
            <View key={item.id} style={styles.transactionItem}>
              <Text>{item.description}</Text>
              {/* <Text>₦{item.amount}</Text> */}
              <Text>{item.date}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      {isCopied && (
        <View style={styles.copiedMessage}>
          <Text style={styles.copiedText}>Account Number Copied</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  topSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 4,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  accountDetails: {},
  accountInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonsContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'navy',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  middleSection: {},
  bottomSection: {
    padding: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  content: {
    flex: 1,
  },
  copiedMessage: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 15,
    paddingHorizontal: 58,
    borderRadius: 10,
  },
  copiedText: {
    color: 'white',
  },
});

export default HomeScreen;
