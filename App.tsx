import React from "react";
import { TamaguiProvider } from "tamagui";
import config from "./tamagui.config"; 
import { Text, View } from "react-native";

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
        <Text>Olá, Tamagui configurado!</Text>
      </View>
    </TamaguiProvider>
  );
}