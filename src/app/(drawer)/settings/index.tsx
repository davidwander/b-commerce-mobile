import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Header } from "@/components/Header";

const settingsOptions = [
  { id: '1', title: 'Trocar E-mail' },
  { id: '2', title: 'Trocar Senha' },
  { id: '3', title: 'Nova Senha' },
];

export default function Settings() {
  const handleOptionPress = (optionId: string) => {
    // Aqui você pode adicionar a navegação ou modal correspondente
    console.log("Opção selecionada:", optionId);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.optionsWrapper}>
        {settingsOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.optionContainer}
            onPress={() => handleOptionPress(item.id)}
          >
            <Text style={styles.optionText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
