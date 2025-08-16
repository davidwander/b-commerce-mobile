import { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { requestNotificationPermissions, scheduleNotification } from '@/utils/notifications';
import { styles } from './styles';

import { Header } from '@/components/Header';

import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type NotificationItem = {
  id: string;
  type: 'notification' | 'reminder';
  title: string;
  description: string;
  date: string;
};

const MOCK_DATA: NotificationItem[] = [
  {
    id: '1',
    type: 'reminder',
    title: 'Entrega de peças',
    description: 'Lembre-se: entrega marcada para amanhã às 14h.',
    date: '2025-08-14T14:00:00',
  },
  {
    id: '2',
    type: 'notification',
    title: 'Venda confirmada',
    description: 'Venda #324 foi confirmada com sucesso.',
    date: '2025-08-13T10:30:00',
  },
];

export default function Notifications() {
  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <View style={[
      styles.card,
      item.type === 'reminder' ? styles.reminder : styles.notification
    ]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.date}>
        {new Date(item.date).toLocaleString('pt-BR', {
          dateStyle: 'short',
          timeStyle: 'short'
        })}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.containerContent}>
        {/* Botão de teste de notificação */}
        <TouchableOpacity
          style={styles.testButton}
          onPress={() => scheduleNotification(
            'Teste de Notificação',
            'Essa é uma notificação de teste.',
            5 
          )}
        >
          <Text style={styles.testButtonText}>
            📢 Testar Notificação
          </Text>
        </TouchableOpacity>

        <FlatList
          data={MOCK_DATA}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 16 }}
        />

        {/* Botão flutuante para calendário */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push('/calendar')}
        >
          <Ionicons name="calendar" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

