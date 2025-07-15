import { createFont, createTamagui, createTokens, isWeb } from 'tamagui';

const systemFont = createFont({
  family: isWeb ? 'Helvetica, Arial, sans-serif' : 'System',
  size: {
    1: 12,
    2: 14,
    3: 15,
  },
  lineHeight: {
    2: 22,
  },
  weight: {
    1: '300',
    3: '600',
  },
  letterSpacing: {
    1: 0,
    2: -1,
  },
});

// Set up tokens
const size = {
  0: 0,
  1: 5,
  2: 10,
  true: 10, // Define o tamanho padrão
  3: 15,
  4: 20,
  5: 25,
  6: 30,
  7: 35,
  8: 40,
  9: 45,
  10: 50,
};

export const tokens = createTokens({
  size,
  space: { ...size, '-1': -5, '-2': -10 },
  radius: { 0: 0, 1: 3 },
  zIndex: { 0: 0, 1: 100, 2: 200 },
  color: {
    white: '#fff',
    black: '#000',
  },
});

// Definindo o tipo de config
const config = createTamagui({
  fonts: {
    heading: systemFont,
    body: systemFont,
  },
  tokens,
  themes: {
    light: {
      bg: '#f2f2f2',
      color: tokens.color.black,
    },
    dark: {
      bg: '#111',
      color: tokens.color.white,
    },
  },
  media: {
    sm: { maxWidth: 860 },
    gtSm: { minWidth: 860 + 1 },
    short: { maxHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  },
  shorthands: {
    px: 'paddingHorizontal',
    f: 'flex',
    m: 'margin',
    w: 'width',
  } as const,
});

// Definindo o tipo de AppConfig
type AppConfig = typeof config;

// Declaração do módulo para Tamagui
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
  interface TypeOverride {
    groupNames(): 'card';
  }
}

export default config;