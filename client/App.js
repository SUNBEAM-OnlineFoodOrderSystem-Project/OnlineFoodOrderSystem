
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Auth/LoginScreen';
import SignupScreen from './screens/Auth/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import RestaurantMenuScreen from './screens/RestaurantMenuScreen';
import CartScreen from './screens/CartScreen';
import { CartProvider } from './context/CartContext';
import OrderSuccessScreen from './screens/OrderSuccessScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <CartProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="RestaurantMenu" component={RestaurantMenuScreen} />
          <Stack.Screen name="MenuScreen" component={MenuScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
        </Stack.Navigator>
      </CartProvider>
    </NavigationContainer>
  );
}
