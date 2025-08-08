// services/search.service.js
import axios from 'axios';
const API_BASE_URL = 'http://10.158.241.143:5000/api'

export const searchQuery = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/search?q=${query}`);
  return response.data.results;
};
