import React, { useState } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

interface UPA {
  id: string
  name: string
  address: string
  queueLength: number
  avgWaitTime: number
}

const upas: UPA[] = [
  {
    id: '1',
    name: 'UPA Esperança',
    address: 'Av. Paraíba, s/n - Cidade da Esperança, Natal - RN',
    queueLength: 16,
    avgWaitTime: 40,
  },
  {
    id: '2',
    name: 'UPA Centro',
    address: 'Rua Principal, 100 - Centro, Natal - RN',
    queueLength: 8,
    avgWaitTime: 25,
  },
  {
    id: '3',
    name: 'UPA Norte',
    address: 'Av. das Flores, 200 - Nossa Sra. da Apresentação, Natal - RN',
    queueLength: 12,
    avgWaitTime: 30,
  },
  {
    id: '4',
    name: 'UPA Sul',
    address: 'Rua das Acácias, 50 - Ponta Negra, Natal - RN',
    queueLength: 5,
    avgWaitTime: 20,
  },
]

export default function HomeScreen() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  function handleCardPress(id: string) {
    router.push(`/upa/${id}`)
  }

  const filtered = upas.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.address.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Procurar por Upa/Cidade..."
          placeholderTextColor='rgba(17, 231, 53, 0.3)'
          style={styles.searchInput}
        />
        <Ionicons name="search" size={24} color="#3A9D50" style={styles.searchIcon} />
      </View>

      <ScrollView
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map(upa => (
          <View key={upa.id} style={styles.card}>
            <Text style={styles.cardTitle}>{upa.name}</Text>
            <Text style={styles.cardAddress}>{upa.address}</Text>
            <Text style={styles.cardQueueNumber}>{upa.queueLength}</Text>
            <Text style={styles.cardQueueLabel}>pessoas na fila</Text>
            <Text style={styles.cardWaitTime}>
              tempo de espera estimado: {upa.avgWaitTime} minutos
            </Text>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => handleCardPress(upa.id)}
            >
              <Text style={styles.cardButtonText}>entrar em fila</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A9D50',
    padding: 48,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    marginTop: 32,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  searchIcon: {
    marginLeft: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardAddress: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  cardQueueNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardQueueLabel: {
    fontSize: 12,
    color: '#333',
    marginBottom: 8,
  },
  cardWaitTime: {
    fontSize: 10,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardButton: {
    backgroundColor: '#5DB075',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 14,
    textTransform: 'uppercase',
  },
})
