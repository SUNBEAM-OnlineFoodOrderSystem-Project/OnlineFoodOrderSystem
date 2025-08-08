
import axios from 'axios';

const API_URL = 'http://10.158.241.143:5000/api'; 

export const getRestaurants = async () => {
  const response = await axios.get(`${API_URL}/restaurants`);
  return response.data; // assuming it's an array of restaurants
};




export const getMenuByRestaurantId = async (restaurantId) => {
  const res = await axios.get(`${API_URL}/restaurants/${restaurantId}/menu`);
  return res.data;
};
