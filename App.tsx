import { TamaguiProvider, YStack, Text } from 'tamagui';
import config from './tamagui.config';
import {
  useFonts,
  Inter_400Regular,
  Inter_400Regular_Italic,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

export default function App() {
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_400Regular_Italic,
    Inter_700Bold,
  });

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background">
        <Text
          fontSize="$4"
          color="$color"
          fontStyle="italic"
          fontWeight="700"
          fontFamily="$heading"
        >
          Bem-vindo ao meu APP com Tamagui!
        </Text>
      </YStack>
    </TamaguiProvider>
  );
}
