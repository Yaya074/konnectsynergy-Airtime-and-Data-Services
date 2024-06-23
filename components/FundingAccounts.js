import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';

const FundingAccounts = () => {
  const { user } = useContext(AuthContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user && (
        <>
          <Text style={styles.label}>Name: {user.name}</Text>
          <Text style={styles.label}>Email: {user.email}</Text>
          <Text style={styles.label}>Phone: {user.phone}</Text>
          <Text style={styles.label}>Address: {user.address}</Text>
          <Text style={styles.label}>Package: {user.package.name}</Text>
          <Text style={styles.label}>Wallet Balance: {user.wallet.balance}</Text>

          <Text style={styles.sectionTitle}>Funding Accounts:</Text>
          {user.funding_accounts.map((account, index) => (
            <View key={index} style={styles.accountContainer}>
              <Text style={styles.accountText}>Account Name: {account.account_name}</Text>
              <Text style={styles.accountText}>Account Number: {account.account_number}</Text>
              <Text style={styles.accountText}>Bank Name: {account.bank_name}</Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  accountContainer: {
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  accountText: {
    fontSize: 16,
  },
});

export default FundingAccounts;
