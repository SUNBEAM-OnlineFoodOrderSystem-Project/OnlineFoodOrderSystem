import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
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
      items: cartItems.map((item) => ({
        menu_id: item.id,
        quantity: item.quantity,
      })),
    };

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
      <Text style={styles.priceLine}>₹{item.price} × {item.quantity}</Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)} style={styles.quantityBtn}>
          <Text style={styles.quantityText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.qtyText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)} style={styles.quantityBtn}>
          <Text style={styles.quantityText}>＋</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>🛒 Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
          <View style={styles.footer}>
            <Text style={styles.total}>Total: ₹{getTotalAmount()}</Text>
            <TouchableOpacity
              onPress={handlePlaceOrder}
              style={[styles.orderBtn, placingOrder && styles.disabledBtn]}
              disabled={placingOrder}
            >
              {placingOrder ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.orderText}>Place Order</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 4,
  },
  priceLine: {
    fontSize: 14,
    color: '#4a5568',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 10,
  },
  quantityBtn: {
    backgroundColor: '#edf2f7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  qtyText: {
    fontSize: 16,
    color: '#1a202c',
  },
  removeBtn: {
    marginLeft: 'auto',
    backgroundColor: '#ffe5e5',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  removeText: {
    color: 'red',
    fontWeight: '600',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#1a202c',
    marginBottom: 12,
  },
  orderBtn: {
    backgroundColor: '#4FD1C5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: '#A0AEC0',
  },
  orderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 60,
    color: '#718096',
  },
  footer: {
    marginTop: 10,
  },
});
