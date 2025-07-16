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
           onPress: () =>
   router.push({
     pathname: '/(tabs)/fila',
     params: { id },
   })
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
            placeholder="Nome"
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
            style={styles.input}
          />

          <Text style={styles.label}>CPF</Text>
          <TextInput
            value={cpf}
            onChangeText={setCpf}
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
            placeholder="000.000.000-00"
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.label}>RG</Text>
          <TextInput
            value={rg}
            onChangeText={setRg}
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
            placeholder="102920492"
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.label}>Sintomas</Text>
          <TextInput
            value={sintomas}
            onChangeText={setSintomas}
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.50,
    shadowRadius: 4,
    elevation: 6,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginTop: 12,
    marginBottom: 4,
  },
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
    backgroundColor: '#16722A',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  submitText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  cancelButton: {
    borderColor: '#16722A',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelText: { color: '#16722A', fontSize: 14, fontWeight: 'bold' },
})