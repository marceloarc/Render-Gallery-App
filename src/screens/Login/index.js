import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
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
export default function Login() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();
  const styles = useThemedStyles();
  const { themeStyles, theme } = useTheme();

  let imageSource = theme === "dark" ? DarkImage : LightImage;

  // const handleLogin = () => {
  //   console.log("Tentando encontrar o usuário:", email, password);
    
  //   const userFound = login(email, password);
  //   if (userFound && userFound.password === password) {
  //     console.log("Usuário encontrado:", userFound);
  //     signIn(userFound);
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [{ name: 'Home' }],
  //       })
  //     );
  //   } else {
  //     alert("Usuário não encontrado ou senha incorreta!");
  //   }
  // };

  const handleLogin = async () => {
    try {
      const userData = await login(email, password);
      if(!userData.message){
        console.log("Usuário encontrado:", userData);
        signIn(userData);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      }else{
        toast.show(userData.message, {
          type: "warning",
          placement: "bottom",
          duration: 2000,
          offset: 30,
          animationType: "fade",
          textStyle: { color: 'white' },
          backgroundColor: "#FF5722",
          icon: <Ionicons name="alert-outline" size={24} color="white" />,
      });
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
    <View style={styles.container}>
      <Text style={styles.title}>
        Login
      </Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor= {themeStyles.colors.textPrimary}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword} 
        placeholderTextColor= {themeStyles.colors.textPrimary}
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.buttonSubmit}>
        <Text style={styles.textButton}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleForgotPassword}>
        <Text style={styles.textButton2}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSignUp}>
        <Text style={styles.textButton3}>Não tem uma conta? Cadastre-se.</Text>
      </TouchableOpacity>

      <Image source={imageSource}
          style={styles.Image}>
      </Image>
    </View>
  );
};

