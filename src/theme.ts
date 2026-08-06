import { DarkTheme } from '@react-navigation/native';

export const COLORS = {
  background: '#0f1113',
  surface: '#191d20',
  surfaceAlt: '#23282c',
  accent: '#9b3311',
  text: '#f5f5f5',
  muted: '#aab0b5',
  border: '#343a3f',
};

export const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: COLORS.accent,
    background: COLORS.background,
    card: COLORS.surface,
    text: COLORS.text,
    border: COLORS.border,
    notification: COLORS.accent,
  },
};