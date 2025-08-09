import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth'; // Spring Boot base URL

const register = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  return res.data;
};

const authService = { register, login };
export default authService;
