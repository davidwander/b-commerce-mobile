import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function ChangeEmailScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Trocar E-mail' }} />
      <Text style={styles.title}>Tela de Troca de E-mail</Text>
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
