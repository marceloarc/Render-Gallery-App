import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useThemedStyles } from "./useThemedStyles";
import { getProductsByUser } from "../../../services/ProductsService";
import { PostRelated } from "../../../components/Post/PostRelated";
import { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Menu, Provider as PaperProvider } from "react-native-paper"; // Importando Menu e PaperProvider

export default function MyProfile({ route }) {
  const { user, signOut } = useContext(AuthContext);
  const navigation = useNavigation();
  const styles = useThemedStyles();
  const [menuVisible, setMenuVisible] = useState(false); // Estado para controlar a visibilidade do menu

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  // Função para lidar com o logout
  const handleLogout = () => {
    signOut();
    navigation.navigate("Login");
  };

  if (!user) {
    handleLogout();
    return (
      <View style={styles.container}>
        <Text>Deslogando...</Text>
      </View>
    );
  }

  const qtdProducts = getProductsByUser(user.id).length;
  const pic = user.pic;

  return (
    <PaperProvider>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Image
            source={{ uri: "https://r2.easyimg.io/5u66q75r7/sukuna.jpg" }}
            style={styles.coverImage}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.buttonIconBack}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>

          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity
                onPress={openMenu}
                style={styles.buttonIconPoint}
              >
                <Ionicons name="ellipsis-vertical" size={24} color="black" />
              </TouchableOpacity>
            }
            style={styles.menuContainer}
          >
            <Menu.Item onPress={handleLogout} title="Sair" titleStyle={styles.menuText} style={styles.menuItem} />
          </Menu>

          <View style={styles.profileSection}>
            <Image source={{ uri: pic }} style={styles.profileImage} />
          </View>

          <View style={styles.postsContainer}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileDesciption}>{user.desc}</Text>

            <View style={styles.containerExterno}>
              <View style={styles.containerInterno}>
                <Text style={styles.textInterno1}>Publicações</Text>
                <Text style={styles.textInterno2}>{qtdProducts}</Text>
              </View>
              <View style={styles.containerInterno}>
                <Text style={styles.textInterno1}>Likes</Text>
                <Text style={styles.textInterno2}>50</Text>
              </View>
              <View style={styles.containerInterno}>
                <Text style={styles.textInterno1}>Views</Text>
                <Text style={styles.textInterno2}>100</Text>
              </View>
              <View style={styles.containerInterno}>
                <Text style={styles.textInterno1}>Vendas</Text>
                <Text style={styles.textInterno2}>11</Text>
              </View>
            </View>
          </View>

          <View style={styles.postsContainer}>
            <Text style={styles.publiTitle}>Publicações</Text>
            <View style={styles.line}>
              <View style={styles.line2}></View>
            </View>
            <ScrollView horizontal>
              {getProductsByUser(user.id)
                .slice(0, 9)
                .map((relatedProduct, index) => (
                  <PostRelated
                    key={relatedProduct.id}
                    id={relatedProduct.id}
                    name={relatedProduct.name}
                    image={relatedProduct.image}
                    price={relatedProduct.price}
                    user={relatedProduct.user}
                    style={styles.relatedItem}
                  />
                ))}
            </ScrollView>
          </View>
        </ScrollView>
        <View style={styles.space}></View>
        <Button title="Logout" onPress={handleLogout} color="#FF6347" />
      </View>
    </PaperProvider>
  );
}
