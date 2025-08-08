// screens/Auth/SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { register } from '../../services/auth.service';

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const data = await register(fullName, email, phoneNumber, password);
      Alert.alert('Signup Successful', 'You can now login');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Signup Failed', error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Full Name:</Text>
      <TextInput value={fullName} onChangeText={setFullName} />
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <Text>Phone Number:</Text>
      <TextInput value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign Up" onPress={handleRegister} />
      <Text onPress={() => navigation.navigate('Login')}>Already have an account? Login</Text>
    </View>
  );
};

export default SignupScreen;
