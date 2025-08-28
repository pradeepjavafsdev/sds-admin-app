import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

const globalFontSize = 12; // Decreased global font size to 8

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color, fontSize: globalFontSize },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    lineHeight: 24,
  },
  defaultSemiBold: {
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    color: '#0a7ea4',
  },
});
