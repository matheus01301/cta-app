import { useRouter } from 'expo-router'
import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function HomeScreen() {
  const router = useRouter()
  
  function handleEntrar() {
    router.push('/(tabs)/home')
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
      <Text style={styles.welcomeText}>Bem vindo ao monitor de UPA'S</Text>
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
    marginBottom: '40%',
    
  },
  message: {
    fontSize: 16,
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 22,
    
  },
  button: {
    width: '85%',
    backgroundColor: '#16722A',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  welcomeText: {
    color: '#5DB075',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 22,
  },
})
