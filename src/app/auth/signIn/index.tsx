import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { colors } from '@/styles/colors';
import { styles } from './styles';
import { useRouter } from 'expo-router';
import { CustomInput } from '@/components/CustomInput';
import { useAuth } from '@/contexts/AuthContext';
import { ActionButton } from '@/components/ActionButton';

export default function SignIn() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    let hasError = false;
    const newErrors = { email: "", password: "" };

    // Validações
    if (!email) {
      newErrors.email = "Preencha o e-mail";
      hasError = true;
    } else if (!validateEmail(email)) {
      newErrors.email = "E-mail inválido";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "Preencha a senha";
      hasError = true;
    } else if (password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    setLoading(true);

    try {
      const result = await signIn(email, password);

      if (result.success) {
        // Login bem-sucedido - redireciona
        router.replace("/(drawer)/dashboard");
      } else {
        // Mostra erro para o usuário
        Alert.alert("Erro no Login", result.message);
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          Brecho Vitoriano
        </Text>
      </View>
        <Text style={styles.subTitle}>
          Entrar
        </Text>

      <CustomInput
        label="E-mail"
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
        editable={!loading}
      />
      
      <CustomInput
        label="Senha"
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={errors.password}
        editable={!loading}
      />

      <ActionButton 
        label={loading ? "Entrando..." : "Entrar"}
        onPress={handleSignIn}
        color={colors.black}
        //disabled={loading}
      />

      <TouchableOpacity 
        onPress={() => router.push("./signUp")}
        disabled={loading}
      >
        <Text style={[styles.linkText, loading && { opacity: 0.5 }]}>
          Não tem uma conta? Cadastre-se
        </Text>
      </TouchableOpacity>
    </View>
  );
}