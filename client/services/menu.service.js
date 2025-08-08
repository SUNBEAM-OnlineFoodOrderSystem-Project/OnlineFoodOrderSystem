// services/menu.service.js
import axios from 'axios';

const API_URL = 'http://10.158.241.143:5000/api';

export const getMenuByRestaurant = async (restaurantId) => {
  const res = await axios.get(`${API_URL}/restaurants/${restaurantId}/menu`);
  return res.data;
};
