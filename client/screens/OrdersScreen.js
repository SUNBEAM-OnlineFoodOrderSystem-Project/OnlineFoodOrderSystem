

// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const OrdersScreen = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchOrders = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await axios.get('http://10.158.241.143:5000/api/orders/my', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setOrders(response.data.orders);
//     } catch (error) {
//       console.error('Failed to fetch orders:', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const renderOrder = ({ item }) => (
//     <View style={styles.orderContainer}>
//       <Text style={styles.title}>{item.restaurant_name}</Text>
//       <Text style={styles.amount}>Total: ₹{item.total_amount}</Text>
//       {item.items.map((itm, idx) => (
//         <Text key={idx} style={styles.item}>
//           {itm.product_name} × {itm.quantity} = ₹{itm.total_amount}
//         </Text>
//       ))}
//       <Text style={styles.date}>Ordered on: {new Date(item.created_at).toLocaleString()}</Text>
//     </View>
//   );

//   if (loading) {
//     return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
//   }

//   return (
//     <FlatList
//       data={orders}
//       keyExtractor={(item) => item.order_id.toString()}
//       renderItem={renderOrder}
//       contentContainerStyle={{ padding: 16 }}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   orderContainer: {
//     backgroundColor: '#f2f2f2',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   amount: {
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   item: {
//     fontSize: 14,
//   },
//   date: {
//     marginTop: 6,
//     fontSize: 12,
//     color: 'gray',
//   },
// });

// export default OrdersScreen;


















/////////////////////////////////////////////////////////////////////////////////////////////////////////























import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://10.158.241.143:5000/api/orders/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 5000, // Important
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Failed to fetch orders:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start();
  }, []);

  const renderOrder = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.title}>{item.restaurant_name}</Text>
      <Text style={styles.amount}>Total: ₹{item.total_amount}</Text>
      {item.items.map((itm, idx) => (
        <Text key={idx} style={styles.item}>
          🍽 {itm.product_name} × {itm.quantity} = ₹{itm.total_amount}
        </Text>
      ))}
      <Text style={styles.date}>🕒 {new Date(item.created_at).toLocaleString()}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading orders...</Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.order_id.toString()}
        renderItem={renderOrder}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No orders found.</Text>
        }
      />
    </Animated.View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#555',
  },
  orderContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2d3748',
    marginBottom: 6,
  },
  amount: {
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 10,
  },
  item: {
    fontSize: 14,
    color: '#4a5568',
    marginLeft: 10,
    marginBottom: 2,
  },
  date: {
    marginTop: 8,
    fontSize: 12,
    color: '#718096',
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 40,
  },
});
