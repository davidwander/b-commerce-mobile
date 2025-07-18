import React from 'react';
import { YStack, Text } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton'; 
import { createUser } from '../api'; // Importar a função createUser
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

interface UserData {
  email: string;
  password: string;
}

const SignUp = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const { control, handleSubmit } = useForm<UserData>(); // Passar o tipo UserData aqui

  const onSubmit: SubmitHandler<UserData> = async (data) => { // Usar SubmitHandler com UserData
    try {
      const response = await createUser(data); // Chamar a função createUser
      console.log('Usuário criado com sucesso:', response);
      navigation.navigate('Home'); // Navegar para a tela inicial após o sucesso
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  return (
    <YStack f={1} padding={30} backgroundColor="#ed9e59">
      <YStack paddingTop={68}>
        <Text fontSize={32} fontWeight="bold" textAlign="center" marginBottom={38}>
          Cadastrar novo usuário
        </Text>
      </YStack>
      
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput 
            label="E-mail"
            placeholder="E-mail"
            marginBottom={15}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            keyboardType='email-address'
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput 
            label="Crie uma senha"
            placeholder="Senha"
            secureTextEntry
            marginBottom={15}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      
      <CustomButton 
        label="Confirmar" 
        onPress={handleSubmit(onSubmit)} 
      />
    </YStack>
  );
};

export default SignUp;