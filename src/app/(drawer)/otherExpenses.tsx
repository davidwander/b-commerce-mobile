import { View, Text } from "react-native";
import { colors } from '@/styles/colors';


export default function OtherExpenses() {
  return (
    <View style={{ 
      flex: 1, 
      alignItems: "center", 
      justifyContent: "center",
      backgroundColor: colors.page.dragonFruit
      }}
    >
      <Text>Outros gastos</Text>
    </View>
  )
}