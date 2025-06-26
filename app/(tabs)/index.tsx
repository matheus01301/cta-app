// app/(tabs)/index.tsx
import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

interface UPA {
  id: string
  name: string
  queueLength: number
  doctorsOnDuty: number
  avgWaitTime: number
}

const mockUPAs: UPA[] = [
  { id: '1', name: 'UPA Centro', queueLength: 5, doctorsOnDuty: 2, avgWaitTime: 30 },
  { id: '2', name: 'UPA Norte', queueLength: 10, doctorsOnDuty: 1, avgWaitTime: 45 },
  { id: '3', name: 'UPA Sul', queueLength: 2, doctorsOnDuty: 3, avgWaitTime: 15 },
]

export default function HomeScreen() {
  const [upas, setUpas] = useState<UPA[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setUpas(mockUPAs)
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const renderItem = ({ item }: { item: UPA }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/upa/${item.id}`)}
    >
      <ThemedText type="subtitle">{item.name}</ThemedText>
      <ThemedText>Fila: {item.queueLength}</ThemedText>
      <ThemedText>Médicos: {item.doctorsOnDuty}</ThemedText>
      <ThemedText>Espera: {item.avgWaitTime} min</ThemedText>
    </TouchableOpacity>
  )

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/download.jpg')}
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Monitor de UPAs+</ThemedText>
        {loading
          ? <ActivityIndicator size="large" style={{ marginTop: 16 }} />
          : (
            <FlatList
              data={upas}
              keyExtractor={i => i.id}
              renderItem={renderItem}
              contentContainerStyle={styles.list}
            />
          )}
      </ThemedView>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  list: { paddingBottom: 32 },
  card: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
})
