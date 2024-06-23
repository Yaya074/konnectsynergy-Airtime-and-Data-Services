import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { fetchTransactions } from '../apiServices';

const SettingsScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true); // To track if there are more pages to fetch

  const loadTransactions = async () => {
    try {
      const data = await fetchTransactions('', page, 10);
      if (page === 1) {
        setTransactions(data); // If it's the first page, replace transactions
      } else {
        setTransactions((prevTransactions) => [...prevTransactions, ...data]); // Append transactions for subsequent pages
      }
      setHasMore(data.length === 10); // Assuming pageSize is 10, check if there are more transactions to fetch
    } catch (error) {
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [page]); // Load transactions when page changes

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      setPage(1); // Reset page to 1 to fetch fresh data
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Load next page if there are more transactions to fetch
    }
  };

  if (loading && !refreshing && page === 1) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00B7DD" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={transactions}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.transactionItem}>
          <Text>{item.description}</Text>
          <Text>{item.amount}</Text>
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={<Text>No transactions found</Text>}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  container: {
    padding: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
});

export default SettingsScreen;
