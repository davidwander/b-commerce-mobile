// src/screens/SignIn.tsx
import React from 'react';
import { YStack, Input, Text } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const SignIn = () => {
  const handleSignIn = () => {
    console.log("Tentativa de login"); // Log para depuração
    router.replace('/'); // Navega para a tela inicial após o login
  };

  return (
    <YStack f={1} padding={68} backgroundColor="#ed9e59">
      {/* Cabeçalho */}
      <YStack>
        <Text 
          fontSize={32} 
          fontWeight="bold" 
          textAlign="center" 
          marginBottom={18}
        >
          Brecho Vitoriano
        </Text>
      </YStack>
      
      {/* Conteúdo principal */}
      <Text 
        textAlign="center" 
        marginBottom={52}
        fontSize={18}
      >
        App gerenciador e-commerce
      </Text>
      <Input 
        placeholder="E-mail"
        marginBottom={15} 
        padding={22}
        style={{ width: "100%" }} 
      />
      <Input 
        placeholder="Senha" 
        secureTextEntry 
        marginBottom={15} 
        padding={22}
        style={{ width: "100%" }}
      />
      
      {/* Botão de Login */}
      <TouchableOpacity 
        onPress={handleSignIn} 
        style={{
          backgroundColor: "#a34054", 
          padding: 15,
          borderRadius: 5,
          marginBottom: 15,
          alignItems: 'center',
        }}
      >
        <Text 
          style={{ 
            color: 'white', 
            fontWeight: 'bold' 
          }}
        >
          Confirmar
        </Text>
      </TouchableOpacity>

      {/* Botão de Registro */}
      <TouchableOpacity 
        onPress={() => { /* Lógica de registro */ }} 
        style={{
          backgroundColor: "#662249", 
          padding: 15,
          borderRadius: 5,
          marginBottom: 15,
          alignItems: 'center', 
        }}
      >
        <Text 
          style={{ 
            color: 'white', 
            fontWeight: 'bold' 
          }}
        >
          Criar 
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => { /* Lógica de redefinir a senha */ }} 
        style={{
          backgroundColor: "transparent", 
          padding: 15,
          borderRadius: 5,
          marginBottom: 15,
          alignItems: 'center', 
        }}
      >
        <Text 
          style={{ 
            color: 'black', 
            fontWeight: 'bold' 
          }}
        >
          Esqueceu a senha?
        </Text>
      </TouchableOpacity>
    </YStack>
  );
};

export default SignIn;