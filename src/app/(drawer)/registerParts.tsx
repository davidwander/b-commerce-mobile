import { View, Text } from "react-native";
import { colors } from '@/styles/colors';

import { Header } from '@/components/Header';

export default function RegisterParts() {
  return (
    <View style={{ 
      flex: 1, 
      paddingTop: 30,
      backgroundColor: colors.page.lavender 
    }}>
      <Header />

      <View style={{ 
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center" 
      }}>
        <Text>Registrar peças</Text>
      </View>
    </View>
  );
}
