// // screens/Auth/SignupScreen.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, Alert } from 'react-native';
// import { register } from '../../services/auth.service';

// const SignupScreen = ({ navigation }) => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = async () => {
//     try {
//       const data = await register(fullName, email, phoneNumber, password);
//       Alert.alert('Signup Successful', 'You can now login');
//       navigation.navigate('Login');
//     } catch (error) {
//       Alert.alert('Signup Failed', error.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text>Full Name:</Text>
//       <TextInput value={fullName} onChangeText={setFullName} />
//       <Text>Email:</Text>
//       <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
//       <Text>Phone Number:</Text>
//       <TextInput value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
//       <Text>Password:</Text>
//       <TextInput value={password} onChangeText={setPassword} secureTextEntry />
//       <Button title="Sign Up" onPress={handleRegister} />
//       <Text onPress={() => navigation.navigate('Login')}>Already have an account? Login</Text>
//     </View>
//   );
// };

// export default SignupScreen;



















//////////////////////////////////////////////////////////////////////////////






























// screens/Auth/SignupScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Pressable,
  Animated,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { register } from '../../services/auth.service';

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRegister = async () => {
    if (!fullName || !email || !phoneNumber || !password) {
      Alert.alert('Validation Error', 'All fields are required!');
      return;
    }

    try {
      const data = await register(fullName, email, phoneNumber, password);
      Alert.alert('Signup Successful', 'You can now login');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Signup Failed', error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardAvoiding}
    >
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Create Account</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          placeholderTextColor="#aaa"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="9876543210"
          placeholderTextColor="#aaa"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { transform: [{ scale: 0.98 }] },
          ]}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>
            Already have an account? <Text style={styles.loginLinkBold}>Login</Text>
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const PRIMARY_COLOR = '#4B6CB7';
const SECONDARY_COLOR = '#182848';

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: SECONDARY_COLOR,
    marginBottom: 32,
  },
  label: {
    marginBottom: 6,
    marginLeft: 4,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#4B6CB7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  loginLink: {
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
  },
  loginLinkBold: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
  },
});
