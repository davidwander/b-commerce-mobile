import { View, Text } from 'react-native';

import { ActionButton } from '@/components/ActionButton';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';

import { router } from "expo-router";

export default function Calendar() {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 30,
        backgroundColor: colors.page.tulips,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text style={{ fontSize: 18, fontFamily: fonts.italic }}>Calendário aqui</Text>

        <ActionButton 
          label='Voltar'
          onPress={() => router.back()}
          color={colors.page.dragonFruit}
          style={{ marginTop: 14}}
        />
      </View>
    </View>
  );
}