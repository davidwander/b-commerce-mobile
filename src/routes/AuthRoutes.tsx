// src/routes/AuthRoutes.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp'; // Se você tiver uma tela de registro

const Stack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SignIn" 
        component={SignIn} 
        options={{ headerShown: false }} // Oculta o cabeçalho
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUp} 
        options={{ headerShown: false }} // Oculta o cabeçalho
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;