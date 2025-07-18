import React from 'react';
import { YStack, Text } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';
import CustomInput from '../components/CustomInput';
import { RootStackParamList } from '../types/navigation';
 

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUp = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate('Home');
  };

  const handleBack = () => {
    navigation.navigate('SignIn');
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
      
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput 
            label="Confirme a senha"
            placeholder="Senha"
            secureTextEntry
            marginBottom={15}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={{ backgroundColor: "#a34054", padding: 18, borderRadius: 5, marginBottom: 15, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Confirmar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleBack} style={{ backgroundColor: "transparent", padding: 15, borderRadius: 5, marginBottom: 15, alignItems: 'center' }}>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Voltar</Text>
      </TouchableOpacity>
    </YStack>
  );
};

export default SignUp;