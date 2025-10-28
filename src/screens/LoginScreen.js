import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated, Easing } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;       // Opacidade
  const translateYAnim = useRef(new Animated.Value(30)).current; // Posição inicial abaixo

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0, // sobe para a posição normal
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleLogin = () => console.log('Email:', email, 'Senha:', password);
  const handleForgotPassword = () => console.log('Esqueceu a senha?');
  const handleRegister = () => navigation.navigate('Register');

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/logoVerde.png')} 
        style={styles.logo}       
        resizeMode="contain"
      />

      <View style={styles.content}>
        <Text style={styles.title}>Sign in</Text>

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

        <Animated.View style={{ 
          opacity: fadeAnim, 
          transform: [{ translateY: translateYAnim }] 
        }}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.textLinksContainer}>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.textLink}>Registrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.textLink}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#D9D9D9', 
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center',
  },
  input: { 
    width: '100%', 
    borderWidth: 1, 
    borderColor: '#2E3732', 
    borderRadius: 30, 
    padding: 10, 
    marginBottom: 15,
  },
  button: { 
    width: '100%', 
    backgroundColor: '#F4F4F4', 
    padding: 15, 
    borderRadius: 30, 
    alignItems: 'center', 
    marginBottom: 10,
  },
  buttonText: { 
    color: '#000000ff', 
    fontWeight: 'bold',
  },
  textLinksContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginTop: 10,
  },
  textLink: { 
    color: '#000000ff', 
    textDecorationLine: 'none',
  }
});
