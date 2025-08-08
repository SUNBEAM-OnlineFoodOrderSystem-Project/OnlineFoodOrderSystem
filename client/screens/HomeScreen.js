// import { useNavigation } from '@react-navigation/native';
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   ActivityIndicator,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
// import { getRestaurants } from '../services/restaurant.service';
// import axios from 'axios';

// const HomeScreen = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchText, setSearchText] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const data = await getRestaurants();
//         setRestaurants(data);
//       } catch (error) {
//         console.error('Error fetching restaurants:', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRestaurants();
//   }, []);

//   const handleSearch = async (text) => {
//     setSearchText(text);
//     if (text.trim().length === 0) {
//       setSearchResults([]);
//       return;
//     }

//     try {
//       const res = await axios.get(`http://10.158.241.143:5000/api/search?q=${text}`);
//       setSearchResults(res.data.results || []);
//     } catch (err) {
//       console.error('Search error:', err.message);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => navigation.navigate('RestaurantMenu', { restaurantId: item.id, restaurantName: item.name })}
//       style={{ padding: 16, borderBottomWidth: 1 }}
//     >
//       <Text style={{ fontSize: 18 }}>{item.name}</Text>
//       <Text style={{ color: 'gray' }}>{item.address}</Text>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
//   }

//   const dataToShow = searchText.trim() ? searchResults : restaurants;

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Search restaurants or menu..."
//         style={styles.searchBar}
//         value={searchText}
//         onChangeText={handleSearch}
//       />

//       <FlatList
//         data={dataToShow}
//         keyExtractor={(item, index) => `${item.type}-${item.id}-${index}`}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     flex: 1,
//   },
//   searchBar: {
//     backgroundColor: '#fff',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 8,
//     borderColor: '#ccc',
//     borderWidth: 1,
//   },
//   card: {
//     backgroundColor: '#f5f5f5',
//     marginBottom: 15,
//     borderRadius: 8,
//     padding: 10,
//     elevation: 2,
//   },
//   image: {
//     height: 180,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   address: {
//     color: '#666',
//     marginTop: 4,
//   },
//   rating: {
//     marginTop: 4,
//     fontWeight: 'bold',
//   },
//   typeLabel: {
//     marginTop: 4,
//     fontStyle: 'italic',
//     color: '#888',
//   },
// });

// export default HomeScreen;



////////////////////////////////////////////////////////////////////////////////////////////////////////////////







import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Pressable,
  Animated,
} from 'react-native';
import { getRestaurants } from '../services/restaurant.service';
import axios from 'axios';

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error.message);
      } finally {
        setLoading(false);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      }
    };

    fetchRestaurants();
  }, []);

  const handleSearch = async (text) => {
    setSearchText(text);
    if (text.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await axios.get(`http://10.158.241.143:5000/api/search?q=${text}`);
      setSearchResults(res.data.results || []);
    } catch (err) {
      console.error('Search error:', err.message);
    }
  };

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate('RestaurantMenu', {
        restaurantId: item.id,
        restaurantName: item.name
      })}
      style={({ pressed }) => [
        styles.card,
        pressed && { transform: [{ scale: 0.98 }] }
      ]}
    >
      <Image
        source={{ uri: item.image || `https://source.unsplash.com/600x400/?restaurant,food&sig=${item.id}` }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.address}>{item.address}</Text>
      {item.rating && (
        <Text style={styles.rating}>⭐ {item.rating.toFixed(1)}</Text>
      )}
      {item.type && (
        <Text style={styles.typeLabel}>{item.type}</Text>
      )}
    </Pressable>
  );

  const dataToShow = searchText.trim() ? searchResults : restaurants;

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} color="#4B6CB7" />;
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TextInput
        placeholder="Search restaurants or menu..."
        placeholderTextColor="#aaa"
        style={styles.searchBar}
        value={searchText}
        onChangeText={handleSearch}
      />

      <FlatList
        data={dataToShow}
        keyExtractor={(item, index) => `${item.type}-${item.id}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </Animated.View>
  );
};

const PRIMARY_COLOR = '#4B6CB7';
const SECONDARY_COLOR = '#182848';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: SECONDARY_COLOR,
    marginBottom: 12,
  },
  searchBar: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    marginBottom: 16,
    elevation: 2,
  },
  listContainer: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 16,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: {
    height: 180,
    width: '100%',
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  rating: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  typeLabel: {
    marginTop: 4,
    fontSize: 13,
    fontStyle: 'italic',
    color: '#888',
  },
});

export default HomeScreen;
