import React, { useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Animated, Image } from 'react-native';

const OrderSuccessScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // For fade-in
  const scaleAnim = useRef(new Animated.Value(0.7)).current; // For scaling

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.message}>Your order was placed successfully!</Text>
        <View style={styles.buttonWrapper}>
          <Button
            title="Go to Home"
            onPress={() => navigation.navigate('MainTabs')}
            color="#4CAF50"
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fdfc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  animatedContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  message: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2e7d32',
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },
});
