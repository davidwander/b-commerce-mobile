import { View, Text } from "react-native";
import { colors } from '@/styles/colors';


export default function Notifications() {
  return (
    <View style={{ 
      flex: 1, 
      alignItems: "center", 
      justifyContent: "center",
      backgroundColor: colors.page.tulips 
      }}
    >
      <Text>Notificações</Text>
    </View>
  )
}