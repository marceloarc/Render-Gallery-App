import React, { useEffect, useState, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useThemedStyles } from "./useThemedStyles";
import { AuthContext } from "../../../context/AuthContext";
import { Posts } from '../../../components/Posts';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from "../../../ThemeContext";


export default function MyProfile({ route }) {
  const { user, signOut } = useContext(AuthContext);
  const navigation = useNavigation();
  const styles = useThemedStyles();
  const [menuVisible, setMenuVisible] = useState(true);
  const modalizeref = useRef(null);
  const { themeStyles } = useTheme();

  // Verifica se o usuário está logado e renderiza apenas se o usuário existir
  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user, navigation]);

  // Verifica se o usuário está definido e se tem a propriedade dataCriacao
  useEffect(() => {
    if (user && !user.dataCriacao) {
      user.dataCriacao = new Date();
    }
  }, [user]);

  // Se o usuário não estiver definido, renderiza um componente de carregamento ou retorna nulo
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  // Formatando a data de criação do usuário
  const formattedDate = new Date(user.dataCriacao).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const handleLogout = () => {
    signOut();
    navigation.navigate("Login");
  };

  const onOpen = () => {
    setMenuVisible(false);
    modalizeref.current?.open();
  };

  const path = user.pic;
  const { publicacoes } = user;
  const qtdProducts = publicacoes.length;

  let totalFavoritos = 0;
  publicacoes.forEach((publicacao) => {
    totalFavoritos += publicacao.favoritosCount;
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Modalize
          ref={modalizeref}
          snapPoint={100}
          modalStyle={styles.modal}
          onClosed={() => setMenuVisible(true)}
          // modalHeight={100}
          adjustToContentHeight={true}
          openAnimationConfig={{ timing: { duration: 350 } }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity onPress={handleLogout} style={styles.buttonSair}>
              <Text style={styles.nameButton}>Sair</Text>
            </TouchableOpacity>
          </View>
        </Modalize>

        <ScrollView style={styles.scrollView}>
          <View style={styles.spaceheader}></View>

          <TouchableOpacity onPress={handleLogout} style={styles.buttonIconPoint}>
            <Text style={{color: themeStyles.colors.vermelho, fontSize: 16, marginRight: 5}}>Sair</Text>
            <Ionicons name="log-out-outline" size={24} color={themeStyles.colors.vermelho} />
          </TouchableOpacity>

          <View style={styles.profileSection}>
            <Image
              source={{ uri: path }}
              style={styles.profileImage}
            />
            <View style={styles.containername}>
              <Text style={styles.profileName}>@{user.name}</Text>
              <Text style={styles.profileName2}>Usuário desde {formattedDate}</Text>
              <View style={styles.infoArt3}>
                <View style={styles.category}>
                  <Text style={styles.CSelected}>Animes</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.postsContainer}>
            <View style={styles.containerExterno}>
              <View style={styles.containerInterno}>
                <Text style={styles.textInterno1}>Artes</Text>
                <Text style={styles.textInterno2}>{qtdProducts}</Text>
              </View>
              <View style={styles.containerInterno}>
                <Text style={styles.textInterno1}>Favoritados</Text>
                <Text style={styles.textInterno2}>{totalFavoritos}</Text>
              </View>
              <View style={styles.containerInterno}>
                <Text style={styles.textInterno1}>Views</Text>
                <Text style={styles.textInterno2}>100</Text>
              </View>
              <View style={styles.containerInterno}>
                <Text style={styles.textInterno1}>Vendas</Text>
                <Text style={styles.textInterno2}>{user.vendas}</Text>
              </View>
            </View>
            <Text style={styles.publiTitle}>Publicações</Text>
            <View style={styles.line}>
              <View style={styles.line2}></View>
            </View>
          </View>

          <View style={styles.postsContainer2}>
            <Posts Products={publicacoes} returnScreen={'MyProfile'} />
          </View>

        </ScrollView>
        <View style={styles.space}></View>
      </View>
    </GestureHandlerRootView>
  );
}
