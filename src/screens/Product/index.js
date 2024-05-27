import React, { useEffect, useState, useContext } from 'react';
import {
  Text, Image, View, ScrollView, SafeAreaView,
  TouchableOpacity, StyleSheet, ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import { getProduct, getProductsByUser } from "../../../services/ProductsService";
import { CartContext } from '../../../context/CartContext';
import { FavContext } from '../../../context/FavContext';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { getUsersById } from "../../../services/UsersService";
import { PostRelated } from '../../../components/Post/PostRelated.js';
import { getProductsByCategory } from '../../../services/ProductsService';
import { useTheme } from '../../../ThemeContext';
import { useThemedStyles } from "./useThemedStyles";
import { getCategory } from '../../../services/CategoryService';
import { AuthContext } from '../../../context/AuthContext';
import { getProducts } from '../../../services/ProductsService';
import { API_BASE_URL } from '../../../env.js';

const urlApi = API_BASE_URL + "/";

export default function Product({ route }) {
  const { themeStyles } = useTheme();
  const { Id, Name, Price, Path, CategoriaId, UserId } = route.params;
  const [user2, setUser] = useState({});
  const [product, setProduct] = useState({});
  const { user } = useContext(AuthContext);
  const isCurrentUser = user.id === UserId;

  const [isLoading, setIsLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const toast = useToast();
  const { addItemToCart } = useContext(CartContext);
  const { addItemToFav, getFavItem } = useContext(FavContext);
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [icon, setIcon] = useState('heart-outline');
  const styles = useThemedStyles(); 
  const categoriaName = getCategory(CategoriaId).name;
  const categoriaId = getCategory(CategoriaId).id;
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUsersById(UserId);
        setUser(userData);
        const isFavorite = getFavItem(Id);
        setIcon(isFavorite ? 'heart' : 'heart-outline');
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    setQuantity(1); 
    setIsLoading(true); 
    fetchData();
  }, [UserId]);

  const navigateToProfile = () => {
    if (isCurrentUser) {
      navigation.navigate('MyProfile');
    } else {
      navigation.navigate('Profile', {
        userId: user2.id,
        name: user2.name,
        path: user2.path,
        publicacoes: user2.publicacoes
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (categoriaId) {
          const relatedProducts = await getProducts(categoriaId);
          if (Array.isArray(relatedProducts)) {
            setRelatedProducts(relatedProducts.slice(0, 9));
          } else {
            console.error("A função getProducts não retornou um array de produtos.");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar os produtos relacionados:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    setQuantity(1); 
    setIsLoading(true); 
    fetchData();
  }, [categoriaId]);
  

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={themeStyles.colors.background} />
      </View>
    );
  }

    function onAddToCart() {
      addItemToCart(Id ,quantity);
      toast.show("Arte adicionada ao carrinho com sucesso!", {
        type: "success",
        placement: "bottom",
        duration: 3000,
        offset: 30,
        animationType: "fade",
        textStyle: { color: 'white' },
        backgroundColor: "#388E3C", 
        icon: <Ionicons name="cart-outline" size={24} color="white" />, 
      });
      setDialogVisible(false);
    }
    
    function onAddToFav() {
      addItemToFav(Id);
      if(!getFavItem(Id)){
        toast.show("Arte Favoritada com sucesso!", {
          type: "success",
          successColor: "#FF5722",
          placement: "bottom",
          duration: 2000,
          offset: 30,
          animationType: "fade",
          textStyle: { color: 'white' }, 
          icon: <Ionicons name="heart-outline" size={24} color="white" />, 
        });
        setIcon('heart');
      }else{
        setIcon('heart-outline');
      }
    }
    const decreaseQuantity = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
    const IncreaseQuantity = () => {
      if (quantity < product.quantity) {
        setQuantity(quantity + 1);
      }
    }
  
  return (
    <SafeAreaView style={styles.background}> 
        <TouchableOpacity onPress={() => navigation.goBack()}  style={styles.buttonIconBack}>
            <Ionicons  name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      <ScrollView nestedScrollEnabled = {true}>
        <View style={styles.fundo}>
          <Image
            style={[styles.image]} 
            source={{ uri: Path }}
          />
          <TouchableOpacity onPress={() => onAddToFav() }  style={styles.buttonIconFav}>
                <Ionicons name={icon} size={24} color="#F13658" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoContainer}>
            <View style={styles.nameContainer} >
              <View style={styles.containerTitle}>
                <Text style={styles.name}>{Name}</Text>
              </View>
              <View style={styles.containerIconPlus}>
                <TouchableOpacity onPress={() => {decreaseQuantity()} }  style={styles.buttonIconPlus}>
                  <Ionicons style={styles.IconPlus} name="remove-outline" size={24}  />
                </TouchableOpacity>
                <Text style={styles.quantidade}>{quantity}</Text>
                <TouchableOpacity onPress={() => {IncreaseQuantity()} }  style={styles.buttonIconPlus}>
                      <Ionicons style={styles.IconPlus}  name="add-outline" size={24} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.infoArt}>
              <View style={styles.infoArt2}>
                <Text style={styles.titleInfo}>Artista</Text>
              </View>
              <View style={styles.infoArt2}>
                <Text style={styles.titleInfo}>Likes</Text>
              </View>
              <View style={styles.infoArt2}>
                <Text style={styles.titleInfo}>Categorias</Text>
              </View>
            </View>

            <View style={styles.infoArt}>
              <View style={styles.infoArt3}>
              <TouchableOpacity onPress={navigateToProfile}>
                    <Text style={styles.conteudoInfo}>{user2.name}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.infoArt3}>
                <View style={styles.ratingContainer}>
                        <MaterialIcons name="thumb-up" style={styles.like} />
                        {/* <AntDesign name="like1" style={styles.like} />
                        <FontAwesomeIcon icon={faThumbsUp} style={styles.like} /> */}
                        <Text style={styles.rating}>5</Text>
                  </View>
              </View>
              <View style={styles.infoArt3}>
                <View style={styles.category}>
                  <Text style={styles.CSelected}>{categoriaName}</Text>
                </View>
              </View>
            </View>


            <View style={styles.infoContainer2}>
              <ConfirmDialog
                      title="Adicionar ao carrinho"
                      message={"Tem certeza que deseja adicionar "+quantity+" "+Name+"(s) ao carrinho??"}
                      visible={dialogVisible}
                      onTouchOutside={() => setDialogVisible(false)}
                      positiveButton={{
                          title: "Sim",
                          onPress: () => onAddToCart()
                      }}
                      negativeButton={{
                          title: "Não",
                          onPress: () => setDialogVisible(false)
                      }}
              />
                
            </View>
            <View style={styles.line}></View>
            <Text style={styles.tilte2}>Artes Relacionadas</Text>
            <ScrollView horizontal>
              {relatedProducts.map((relatedProduct, index) => (
                <PostRelated
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  name={relatedProduct.name}
                  image={relatedProduct.path}
                  price={relatedProduct.price}
                  user={relatedProduct.user}
                  style={styles.relatedItem}
                />
              ))}
            </ScrollView>
            <View style={styles.space}></View>
        </View>

      </ScrollView>
      <TouchableOpacity onPress={() => setDialogVisible(true)}style={styles.buttonIcon}>
        <Ionicons name="cart-outline"  size={24} color="white" />
        <Text style={styles.nameButton}>
          Adicionar ao carrinho | {Price ? Price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Preço não disponível'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


