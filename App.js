import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native';
import Index from './navigation/Index';
export default function App() {

  return (
   <Index />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
