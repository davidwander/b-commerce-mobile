import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useRouter } from 'expo-router';
import { CustomInput } from '@/components/CustomInput';
import { useAuth } from '@/contexts/AuthContext';

export default function SignUp() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "" });

  const handleSignUp = () => {
    let hasError = false;
    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (!email) {
      newErrors.email = "Preencha o e-mail";
      hasError = true;
    }
    if (!password) {
      newErrors.password = "Preencha a senha";
      hasError = true;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirme a senha";
      hasError = true;
    }
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    // Aqui entra a lógica de cadastro real
    signIn(email, password); // loga direto após cadastro
    router.replace("/(drawer)/dashboard");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar</Text>

      <CustomInput
        label="E-mail"
        placeholder="Digite seu melhor e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
      />
      <CustomInput
        label="Senha"
        placeholder="Criar uma senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={errors.password}
      />
      <CustomInput
        label="Confirmar Senha"
        placeholder="Confirme sua senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        error={errors.confirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/../contexts/AuthContext")}>
        <Text style={styles.linkText}>Já tem uma conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
