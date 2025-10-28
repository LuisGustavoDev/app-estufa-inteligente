import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import api from '../api'; // conexão com o backend

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 🔍 Testa conexão com a API ao carregar a tela
  useEffect(() => {
    api.get('/')
      .then(res => {
        console.log('✅ Conectado à API:', res.data.message);
      })
      .catch(err => {
        console.error('❌ Erro ao conectar à API:', err.message);
        Alert.alert('Erro', 'Não foi possível conectar à API. Verifique se o servidor Node está rodando.');
      });
  }, []);

  // 🧩 Função para registrar usuário
  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos antes de continuar.');
      return;
    }

    try {
      const response = await api.post('/users', { name, email, password });
      console.log('✅ Usuário cadastrado com sucesso:', response.data);

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('❌ Erro ao cadastrar usuário:', error.response?.data || error.message);
      const msg = error.response?.data?.message || 'Erro ao cadastrar usuário. Tente novamente.';
      Alert.alert('Erro', msg);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image 
        source={require('../../assets/logoVerde.png')} 
        style={styles.logo}       
        resizeMode="contain"
      />

      <Text style={styles.title}>Registrar</Text>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Botão cadastrar */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Voltar para login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#D9D9D9' 
  },
  logo: {
    width: 80,
    height: 80,
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    marginTop: 120 
  },
  input: { 
    width: '100%', 
    borderWidth: 1, 
    borderColor: '#2E3732',
    borderRadius: 30, 
    padding: 10, 
    marginBottom: 15, 
    backgroundColor: '#fff' 
  },
  button: { 
    width: '100%', 
    backgroundColor: '#F4F4F4', 
    padding: 15, 
    borderRadius: 30, 
    alignItems: 'center', 
    marginBottom: 10 
  },
  buttonText: { 
    color: '#000000ff', 
    fontWeight: 'bold' 
  },
  linkText: { 
    color: '#000000ff', 
    marginTop: 10, 
    textDecorationLine: 'none' 
  },
});
