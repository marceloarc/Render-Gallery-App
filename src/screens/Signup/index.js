import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useThemedStyles } from "./useThemedStyles";
import { register } from '../../../services/UsersService';
import { login } from '../../../services/UsersService';
import { useTheme } from "../../../ThemeContext";
import * as ImagePicker from 'expo-image-picker';
import { useToast } from "react-native-toast-notifications";
import { Ionicons } from "@expo/vector-icons";
import imageicon from '../../../assets/System/select-foto.png';
import { CommonActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Signup() {
  const imageiconuri = Image.resolveAssetSource(imageicon).uri
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [imageUri, setImageUri] = useState("");
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();
  const styles = useThemedStyles();
  const { themeStyles } = useTheme();
  const toast = useToast();
  const [dialogVisibleError, setDialogVisibleError] = useState(false);
  const [dialogVisibleSuccess, setDialogVisibleSuccess] = useState(false);
  const [message, setMessage] = useState('');
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
  
    const formData = new FormData();
    formData.append('File', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    formData.append('Nome', name);
    formData.append('Email', email);
    formData.append('Password', password);
  
    try {
      const response = await register(formData);
      console.log("Response from register:", response);
  
      if (response.success) {
        setMessage(response.message);
        setDialogVisibleSuccess(true);

        setTimeout(() => {
          loginUser();
        }, 3000);
  
      } else if (response.error) {
        setMessage(response.error); 
        setDialogVisibleError(true); 
        setTimeout(() => {
          setDialogVisibleError(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      setMessage(error); 
      setDialogVisibleError(true); 
      setTimeout(() => {
        setDialogVisibleError(false);
      }, 3000);
    }
  };
  

  const loginUser = async () => {
    try {
      const userData = await login(email, password);
      console.log("Response from login:", userData);
  
      if (!userData.message) {
        console.log("Usuário encontrado:", userData);
        signIn(userData);
  
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Registre-se</Text>

      <TouchableOpacity onPress={handlePress}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Image source={{ uri: imageiconuri }} style={styles.image} />
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

      {dialogVisibleError && (
        <View style={[styles.dialogContainerSuccess, { position: 'absolute', bottom: 35, left: 10, width: '95%', zIndex: 999, borderRadius: 50 }]}>
          <View style={[styles.dialogStyle, { marginTop: 20, alignSelf: 'center', width: '100%' }]}>
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
      {dialogVisibleSuccess && (
          <View style={[styles.dialogContainerSuccess, { position: 'absolute', top: 35, left: 10, width: '95%', zIndex: 999, borderRadius: 50 }]}>
          <View style={[styles.dialogStyle, { marginTop: 20, alignSelf: 'flex-start', width: '100%' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
              <Ionicons name="checkmark-circle-outline" size={24} color='green' style={styles.icon} />
              <Text style={[styles.titleText, { fontWeight: 'bold', fontSize: 20, textAlign: 'center' }]}>Sucesso</Text>
            </View>
            <Text style={{ color: themeStyles.colors.textPrimary, textAlign: 'center', marginTop: 10 }}>
              Conta criada com sucesso!
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
