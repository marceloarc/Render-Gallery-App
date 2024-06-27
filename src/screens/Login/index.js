import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { login } from '../../../services/UsersService';
import { useThemedStyles } from "./useThemedStyles";
import { useTheme } from "../../../ThemeContext";
import DarkImage from '../../../assets/image-login-dark.png';
import LightImage from '../../../assets/image-login-light.png';
import { useToast } from "react-native-toast-notifications";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();
  const styles = useThemedStyles();
  const { themeStyles, theme } = useTheme();
  const [dialogVisibleError, setDialogVisibleError] = useState(false);
  const [message, setMessage] = useState('');

  let imageSource = theme === "dark" ? DarkImage : LightImage;

  const handleLogin = async () => {
    try {
      const userData = await login(email, password);
      if (!userData.message) {
        console.log("Usuário encontrado:", userData);
        signIn(userData);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      } else {
        console.log("Usuário não encontrado ou senha incorreta:", userData)
        setMessage(userData.message); 
        setDialogVisibleError(true); 
        setTimeout(() => {
          setDialogVisibleError(false);
        }, 3000);
      }
  
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Alert.alert("Erro", "Usuário não encontrado ou senha incorreta!");
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  }

  const handleSignUp = () => {
    navigation.navigate('Signup');
  }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Login
        </Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={themeStyles.colors.textPrimary}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword} 
          placeholderTextColor={themeStyles.colors.textPrimary}
        />
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.buttonSubmit}>
          <Text style={styles.textButton}>Continue</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={handleForgotPassword}>
          <Text style={styles.textButton2}>Esqueceu sua senha?</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={handleSignUp}>
          <Text style={styles.textButton3}>Não tem uma conta? Cadastre-se.</Text>
        </TouchableOpacity>

        <Image source={imageSource} style={styles.Image} />

      {dialogVisibleError && (
        <View style={[styles.dialogContainerSuccess, { position: 'absolute', bottom: 35, left: 10, width: '95%', zIndex: 999, borderRadius: 50 }]}>
          <View style={[styles.dialogStyle, { marginTop: 20, alignSelf: 'center', width: '70%' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="alert-circle-outline" size={22} color={themeStyles.colors.vermelho} style={styles.icon} />
              <Text style={[styles.titleText, { fontWeight: 'bold', fontSize: 18, textAlign: 'center' }]}>Erro</Text>
            </View>
            <Text style={{ color: themeStyles.colors.textPrimary, marginTop: 10 }}>
              {message}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

