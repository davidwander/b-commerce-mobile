import { createTamagui } from 'tamagui';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { createAnimations } from '@tamagui/animations-react-native';
import { createInterFont } from '@tamagui/font-inter';
import { createFont } from 'tamagui';

const interFont = createFont({
  family: 'Inter',
  size: {
    1: 10,
    2: 12,
    3: 14,
    4: 16,
    5: 18,
    6: 20,
    7: 24,
    8: 28,
    9: 32,
    10: 36,
    11: 40,
    12: 48,
    13: 56,
    14: 64,
    15: 72,
    16: 80,
  },
  lineHeight: {
    1: 12,
    2: 14,
    3: 16,
    4: 20,
    5: 22,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 52,
    13: 60,
    14: 68,
    15: 76,
    16: 84,
  },
  weight: {
    1: '400',
    2: '700',
  },
  letterSpacing: {
    1: 0,
    2: -1,
  },
  face: {
    400: { normal: 'Inter_400Regular', italic: 'Inter_400Regular_Italic' },
    700: { normal: 'Inter_700Bold' },
  },
});

const animations = createAnimations({
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1,
    stiffness: 100,
  },
  medium: {
    type: 'spring',
    damping: 15,
    mass: 1,
    stiffness: 120,
  },
  slow: {
    type: 'spring',
    damping: 10,
    mass: 2,
    stiffness: 130,
  },
});

const appConfig = createTamagui({
  animations,
  defaultTheme: 'light',
  shorthands,
  themes,
  tokens,
  fonts: {
    heading: interFont,
    body: interFont,
  },
});

export type AppConfig = typeof appConfig;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
