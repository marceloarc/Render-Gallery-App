import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useThemedStyles } from "./useThemedStyles";
import { useTheme } from "../../../ThemeContext";
import * as ImagePicker from 'expo-image-picker';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [imageUri, setImageUri] = useState(null); // Adicionado para armazenar o URI da imagem
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();
  const styles = useThemedStyles();
  const { themeStyles } = useTheme(); // Simplificado

  const handleSignUp = () => {
    console.log("Tentando cadastrar o usuário:", email);
    // Implemente aqui a lógica para cadastrar o usuário
    // navigation.navigate('Signup'); // Esta linha parece estar incorreta pois entraria em loop. Removida.
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handlePress = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "Você recusou o acesso à galeria de fotos.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      setImageUri(pickerResult.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registre-se</Text>

      <TouchableOpacity onPress={handlePress}>
        <Image source={{ uri: imageUri }} style={styles.image} />
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
