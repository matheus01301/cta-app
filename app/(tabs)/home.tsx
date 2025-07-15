import React, { useState } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const { width: screenWidth } = Dimensions.get('window')

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
  {
    id: '5',
    name: 'UPA Oeste',
    address: 'Av. João XXIII, s/n - Felipe Camarão, Natal - RN',
    queueLength: 20,
    avgWaitTime: 50,
  },
  {
    id: '6',
    name: 'UPA Leste',
    address: 'Av. Prudente de Morais, 75 - Tirol, Natal - RN',
    queueLength: 3,
    avgWaitTime: 10,
  },
]

export default function HomeScreen() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const filtered = upas.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.address.toLowerCase().includes(search.toLowerCase())
  )

  function handleCardPress(id: string) {
    router.push(`/upa/${id}`)
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ View interna com padding horizontal */}
      <View style={styles.innerContainer}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#3A9D50" style={styles.searchIcon} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Procurar por UPA/Cidade..."
            placeholderTextColor="#aaa"
            style={styles.searchInput}
          />
        </View>

        {/* Grid de cards */}
        <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
          {filtered.map(upa => (
            <TouchableOpacity
              key={upa.id}
              style={styles.card}
              onPress={() => handleCardPress(upa.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.cardTitle}>{upa.name}</Text>
              <Text style={styles.cardAddress}>{upa.address}</Text>
              <Text style={styles.cardQueueNumber}>{upa.queueLength}</Text>
              <Text style={styles.cardQueueLabel}>pessoas na fila</Text>
              <Text style={styles.cardWaitTime}>
                tempo de espera estimado: {upa.avgWaitTime} min
              </Text>
              <View style={styles.cardButtonContainer}>
                <Text style={styles.cardButtonText}>entrar em fila</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A9D50',
    // ❌ Removido: paddingHorizontal: 16,
    // paddingTop: 16, // movido para innerContainer
  },
  // ✅ Nova View interna
  innerContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 16,
    width: '100%',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  card: {
    width: (screenWidth - 16 * 2 - 16) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'column',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardQueueNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardQueueLabel: {
    fontSize: 12,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardWaitTime: {
    fontSize: 10,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardButtonContainer: {
    backgroundColor: '#5DB075',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
})
