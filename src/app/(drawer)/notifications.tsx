import { View, Text } from "react-native";
import { colors } from '@/styles/colors';


export default function Notifications() {
  return (
    <View style={{ 
      flex: 1, 
      alignItems: "center", 
      justifyContent: "center",
      backgroundColor: "#fff" 
      }}
    >
      <Text>Notificações</Text>
    </View>
  )
}