import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Image, Linking, Platform, Dimensions, Alert } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { red } from 'react-native-reanimated/lib/typescript/Colors'

interface FilaInfo {
  upaName: string
  position: number
  aheadCount: number
  totalInQueue: number
  avgWaitTime: number
  address: string
  latitude: number
  longitude: number
}

const mockFila: Record<string, FilaInfo> = {
  '1': {
    upaName: 'UPA Esperança',
    position: 9,
    aheadCount: 8,
    totalInQueue: 16,
    avgWaitTime: 40,
    address: 'Av. Paraíba, s/n - Cidade da Esperança, Natal - RN',
    latitude: -5.855,
    longitude: -35.216,
  },
  '2': {
    upaName: 'UPA Centro',
    position: 3,
    aheadCount: 2,
    totalInQueue: 8,
    avgWaitTime: 25,
    address: 'Rua Principal, 100 - Centro, Natal - RN',
    latitude: -5.795,
    longitude: -35.209,
  },
  '3': {
    upaName: 'UPA Norte',
    position: 5,
    aheadCount: 4,
    totalInQueue: 12,
    avgWaitTime: 30,
    address: 'Av. das Flores, 200 - Nossa Sra. da Apresentação, Natal - RN',
    latitude: -5.790,
    longitude: -35.221,
  },
  '4': {
    upaName: 'UPA Sul',
    position: 1,
    aheadCount: 0,
    totalInQueue: 5,
    avgWaitTime: 20,
    address: 'Rua das Acácias, 50 - Ponta Negra, Natal - RN',
    latitude: -5.806,
    longitude: -35.205,
  },
  '5': {
    upaName: 'UPA Oeste',
    position: 7,
    aheadCount: 6,
    totalInQueue: 14,
    avgWaitTime: 35,
    address: 'Av. João XXIII, s/n - Felipe Camarão, Natal - RN',
    latitude: -5.808,
    longitude: -35.227,
  },
  '6': {
    upaName: 'UPA Leste',
    position: 2,
    aheadCount: 1,
    totalInQueue: 3,
    avgWaitTime: 15,
    address: 'Av. Prudente de Morais, 75 - Tirol, Natal - RN',
    latitude: -5.795,
    longitude: -35.205,
  }
}

const { width: screenWidth } = Dimensions.get('window')

export default function FilaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [fila, setFila] = useState<FilaInfo | null>(null)

  useEffect(() => {
    setFila(mockFila[id] ?? null)
  }, [id])

  if (!fila) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.bodyCenter}>
          <View style={styles.photoDiv}>
            <Image
            source={require('@/assets/images/ops.png')}
            style={styles.opsImage}
            />
            <Text style={styles.opsTitle}>Ops!</Text>
          </View>
          <Text style={styles.opsSubtitle}>
            você não se encontra cadastrado em nenhuma fila.
          </Text>
          <Text style={styles.opsFooter}>
            volte ao menu principal, preencha seus dados e entre na fila.
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  function openMaps() {
    const query = `${fila.latitude},${fila.longitude}`
    const url = Platform.select({
      ios: `maps:0,0?q=${query}`,
      android: `geo:0,0?q=${query}`,
    })!
    Linking.openURL(url)
  }

  function confirmExit() {
    Alert.alert(
      'Deseja sair?',
      'Ao sair, você perderá sua posição na fila.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            setFila(null)
          },
        },
      ],
      { cancelable: false }
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{fila.upaName}</Text>
      </View>

      <View style={styles.mainCard}>
        <Text style={styles.mainLabel}>posição atual:</Text>
        <Text style={styles.mainPosition}>
          {fila.position}º da fila
        </Text>
        <Text style={styles.mainAhead}>
          {fila.aheadCount} pessoas aguardam antes de você.
        </Text>
      </View>

      <View style={styles.gridRow}>
        <View style={[styles.subCard, { marginRight: 8 }]}>
          <Image
            source={require('@/assets/images/icon-people.png')}
            style={styles.icon}
          />
          <Text style={styles.subValue}>
            {fila.totalInQueue}
          </Text>
          <Text style={styles.subLabel}>
            pessoas em fila
          </Text>
        </View>
        <View style={[styles.subCard, { marginLeft: 8 }]}>
          <Image
            source={require('@/assets/images/icon-clock.png')}
            style={styles.icon}
          />
          <Text style={styles.subValue}>
            {fila.avgWaitTime}min
          </Text>
          <Text style={styles.subLabel}>
            tempo de espera
          </Text>
        </View>
      </View>

      <View style={styles.routeCard}>
        <Image
          source={require('@/assets/images/icon-map.png')}
          style={styles.iconMap}
        />
        <View style={styles.adressContainer}>
          <Text style={styles.routeAddress}>
            {fila.address}
          </Text>
          <TouchableOpacity
            style={styles.routeButton}
            onPress={openMaps}
          >
            <Text style={styles.routeButtonText}>
              Ir para rotas
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footerNote}>
        Atendimento por ordem de chegada e prioridade. Fila
        convencional e preferencial.
      </Text>

      <TouchableOpacity
        style={styles.exitButton}
        onPress={confirmExit}
      >
        <Text style={styles.exitText}>Sair da fila</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#3A9D50' },
  headerContainer: {
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 16,
  },
  headerText: { fontSize: 20, textAlign: 'center', color: '#333', fontWeight: 'bold', },
  mainCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    padding: 22,
    alignItems: 'center',
  },
  mainLabel: { fontSize: 16, color: '#282828' },
  mainPosition: {
    fontSize: 40,
    fontWeight: 'regular',
    color: '#282828',
    marginVertical: 8,
  },
  mainAhead: { fontSize: 16, color: '#282828' },
  gridRow: { flexDirection: 'row', marginHorizontal: 16, marginTop: 8 },
  subCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  icon: {
    width: 51,
    height: 51,
    marginBottom: 8,
    tintColor: '#16722A',
  },
  subValue: {
    fontSize: 40,
    fontWeight: 'regular',
    color: '#333',
  },
  subLabel: { fontSize: 16, color: '#282828', marginTop: 12 },
  routeCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  iconMap: {
    width: 58,
    height: 58,
    tintColor: '#16722A',
    // marginBottom: 8,
    // marginRight: 16,
    margin: 16,
  },
  routeAddress: {
    fontSize: 12,
    color: '#282828',
    textAlign: 'center',
    marginBottom: 12,
  },
  routeButton: {
    backgroundColor: '#16722A',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 40,
    
  },
  routeButtonText: { color: '#fff', fontSize: 16, textAlign: 'center', },
  footerNote: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 16,
    // marginTop: 8,
    maxWidth:350,
  },
  exitButton: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  exitText: { color: '#d00', fontSize: 16 },
    opsImage: {
    width: 120,
    height: 120,
    margin: 8,
    resizeMode: 'contain',
  },
  bodyCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  photoDiv: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  opsTitle: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.20,
    shadowRadius: 4,
    elevation: 5,  
  },
  opsSubtitle: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.40,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
    maxWidth: 315,
  },
  opsFooter: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.40,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
    maxWidth: 315,
  },
  adressContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  }
})