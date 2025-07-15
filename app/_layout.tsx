import React, { useEffect } from 'react'
import { Platform } from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar'
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter' // ✅ Fonte Inter
import 'react-native-reanimated'

export default function RootLayout() {
  const colorScheme = useColorScheme()

  // ✅ Carrega a fonte Inter
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  })

  // Oculta barra de navegação no Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden')
    }
  }, [])

  // Enquanto a fonte não carrega, retorna null (ou um loader, se quiser)
  if (!fontsLoaded) return null

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="pages/cadastro" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="upa/[id]" options={{ headerShown: false }} />
      </Stack>
      <ExpoStatusBar hidden />
    </ThemeProvider>
  )
}
