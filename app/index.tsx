import React from 'react'
import { SafeAreaView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

export default function HomeScreen() {
  const router = useRouter()
  
  function handleEntrar() {
    router.push('/home/home')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.message}>
        Porque sua saúde não pode esperar.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleEntrar}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  message: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    width: '80%',
    backgroundColor: '#5DB075',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
