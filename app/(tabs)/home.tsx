// app/home/home.tsx
import { useRouter } from 'expo-router'
import React from 'react'
import { SafeAreaView, StyleSheet, View, } from 'react-native'

export default function HomeScreen() {
  const router = useRouter()

  function handleEntrar() {
    router.push('/')
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Body */}
      <View style={styles.body}>
        {/* <TouchableOpacity style={styles.button} onPress={handleEntrar}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity> */}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {/* outros elementos do footer, se necessário */}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    backgroundColor: '#3A9D50',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  bodyText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
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
  footer: {
    // estilos do footer se necessário
    height: 0,
  },
})
