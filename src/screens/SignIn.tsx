export type RootStackParamList = {
  SignIn: undefined; 
  SignUp: undefined; 
  Home: undefined; 
};

import React from 'react';
import { YStack, Text } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '../components/CustomInput'; 
import CustomButton from '../components/CustomButton'; 

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

const SignIn = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate('Home');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp'); 
  };

  return (
    <YStack 
      f={1} 
      padding={30}
      paddingTop={68} 
      backgroundColor="#ed9e59"
    >
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
      
      <Text 
        textAlign="center" 
        marginBottom={52}
        fontSize={18}
      >
        App gerenciador e-commerce
      </Text>
      
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput 
            label="E-mail"
            placeholder="E-mail"
            marginBottom={10}
            onChangeText={onChange} 
            onBlur={onBlur} 
            value={value} 
          />
        )}
      />
      
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput 
            label="Senha"
            placeholder="Senha"
            secureTextEntry
            marginBottom={28}
            onChangeText={onChange} 
            onBlur={onBlur} 
            value={value} 
          />
        )}
      />
      
      <CustomButton 
        label="Confirmar" 
        onPress={handleSubmit(onSubmit)} 
        theme='primary'
      />

      <CustomButton 
        label="Criar" 
        onPress={handleSignUp} 
        theme='secondary'
      />
    </YStack>
  );
};

export default SignIn;