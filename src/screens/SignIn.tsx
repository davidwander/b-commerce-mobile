// src/types/navigation.ts
export type RootStackParamList = {
  SignIn: undefined; // ou qualquer tipo de parâmetro que você espera
  SignUp: undefined; // ou qualquer tipo de parâmetro que você espera
  Home: undefined; // ou qualquer tipo de parâmetro que você espera
};

// src/screens/SignIn.tsx
import React from 'react';
import { YStack, Input, Text } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList as NavigationParamList } from '../types/navigation'; // Importação correta

type SignInScreenNavigationProp = StackNavigationProp<NavigationParamList, 'SignIn'>;

const SignIn = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>(); // Obtenha o objeto de navegação com tipos

  const handleSignIn = () => {
    console.log("Tentativa de login"); // Log para depuração
    navigation.navigate('Home'); // Navega para a tela inicial após o login
  };

  const handleSignUp = () => {
    console.log("Navegando para a tela de registro");
    navigation.navigate('SignUp'); // Navega para a tela de registro
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
        onPress={handleSignUp} // Chama a função de navegação para a tela de registro
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