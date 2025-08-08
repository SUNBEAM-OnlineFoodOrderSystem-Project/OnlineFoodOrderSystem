// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ProfileScreen = ({ navigation }) => {
//   const [user, setUser] = useState(null);

//   const getUserData = async () => {
//     const userData = await AsyncStorage.getItem('user');
//     if (userData) {
//       setUser(JSON.parse(userData));
//     }
//   };

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem('token');
//     await AsyncStorage.removeItem('user');
//     navigation.replace('Login');
//   };

//   useEffect(() => {
//     getUserData();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {user ? (
//         <>
//           <Text style={styles.text}>Welcome, {user.full_name}</Text>
//           <Text>Email: {user.email}</Text>
//           <Text>Phone: {user.phone_number}</Text>
//           <Button title="Logout" onPress={handleLogout} />
//         </>
//       ) : (
//         <Text>Loading Profile...</Text>
//       )}
//     </View>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
// });
















/////////////////////////////////////////////////////////////////////////////































import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    navigation.replace('Login'); // Redirect to Login
  };

  const confirmLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: handleLogout },
    ]);
  };

  return (
    <View style={styles.container}>
      

      {user ? (
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{user.full_name || 'N/A'}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
      ) : (
        <Text>Loading user data...</Text>
      )}

      <View style={styles.buttonContainer}>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={confirmLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 30,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
    fontSize: 16,
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#5a67d8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: '#e53e3e',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
