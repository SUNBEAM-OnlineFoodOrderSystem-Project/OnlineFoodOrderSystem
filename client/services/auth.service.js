// services/auth.service.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_URL = 'http://10.158.241.143:5000/api/auth';

/**
 * Login user with email and password.
 * Saves JWT token and user data in AsyncStorage.
 */
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    const { token, user } = response.data;

    // Check for both token and user
    if (!token || !user) {
      throw new Error('Login failed: Token or user data missing');
    }

    // Store in AsyncStorage as string
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));

    return response.data;
  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Register a new customer.
 */
export const register = async (full_name, email, phone_number, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      full_name,
      email,
      phone_number,
      password,
      role_id: 2 // role_id for Customer
    });

    return response.data;
  } catch (error) {
    console.error('Register Error:', error.response?.data || error.message);
    throw error;
  }
};
