import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { getRestaurants } from '../services/restaurant.service';
import axios from 'axios';

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error.message);
      } finally {
        setLoading(false);
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
    <TouchableOpacity
      onPress={() => navigation.navigate('RestaurantMenu', { restaurantId: item.id, restaurantName: item.name })}
      style={{ padding: 16, borderBottomWidth: 1 }}
    >
      <Text style={{ fontSize: 18 }}>{item.name}</Text>
      <Text style={{ color: 'gray' }}>{item.address}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  const dataToShow = searchText.trim() ? searchResults : restaurants;

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search restaurants or menu..."
        style={styles.searchBar}
        value={searchText}
        onChangeText={handleSearch}
      />

      <FlatList
        data={dataToShow}
        keyExtractor={(item, index) => `${item.type}-${item.id}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  card: {
    backgroundColor: '#f5f5f5',
    marginBottom: 15,
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  image: {
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    color: '#666',
    marginTop: 4,
  },
  rating: {
    marginTop: 4,
    fontWeight: 'bold',
  },
  typeLabel: {
    marginTop: 4,
    fontStyle: 'italic',
    color: '#888',
  },
});

export default HomeScreen;
