import React from "react";

import { useFonts } from 'expo-font';

import { TamaguiProvider } from "tamagui";
import config from "./tamagui.config"; 
import { NavigationContainer } from '@react-navigation/native';
import AuthRoutes from './src/routes/AuthRoutes'; 

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </TamaguiProvider>
  );
}