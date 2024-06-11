import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Developer Information</Text>
        <View style={styles.developerInfoContainer}>
          <Text style={styles.developerInfoLabel}>Developer:</Text>
          <Text style={styles.developerInfoText}>Khalil Mu'azu</Text>
        </View>
        <View style={styles.developerInfoContainer}>
          <Text style={styles.developerInfoLabel}>Contact:</Text>
          <Text style={styles.developerInfoText}>developer@example.com</Text>
        </View>
        <View style={styles.developerInfoContainer}>
          <Text style={styles.developerInfoLabel}>Version:</Text>
          <Text style={styles.developerInfoText}>1.0.0</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  developerInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  developerInfoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  developerInfoText: {
    fontSize: 16,
  },
});

export default SettingsScreen;
