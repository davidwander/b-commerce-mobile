import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar as RNCalendar, DateData } from 'react-native-calendars';
import { ActionButton } from '@/components/ActionButton';

import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';
import { router } from "expo-router";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const markedDates = {
    "2025-08-14": { marked: true, dotColor: colors.page.meadow },
    "2025-08-20": { marked: true, dotColor: colors.page.dragonFruit },
    ...(selectedDate && {
      [selectedDate]: {
        selected: true,
        selectedColor: colors.page.meadow,
        selectedTextColor: colors.white,
      },
    }),
  };

  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  // Função para corrigir o problema de fuso horário
  const getLocalDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("pt-BR");
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarWrapper}>
        <RNCalendar
          onDayPress={onDayPress}
          markedDates={markedDates}
          theme={{
            calendarBackground: colors.page.tulips,
            todayTextColor: colors.page.meadow,
            arrowColor: colors.page.meadow,
            monthTextColor: colors.black,
            textMonthFontFamily: fonts.italic,
            textDayFontFamily: fonts.bold,
            textDayHeaderFontFamily: fonts.regular,
          }}
        />

        {selectedDate ? (
          <View style={styles.details}>
            <Text style={styles.dateText}>
              📅 {getLocalDate(selectedDate)}
            </Text>
            <Text style={styles.eventText}>
              Nenhum compromisso cadastrado para esta data.
            </Text>
          </View>
        ) : (
          <Text style={styles.info}>Selecione uma data no calendário.</Text>
        )}
      </View>

      <ActionButton 
        label='Voltar'
        onPress={() => router.back()}
        color={colors.page.dragonFruit}
        style={{ marginTop: 14 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: colors.page.tulips,
    alignItems: "center",
  },
  calendarWrapper: {
    width: "100%",
    backgroundColor: colors.page.tulips,
    padding: 4,
  },
  details: {
    marginTop: 16,
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    elevation: 5,
  },
  dateText: {
    fontSize: 16,
    fontFamily: fonts.bold,
    marginBottom: 6,
  },
  eventText: {
    fontSize: 16,
    fontFamily: fonts.italic,
    color: "#555",
  },
  info: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 16,
    fontFamily: fonts.italic,
    color: colors.white,
  },
});
