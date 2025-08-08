


import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Button, ActivityIndicator,
  TouchableOpacity, StyleSheet
} from 'react-native';
import { getMenuByRestaurantId } from '../services/restaurant.service';
import { useCart } from '../context/CartContext';

const RestaurantMenuScreen = ({ route, navigation }) => {
  const { restaurantId, restaurantName } = route.params;
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenuByRestaurantId(restaurantId);
        setMenuItems(data);
      } catch (error) {
        console.error('Failed to load menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [restaurantId]);

  const handleAddToCart = (item) => {
  addToCart({ ...item, restaurant_id: restaurantId }); 
};

  const renderItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Text style={styles.itemTitle}>{item.item_name} - ₹{item.price}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Button title="Add to Cart" onPress={() => handleAddToCart(item)} />
    </View>
  );

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{restaurantName}'s Menu</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {cartItems.length > 0 && (
        <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.cartButtonText}>View Cart ({cartItems.length})</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 22, padding: 16, fontWeight: 'bold' },
  menuItem: { padding: 16, borderBottomWidth: 1, borderColor: '#ccc' },
  itemTitle: { fontSize: 16 },
  itemDescription: { color: 'gray', marginBottom: 8 },
  cartButton: {
    position: 'absolute',
    bottom: 20, left: 20, right: 20,
    backgroundColor: '#2196F3',
    padding: 15, borderRadius: 10,
    alignItems: 'center',
  },
  cartButtonText: {
    color: 'white', fontWeight: 'bold', fontSize: 16,
  },
});

export default RestaurantMenuScreen;
