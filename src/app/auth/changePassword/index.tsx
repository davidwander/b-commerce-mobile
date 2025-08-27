import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function ChangePasswordScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Trocar Senha' }} />
      <Text style={styles.title}>Tela de Troca de Senha</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
