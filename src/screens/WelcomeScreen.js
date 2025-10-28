import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Easing } from 'react-native';

const { height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  // posição inicial: logo começa NO MEIO da tela (centrada verticalmente)
  const midLogoY = height / 2 - 40; // metade da altura da logo (80/2)
  const logoY = useRef(new Animated.Value(midLogoY)).current;

  // botões começam FORA DA TELA (embaixo)
  const buttonsY = useRef(new Animated.Value(height + 100)).current;

  // posições finais desejadas
  const finalLogoY = 60; // logo vai para o topo (60px)
  // estimativa de altura do bloco (texto + botões). Ajuste se seu conteúdo mudar.
  const estimatedContentHeight = 160;

  // calculo responsivo para centralizar o bloco de conteúdo verticalmente
  // (centro da tela menos metade do bloco)
  const centeredButtonsY = Math.round(height / 2 - estimatedContentHeight / 2);

  // garantir que os botões não fiquem acima da logo (mantém uma folga mínima)
  const minButtonsY = finalLogoY + 80; // distancia minima abaixo da logo
  const finalButtonsY = Math.max(centeredButtonsY, minButtonsY);

  useEffect(() => {
    const logoUp = Animated.timing(logoY, {
      toValue: finalLogoY,
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });

    const buttonsUp = Animated.timing(buttonsY, {
      toValue: finalButtonsY,
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });

    Animated.sequence([
      logoUp,
      Animated.delay(120),
      buttonsUp,
    ]).start();
  }, [logoY, buttonsY, finalButtonsY]);

  return (
    <View style={styles.container}>
      {/* Logo animada */}
      <Animated.Image
        source={require('../../assets/logoBranco.png')}
        style={[
          styles.logo,
          { transform: [{ translateY: logoY }] }
        ]}
        resizeMode="contain"
      />

      {/* Botões animados e texto acima do botão Entrar */}
      <Animated.View
        style={[
          styles.content,
          { transform: [{ translateY: buttonsY }] }
        ]}
      >
        {/* Texto acima dos botões */}
        <View style={styles.textContainer}>
          <Text style={styles.helloText}>Olá!</Text>
          <Text style={styles.welcomeText}>Seja bem-vindo à Alplatech</Text>
        </View>

        <TouchableOpacity
          style={styles.whiteButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.whiteButtonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.greenButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.greenButtonText}>Registrar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#567159' },

  logo: {
    width: 80,
    height: 80,
    position: 'absolute',
    alignSelf: 'center',
  },

  content: {
    position: 'absolute',
    left: 20,
    right: 20,
    // sem top: vamos controlar via translateY
  },

  textContainer: {
    marginBottom: 20, // espaço entre texto e botão "Entrar"
    alignItems: 'flex-start', // alinhado à esquerda
  },

  helloText: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
  },

  welcomeText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 4,
  },

  whiteButton: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
  },

  whiteButtonText: {
    fontWeight: 'bold',
    color: '#567159',
    fontSize: 16,
  },

  greenButton: {
    width: '100%',
    backgroundColor: '#A3C58D',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },

  greenButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
});
