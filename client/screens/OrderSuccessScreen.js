

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OrderSuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>🎉 Your order was placed successfully!</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default OrderSuccessScreen;
