import React from 'react';
import { StyleSheet, View } from 'react-native';
import ContactForm from '../components/ContactForm';

export default function App() {
  return (
    <View style={styles.container}>
      <ContactForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});