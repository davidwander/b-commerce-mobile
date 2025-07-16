import React from 'react';
import { YStack, Input, Text } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation'; // Importação correta

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUp = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>(); // Obtenha o objeto de navegação com tipos

  const handleSignIn = () => {
    console.log("Tentativa de login"); // Log para depuração
    // Aqui você pode implementar a lógica de login diretamente ou redirecionar
    navigation.replace('Home'); // Navega para a tela inicial após o login
  };

  const handleBack = () => {
    navigation.navigate('SignIn'); // Navega de volta para a tela de SignIn
  };

  return (
    <YStack 
      f={1} 
      padding={30}
      backgroundColor="#ed9e59"
    >
      {/* Cabeçalho */}
      <YStack paddingTop={68}>
        <Text 
          fontSize={32} 
          fontWeight="bold" 
          textAlign="center" 
          marginBottom={38}
        >
          Cadastrar novo usuario
        </Text>
      </YStack>
      
      {/* Conteúdo principal */}
      <Input 
        placeholder="E-mail"
        marginBottom={15} 
        padding={22}
        style={{ width: "100%" }} 
      />

      <Text>
        Criar uma senha
      </Text>
      <Input 
        placeholder="Senha" 
        secureTextEntry 
        marginBottom={15} 
        padding={22}
        style={{ width: "100%" }}
      />
      <Text>
        Repita a senha
      </Text>
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
      
      {/* Botão de Voltar */}
      <TouchableOpacity 
        onPress={handleBack} // Chama a função de navegação para a tela de SignIn
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
          Voltar
        </Text>
      </TouchableOpacity>
    </YStack>
  );
};

export default SignUp;