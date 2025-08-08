// screens/Auth/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../services/auth.service';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = await login(email, password);

      if (data.token && data.user) {
        // Save token and user to AsyncStorage
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));

        Alert.alert('Login Success', `Welcome ${data.user.full_name}`);

        // Navigate to HomeScreen and replace login screen
        navigation.replace('Home');
      } else {
        Alert.alert('Login Failed', 'Token or user data missing');
      }
    } catch (error) {
      Alert.alert(
        'Login Failed',
        error.response?.data?.message || 'Something went wrong'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupLink}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
    borderColor: '#ccc',
  },
  signupLink: {
    marginTop: 12,
    color: 'blue',
    textAlign: 'center',
  },
});
