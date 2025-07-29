import { TamaguiProvider } from 'tamagui';
import config from './tamagui.config';
import { YStack, Text } from 'tamagui';

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <YStack
        flex={1}
        justifyContent='center'
        alignItems='center'
        backgroundColor="$background"
      >
        <Text
          fontSize="$4"
          color="$color"
        >
          Bem-vindo ao meu APP com Tamagui!
        </Text>
      </YStack>
    </TamaguiProvider>
    
  );
}

