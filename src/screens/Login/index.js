import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { getUsersByEmail } from '../../../services/UsersService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, signIn } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      // Navega para a Home, limpando a stack de navegação.
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
    }
  }, [user, navigation]);

  const handleLogin = () => {
    console.log("Tentando encontrar o usuário:", email);
    const userFound = getUsersByEmail(email);
    if (userFound) {
      console.log("Usuário encontrado:", userFound);
      signIn(userFound);
    } else {
      alert("Usuário não encontrado ou senha incorreta!");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        secureTextEntry
        onChangeText={setPassword}  
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});
