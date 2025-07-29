import { createTamagui } from 'tamagui';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { createAnimations } from '@tamagui/animations-react-native'

const animations = createAnimations({
  // Defina suas animações aqui
  // Exemplo:
  // quick: {
  //   type: 'spring',
  //   damping: 20,
  //   mass: 1,
  //   stiffness: 100,
  // },
  // medium: {
  //   type: 'spring',
  //   damping: 15,
  //   mass: 1,
  //   stiffness: 120,
  // },
  // slow: {
  //   type: 'spring',
  //   damping: 10,
  //   mass: 2,
  //   stiffness: 130,
  // },
})

const appConfig = createTamagui({
  animations,
  defaultTheme: 'light',
  shorthands,
  themes,
  tokens
});

export type AppConfig = typeof appConfig;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;