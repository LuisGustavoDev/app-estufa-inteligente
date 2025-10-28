import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, Image } from 'react-native';

const { height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const slideAnim = useRef(new Animated.Value(height)).current; // tela verde sobe
  const logoAnim = useRef(new Animated.Value(height + 100)).current; // logo começa fora da tela

  // Posição intermediária da logo (meio da tela)
  const midLogoY = height / 2 - 40; // subtrai metade da altura da logo

  useEffect(() => {
    // 1. Tela verde sobe
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      // 2. Logo sobe até o meio
      Animated.timing(logoAnim, {
        toValue: midLogoY,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        // 3. Pausa e navegação
        setTimeout(() => {
          navigation.replace('Welcome');
        }, 500);
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.whiteBackground} />

      <Animated.View
        style={[styles.greenBackground, { transform: [{ translateY: slideAnim }] }]}
      />

      <Animated.Image
        source={require('../../assets/logoBranco.png')}
        style={[
          styles.logo,
          { transform: [{ translateY: logoAnim }] }
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  whiteBackground: { ...StyleSheet.absoluteFillObject, backgroundColor: '#fff' },
  greenBackground: { ...StyleSheet.absoluteFillObject, backgroundColor: '#567159' },
  logo: {
    width: 80,
    height: 80,
    position: 'absolute',
    left: '50%',
    marginLeft: -40, // centraliza horizontalmente
    top: 0,
  },
});
