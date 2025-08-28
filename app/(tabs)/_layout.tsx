import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { NavBar } from '@/components/ui/NavBar';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        header: () => <NavBar title={route.name} />, // Add NavBar to each tab
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            zIndex: 10,
            borderRadius: 10,
            overflow: 'hidden',
            position: 'absolute',
            margin: 15,
            height: 50,
            bottom: 50, 
          },
          default: {
            zIndex: 10,
            borderRadius: 10,
            overflow: 'hidden',
            position: 'absolute',
            height: 30,
            bottom: 50,
            marginLeft: 80,
            marginRight: 80,
            alignItems: 'center',
          },
        }),
      })}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol  size={20} name="house.fill" color={color} />,
        }}
      />
       <Tabs.Screen
        name="category"
        options={{
          title: 'Category',
          tabBarIcon: ({ color }) => <IconSymbol  size={20} name="grid.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={20} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
