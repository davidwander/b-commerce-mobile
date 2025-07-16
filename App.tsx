import React from "react";
import { TamaguiProvider } from "tamagui";
import config from "./tamagui.config"; 
import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import AuthRoutes from './src/routes/AuthRoutes'; // Ajuste o caminho conforme necessário

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </TamaguiProvider>
  );
}