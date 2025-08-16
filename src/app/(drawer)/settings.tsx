import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { Header } from "@/components/Header";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Configurações</Text>
      <Text style={styles.subtitle}>
        Aqui você poderá gerenciar preferências do app, notificações, temas, etc.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.page.tulips,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.black,
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 16,
    color: colors.black,
    textAlign: "center",
  },
});
