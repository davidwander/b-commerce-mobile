import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './_styles';
import { Header } from '@/components/Header';
import { colors } from '@/styles/colors';
import { useRouter } from 'expo-router';

const settingsOptions = [
  {
    id: '1',
    title: 'Trocar E-mail',
    category: 'Conta',
    icon: 'mail-outline',
    targetScreen: '/auth/changeEmail',
  },
  {
    id: '2',
    title: 'Trocar Senha',
    category: 'Conta',
    icon: 'lock-closed-outline',
    targetScreen: '/auth/changePassword',
  },
  {
    id: '3',
    title: 'Nova Senha',
    category: 'Segurança',
    icon: 'key-outline',
    targetScreen: '/auth/signUp',
  },
];

export default function Settings() {
  const router = useRouter();

  const handleOptionPress = (targetScreen?: string) => {
    if (targetScreen) {
      router.push(targetScreen as any); // navega para a tela correspondente
    }
  };

  // Agrupa opções por categoria
  const groupedOptions = settingsOptions.reduce<Record<string, typeof settingsOptions>>(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.optionsWrapper}>
        {Object.entries(groupedOptions).map(([category, options]) => (
          <View key={category} style={styles.categoryWrapper}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {options.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.optionContainer}
                activeOpacity={0.6}
                onPress={() => handleOptionPress(item.targetScreen)}
              >
                <View style={styles.optionRow}>
                  <Ionicons name={item.icon as any} size={22} color={colors.black} />
                  <Text style={styles.optionText}>{item.title}</Text>
                  <Ionicons name="chevron-forward-outline" size={20} color={colors.black} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
