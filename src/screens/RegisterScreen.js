import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    console.log('Nome:', name, 'Email:', email, 'Senha:', password);
    // Aqui você chamaria sua API de registro
  };

  return (
    <View style={styles.container}>
      {/* Logo no topo */}
      <Image 
        source={require('../../assets/logoVerde.png')} 
        style={styles.logo}       
        resizeMode="contain"
      />

      <Text style={styles.title}>Registrar</Text>

      {/* Campos de entrada */}
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
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Botão de registrar */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Link para voltar ao login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex:1, 
    justifyContent:'center', 
    alignItems:'center', 
    padding:20, 
    backgroundColor:'#D9D9D9' 
  },
  logo: {
    width: 80,
    height: 80,
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
  },
  title: { 
    fontSize:28, 
    fontWeight:'bold', 
    marginBottom:20, 
    marginTop:120 
  },
  input: { 
    width:'100%', 
    borderWidth:1, 
    borderColor:'#2E3732',
    borderRadius:30, 
    padding:10, 
    marginBottom:15, 
    backgroundColor:'#fff' 
  },
  button: { 
    width:'100%', 
    backgroundColor:'#F4F4F4', 
    padding:15, 
    borderRadius:30, 
    alignItems:'center', 
    marginBottom:10 
  },
  buttonText: { 
    color:'#000000ff', 
    fontWeight:'bold' 
  },
  linkText: { 
    color:'#000000ff', 
    marginTop:10, 
    textDecorationLine:'none' 
  },
});
