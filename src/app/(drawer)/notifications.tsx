import { useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Header } from '@/components/Header';
import { fonts } from '@/styles/fonts';
import { colors } from '@/styles/colors';
import { 
  requestNotificationPermissions, 
  scheduleNotification 
} from '@/utils/notifications';

import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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
    <View style={{
      flex: 1,
      paddingTop: 30,
      backgroundColor: colors.page.tulips
    }}>
      <Header />

      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        
        {/* Botão de teste de notificação */}
        <TouchableOpacity
          style={styles.testButton}
          onPress={() => scheduleNotification(
            'Teste de Notificação',
            'Essa é uma notificação de teste.',
            5 // segundos
          )}
        >
          <Text style={styles.testButtonText}>📢 Testar Notificação</Text>
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

const styles = StyleSheet.create({
  testButton: {
    backgroundColor: colors.page.meadow || '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 18,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  testButtonText: {
    color: colors.white || '#fff',
    fontFamily: fonts.bold || 'bold',
    fontSize: 18,
  },
  card: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  reminder: {
    backgroundColor: colors.page.lavender || '#FFF3CD',
  },
  notification: {
    backgroundColor: colors.page.meadow || '#CCE5FF',
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.bold || 'bold',
  },
  description: {
    fontSize: 16,
    fontFamily: fonts.italic || 'normal',
    marginTop: 4,
  },
  date: {
    fontSize: 16,
    fontFamily: fonts.regular || 'normal',
    marginTop: 9,
    color: colors.black || '#6c757d',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.page.meadow || '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
