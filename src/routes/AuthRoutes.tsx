import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp'; 

const Stack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SignIn" 
        component={SignIn} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUp} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;