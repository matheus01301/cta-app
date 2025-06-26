// app/upa/[id].tsx
import React from 'react'
import { StyleSheet, Button, Alert, Linking, Platform } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
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

export default function UPADetail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const upa = mockUPAs.find((u: UPA) => u.id === id)

  if (!upa) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>UPA não encontrada</ThemedText>
      </ThemedView>
    )
  }

  function openMap() {
    const query = encodeURIComponent(upa.name)
    let url: string

    if (Platform.OS === 'android') {
      // abre diretamente o Google Maps em modo navegação
      url = `google.navigation:q=${query}`
    } else {
      // esquema para Apple Maps
      url = `maps://?q=${query}`
    }

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url)
        }
        // fallback web
        const browserUrl = `https://www.google.com/maps/search/?api=1&query=${query}`
        return Linking.openURL(browserUrl)
      })
      .catch(err =>
        Alert.alert('Não foi possível abrir o mapa', err.message)
      )
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{upa.name}</ThemedText>
      <ThemedText>Fila: {upa.queueLength}</ThemedText>
      <ThemedText>Médicos: {upa.doctorsOnDuty}</ThemedText>
      <ThemedText>Espera: {upa.avgWaitTime} min</ThemedText>
      <Button title="Abrir no mapa" onPress={openMap} />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
})
