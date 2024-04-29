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
export default function Product({ route }) {
  const { themeStyles } = useTheme();
  const ProductId = route.params.ProductId;
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const toast = useToast();
  const { addItemToCart } = useContext(CartContext);
  const { addItemToFav, getFavItem } = useContext(FavContext);
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [icon, setIcon] = useState('heart-outline');
  const styles = useThemedStyles(); 
  useEffect(() => {
    async function fetchProduct() {
      try {
        const fetchedProduct = await getProduct(ProductId);
        setProduct(fetchedProduct);
        const isFavorite = getFavItem(fetchedProduct.id);
        setIcon(isFavorite ? 'heart' : 'heart-outline');
        const fetchedUser = await getUsersById(fetchedProduct.user);
        setUser(fetchedUser);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast.show("Erro ao carregar dados.", {
          type: "error",
          placement: "bottom",
          duration: 3000,
          offset: 30,
          animationType: "fade",
        });
      } finally {
        setIsLoading(false);
      }
    }

    setQuantity(1); // Inicializa a quantidade
    setIsLoading(true); // Reinicia o carregamento
    fetchProduct();
  }, [ProductId]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={themeStyles.colors.background} />
      </View>
    );
  }
    
    function onAddToCart() {
      addItemToCart(product.id,quantity);
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
      addItemToFav(product.id);
      if(!getFavItem(ProductId)){
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
            source={{ uri: product.image }}
          />
          <TouchableOpacity onPress={() => onAddToFav() }  style={styles.buttonIconFav}>
                <Ionicons name={icon} size={24} color="#F13658" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoContainer}>
            <View style={styles.nameContainer} >
              <View style={styles.containerTitle}>
                <Text style={styles.name}>{product.name}</Text>
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
                <Text style={styles.conteudoInfo}>{user.name}</Text>
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
                  <Text style={styles.CSelected}>Animes</Text>
                </View>
              </View>
            </View>


            <View style={styles.infoContainer2}>
              <ConfirmDialog
                      title="Adicionar ao carrinho"
                      message={"Tem certeza que deseja adicionar "+quantity+" "+product.name+"(s) ao carrinho??"}
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
              {product.category ? getProductsByCategory(product.category, product.id)
                .slice(0, 9) 
                .map((relatedProduct, index) => (
                  <PostRelated key={relatedProduct.id} id={relatedProduct.id} name={relatedProduct.name} image={relatedProduct.image} price={relatedProduct.price} user={relatedProduct.user} style={styles.relatedItem} />
                )) : null }
            </ScrollView>
            <View style={styles.space}></View>
        </View>

      </ScrollView>
      <TouchableOpacity onPress={() => setDialogVisible(true)}style={styles.buttonIcon}>
        <Ionicons name="cart-outline"  size={24} color="white" />
        <Text style={styles.nameButton}>
          Adicionar ao carrinho | {product.price ? product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Preço não disponível'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


