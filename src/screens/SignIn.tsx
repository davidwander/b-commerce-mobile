export type RootStackParamList = {
  SignIn: undefined; 
  SignUp: undefined; 
  Home: undefined; 
};

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { createUser } from '../api'; // Importar a função de login
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const SignIn = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await createUser(data); // Chamar a função de login
      console.log('Login bem-sucedido:', response);
      // Navegar para a tela inicial ou fazer outra ação
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => <CustomInput {...field} label="E-mail" />}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => <CustomInput {...field} label="Senha" secureTextEntry />}
      />
      <CustomButton label="Login" onPress={handleSubmit(onSubmit)} />
    </form>
  );
};

export default SignIn;