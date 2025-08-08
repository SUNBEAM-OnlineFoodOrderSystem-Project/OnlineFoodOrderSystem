// // screens/Auth/LoginScreen.js
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Alert,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { login } from '../../services/auth.service';

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const data = await login(email, password);

//       if (data.token && data.user) {
//         // Save token and user to AsyncStorage
//         await AsyncStorage.setItem('token', data.token);
//         await AsyncStorage.setItem('user', JSON.stringify(data.user));

//         Alert.alert('Login Success', `Welcome ${data.user.full_name}`);

//         // Navigate to HomeScreen and replace login screen
//         navigation.replace('Main');
//       } else {
//         Alert.alert('Login Failed', 'Token or user data missing');
//       }
//     } catch (error) {
//       Alert.alert(
//         'Login Failed',
//         error.response?.data?.message || 'Something went wrong'
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Email:</Text>
//       <TextInput
//         style={styles.input}
//         value={email}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//         keyboardType="email-address"
//       />

//       <Text style={styles.label}>Password:</Text>
//       <TextInput
//         style={styles.input}
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <Button title="Login" onPress={handleLogin} />

//       <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//         <Text style={styles.signupLink}>
//           Don't have an account? Sign up
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     flex: 1,
//     justifyContent: 'center',
//   },
//   label: {
//     marginBottom: 4,
//     fontWeight: 'bold',
//   },
//   input: {
//     borderWidth: 1,
//     marginBottom: 12,
//     padding: 8,
//     borderRadius: 4,
//     borderColor: '#ccc',
//   },
//   signupLink: {
//     marginTop: 12,
//     color: 'blue',
//     textAlign: 'center',
//   },
// });
















/////////////////////////////////////////////////////////////////////////////////










// screens/Auth/LoginScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../services/auth.service';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      if (data.token && data.user) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        alert(`Login Success: Welcome ${data.user.full_name}`);
        navigation.replace('Main');
      } else {
        alert('Login Failed: Token or user data missing');
      }
    } catch (error) {
      alert(
        error.response?.data?.message || 'Login Failed: Something went wrong'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardAvoiding}
    >
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Welcome Back!</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable style={({ pressed }) => [
          styles.button,
          pressed && { transform: [{ scale: 0.98 }] },
        ]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupLink}>
            Don't have an account? <Text style={styles.signupLinkBold}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
  signupLink: {
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
  },
  signupLinkBold: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
  },
});














