import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Modal } from 'react-native';
import { colors } from '@/styles/colors';

type LoadingProps = {
  visible: boolean;
  message?: string;
};

export default function Loading({ visible, message = "Carregando..." }: LoadingProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color={colors.page.yellow} />
          {message && <Text style={styles.text}>{message}</Text>}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: colors.black,
  },
});
