import { View, Text } from "react-native";
import { colors } from '@/styles/colors';

export default function Dashboard() {
  return (
    <View style={{ 
      flex: 1, 
      alignItems: "center", 
      justifyContent: "center",
      backgroundColor: colors.white
      }}
    >
      <Text>Dashboard</Text>
    </View>
  )
}