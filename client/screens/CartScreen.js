




import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../context/CartContext';

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [placingOrder, setPlacingOrder] = useState(false);

  const getTotalAmount = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getRestaurantId = () => {
  return cartItems.length > 0 ? cartItems[0].restaurant_id : null;
};

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart is empty', 'Please add items to your cart.');
      return;
    }

    const payload = {
      restaurant_id: getRestaurantId(),
      total_amount: getTotalAmount(),
      items: cartItems.map(item => ({
        menu_id: item.id,
        quantity: item.quantity
      }))
    };
    console.log("ORDER PAYLOAD:", JSON.stringify(payload, null, 2));

    try {
      setPlacingOrder(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
      Alert.alert('Unauthorized', 'Please login again.');
      return;
      }
    
      await axios.post('http://10.158.241.143:5000/api/orders', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      });
      setPlacingOrder(false);
      clearCart();
      navigation.navigate('OrderSuccess');
    } catch (error) {
      setPlacingOrder(false);
      console.error('Order Error:', error.message);
      Alert.alert('Order Failed', 'Could not place the order. Try again.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.item_name}</Text>
      <Text>₹{item.price} × {item.quantity}</Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)}>
          <Text style={styles.button}>-</Text>
        </TouchableOpacity>
        <Text>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
          <Text style={styles.button}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Text style={[styles.button, { color: 'red' }]}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          <Text style={styles.total}>Total: ₹{getTotalAmount()}</Text>
          <Button
            title={placingOrder ? 'Placing Order...' : 'Place Order'}
            onPress={handlePlaceOrder}
            disabled={placingOrder}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  card: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  button: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'right',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 60,
    color: '#555',
  },
});

export default CartScreen;
