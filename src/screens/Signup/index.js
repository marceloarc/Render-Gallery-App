import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useThemedStyles } from "./useThemedStyles";
import { useTheme } from "../../../ThemeContext";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();
  const styles = useThemedStyles();
  const { themeStyles } = useTheme();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handlePress = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "Você recusou o acesso à galeria de fotos.");
      return;
    }

    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      console.log("Picker Result:", pickerResult);
      
      if (!pickerResult.cancelled) {
        const firstAsset = pickerResult.assets[0]; 
        if (firstAsset) {
          setImageUri(firstAsset.uri); 
        }
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
      Alert.alert("Erro ao selecionar imagem", "Ocorreu um erro ao selecionar a imagem.");
    }
  };

  useEffect(() => {
    console.log("imageUri mudou:", imageUri);
  }, [imageUri]);
  

  const handleSignUp = async () => {
    console.log("Tentando cadastrar o usuário:", imageUri);
  
    if (!imageUri) {
      Alert.alert("Erro", "Por favor, selecione uma imagem.");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('File', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      formData.append('Nome', name);
      formData.append('Email', email);
      formData.append('Password', password);
  
      const response = await axios.post('http://192.168.0.10:5000/api/mobile/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        console.log("Usuário cadastrado com sucesso:", response.data);
        // Redirecionar para a tela de login ou realizar o login automaticamente
        // navigation.navigate('Login');
      } else {
        console.error("Erro ao cadastrar usuário:", response.data);
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error.message);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registre-se</Text>

      <TouchableOpacity onPress={handlePress}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text>Selecione uma imagem</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        placeholderTextColor={themeStyles.colors.textPrimary}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={themeStyles.colors.textPrimary}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        secureTextEntry
        onChangeText={setPassword} 
        placeholderTextColor={themeStyles.colors.textPrimary}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme sua senha"
        value={confirmpassword}
        secureTextEntry
        onChangeText={setConfirmpassword} 
        placeholderTextColor={themeStyles.colors.textPrimary}
      />
      <TouchableOpacity
        onPress={handleSignUp}
        style={styles.buttonSubmit}>
        <Text style={styles.textButton}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogin}>
      <Text style={styles.textButton2}>
        Já tem uma conta? Entre agora.</Text>
      </TouchableOpacity>
    </View>
  );
};
