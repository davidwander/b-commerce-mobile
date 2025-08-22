import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { styles } from './styles';
import { colors } from '@/styles/colors';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { ActionButton } from '@/components/ActionButton';
import { CustomInput } from '@/components/CustomInput';
import { validatePassword } from '@/services/api';

export default function SignUp() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    let hasError = false;
    const newErrors = { name: "", email: "", password: "", confirmPassword: "" };

    // Validações
    if (!name.trim()) {
      newErrors.name = "Preencha o nome";
      hasError = true;
    } else if (name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres";
      hasError = true;
    }

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
    } else {
      // Valida senha forte
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        newErrors.password = `Senha deve ter: ${passwordValidation.errors.join(', ')}`;
        hasError = true;
      }
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirme a senha";
      hasError = true;
    } else if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    setLoading(true);

    try {
      const result = await signUp(email, password, name.trim());

      if (result.success) {
        // Cadastro bem-sucedido
        Alert.alert(
          "Sucesso!", 
          result.message,
          [
            {
              text: "OK",
              onPress: () => router.replace("/(drawer)/dashboard")
            }
          ]
        );
      } else {
        // Mostra erro para o usuário
        Alert.alert("Erro no Cadastro", result.message);
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastrar</Text>

      <CustomInput
        label="Nome"
        placeholder="Digite seu nome completo"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        error={errors.name}
        editable={!loading}
      />

      <CustomInput
        label="E-mail"
        placeholder="Digite seu melhor e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
        editable={!loading}
      />

      <CustomInput
        label="Senha"
        placeholder="Criar uma senha forte"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={errors.password}
        editable={!loading}
      />

      <CustomInput
        label="Confirmar Senha"
        placeholder="Confirme sua senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        error={errors.confirmPassword}
        editable={!loading}
      />

      {/* Dicas de senha forte */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 12, color: colors.black, textAlign: 'center' }}>
          Senha deve ter: 8+ caracteres, maiúscula, minúscula, número e símbolo
        </Text>
      </View>

      <ActionButton 
        label={loading ? "Cadastrando..." : "Confirmar"}
        onPress={handleSignUp}
        color={colors.page.auburn}
        //disabled={loading}
      />

      <TouchableOpacity 
        onPress={() => router.push("./signIn")}
        disabled={loading}
      >
        <Text style={[styles.linkText, loading && { opacity: 0.5 }]}>
          Já tem uma conta? Entrar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}