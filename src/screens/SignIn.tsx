export type RootStackParamList = {
  SignIn: undefined; 
  SignUp: undefined; 
  Home: undefined; 
};

import React from 'react';
import { YStack, Text } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList as NavigationParamList } from '../types/navigation'; 

import CustomInput from '../components/CustomInput'; 

type SignInScreenNavigationProp = StackNavigationProp<NavigationParamList, 'SignIn'>;

const SignIn = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>(); // Obtenha o objeto de navegação com tipos

  const handleSignIn = () => {
    console.log("Tentativa de login"); 
    navigation.navigate('Home'); 
  };

  const handleSignUp = () => {
    console.log("Navegando para a tela de registro");
    navigation.navigate('SignUp'); 
  };

  return (
    <YStack 
      f={1} 
      padding={30}
      paddingTop={68} 
      backgroundColor="#ed9e59"
    >
      {/* Cabeçalho */}
      <YStack>
        <Text 
          fontSize={32} 
          fontWeight="bold" 
          textAlign="center" 
          marginBottom={20}
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
      
      <CustomInput 
        label="E-mail"
        placeholder="E-mail"
        marginBottom={15}
        padding={22}
        style={{ width: "100%" }}
      />
      
      <CustomInput 
        label="Senha"
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
          padding: 18,
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
        onPress={handleSignUp} 
        style={{
          backgroundColor: "#662249", 
          padding: 18,
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