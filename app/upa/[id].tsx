// app/upa/[id].tsx
import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'

interface UPA {
  id: string
  name: string
}

const mockUPAs: UPA[] = [
  { id: '1', name: 'UPA Esperança' },
  { id: '2', name: 'UPA Centro' },
  { id: '3', name: 'UPA Norte' },
  { id: '4', name: 'UPA Sul' },
  { id: '5', name: 'UPA Oeste' },
  { id: '6', name: 'UPA Leste' },
]

export default function UPACadastro() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const upa = mockUPAs.find(u => u.id === id)

  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [rg, setRg] = useState('')
  const [sintomas, setSintomas] = useState('')

  function handleSubmit() {
    console.log({ upa: upa?.name, nome, cpf, rg, sintomas })
    Alert.alert(
      'Confirmação',
      'Cadastro em fila realizado.',
      [
        {
          text: 'Ok',
          onPress: () => router.push('/(tabs)/fila')
        },
      ],
      { cancelable: false }
    )
  }

  function handleCancel() {
    router.back()
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{upa?.name} – Cadastro</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            value={nome}
            onChangeText={setNome}
            placeholder="Lorena Celani"
            style={styles.input}
          />

          <Text style={styles.label}>CPF</Text>
          <TextInput
            value={cpf}
            onChangeText={setCpf}
            placeholder="000.000.000-00"
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.label}>RG</Text>
          <TextInput
            value={rg}
            onChangeText={setRg}
            placeholder="102920492"
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.label}>Sintomas</Text>
          <TextInput
            value={sintomas}
            onChangeText={setSintomas}
            placeholder="Febre, coriza, tosse..."
            multiline
            style={[styles.input, styles.textArea]}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Enviar dados</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#3A9D50' },
  scroll: { padding: 16 },
  header: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  headerText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  formCard: { backgroundColor: '#fff', borderRadius: 8, padding: 16 },
  label: { fontSize: 14, color: '#333', marginTop: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    color: '#333',
  },
  textArea: { height: 80, textAlignVertical: 'top' },
  submitButton: {
    backgroundColor: '#5DB075',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  submitText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  cancelButton: {
    borderColor: '#5DB075',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelText: { color: '#5DB075', fontSize: 14, fontWeight: 'bold' },
})

// Não esqueça de criar a tela de fila em app/(tabs)/fila.tsx para que a navegação funcione corretamente.
