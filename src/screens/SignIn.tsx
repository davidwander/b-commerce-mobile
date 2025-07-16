// src/screens/SignIn.tsx
import React from 'react';
import { YStack, Input, Button, Text } from 'tamagui';
import { router } from 'expo-router';

const SignIn = () => {
  const handleSignIn = () => {
    console.log("Tentativa de login"); // Log para depuração
    // Aqui você pode implementar a lógica de login diretamente ou redirecionar
    router.replace('/'); // Navega para a tela inicial após o login
  };

  return (
    <YStack f={1} justifyContent="center" padding={20} backgroundColor="#ed9e59">
      <Text fontSize={24} fontWeight="bold" textAlign="center">Membership</Text>
      <Text textAlign="center" marginBottom={20}>Sign up for an all-access pass</Text>
      <Input placeholder="Username" marginBottom={15} />
      <Input placeholder="Password" secureTextEntry marginBottom={15} />
      <Button onPress={handleSignIn} backgroundColor="$primary">
        Login
      </Button>
      <Button onPress={() => { /* Lógica de registro */ }} backgroundColor="$secondary" marginTop={10}>
        Register
      </Button>
      <Text textAlign="center" marginTop={10}>
        Forgot password?
      </Text>
    </YStack>
  );
};

export default SignIn;