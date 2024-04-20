import React, { useEffect, useState, useContext } from 'react';
import {
  Text, Image, View, ScrollView, SafeAreaView,
  TouchableOpacity, StyleSheet, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import { getProduct, getProductsByUser } from "../../../services/ProductsService";
import { CartContext } from '../../../context/CartContext';
import { FavContext } from '../../../context/FavContext';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { getUsersById } from "../../../services/UsersService";
import { Post } from '../../../components/Post/Post';
import { getProductsByCategory } from '../../../services/ProductsService';

export default function Product({ route }) {
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
        <ActivityIndicator size="large" color="#000000" />
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
      <ScrollView>
        <View style={styles.fundo}>
          <Image
            style={[styles.image]} 
            source={{ uri: product.image }}
          />
          <TouchableOpacity onPress={() => onAddToFav() }  style={styles.buttonIconFav}>
                <Ionicons name={icon} size={24} color="#F13658" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}  style={styles.buttonIconBack}>
                <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
            <View style={styles.nameContainer} >
              <View style={styles.containerTitle}>
                <Text style={styles.name}>{product.name}</Text>
              </View>
              <View style={styles.containerIconPlus}>
                <TouchableOpacity onPress={() => {decreaseQuantity()} }  style={styles.buttonIconPlus}>
                  <Ionicons name="remove-outline" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.quantidade}>{quantity}</Text>
                <TouchableOpacity onPress={() => {IncreaseQuantity()} }  style={styles.buttonIconPlus}>
                      <Ionicons name="add-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.user}><Ionicons style={styles.user} name="person-outline" color="white" /> {user.name}</Text>
            <ScrollView style={styles.scrollDesc}>
              <Text style={styles.description}>{product.description}</Text>
            </ScrollView>             
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
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {product.category ? getProductsByCategory(product.category, product.id)
                .slice(1, 3) 
                .map((relatedProduct, index) => (
                  <Post key={relatedProduct.id} id={relatedProduct.id} name={relatedProduct.name} image={relatedProduct.image} price={relatedProduct.price} user={relatedProduct.user} style={styles.relatedItem} />
                )) : null }
            </View>
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

const styles = StyleSheet.create({
  background:{ 
    backgroundColor:'black',
    height:'100%',
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop:20,
    width: '100%', 
    borderRadius: 24,
    height: 400,
  },
  scrollDesc: {
    height: 100, // Define a altura fixa do ScrollView
  },
  fundo:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  infoContainer: {
    
    padding: 16,
  },
  infoContainer2: {
    width:'100%',
    textAlign:'center',
    alignItems: 'center',
  },
  nameContainer:{
    width:'100%',
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor:'#000',
    alignItems: 'center',
  },
  containerTitle:{
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'left',
    width: "60%",

  },
  containerIconPlus:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: "40%",
  },
  name: {
    color:'#ededed',
    fontSize: 24,
    fontWeight: 'bold',
  },
  quantidade:{
    color:'#ededed',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 15,
  },
  description: {
    
    fontSize: 16,
    fontWeight: '400',
    color:'#A4AAAD',
    marginBottom: 5,
  },
  user: {   
    fontSize: 14,
    fontWeight: '400',
    color:'#A4AAAD',
    marginBottom: 5,
  },
  nameButton:{
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    color:'white',
    textAlign:'center',
    fontWeight: 'bold',
  },
  buttonIcon:{
    alignItems: 'center',
    justifyContent: 'center',
    width:327,
    textAlign:'center',
    backgroundColor:'#0057A8',
    margin:10,
    height:60,
    borderRadius: 40,
    flexDirection: 'row',
    position:'absolute',
    bottom: 5,
  },
  buttonIconFav:{
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor:'#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    top: 35,
    right: 20,
  },
  buttonIconBack:{
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor:'#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    top: 35,
    left: 20,
  },
  buttonIconPlus:{
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor:'#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  line:{
    width:'100%',
    height:1,
    backgroundColor:'#ededed',
    marginTop: 30,
  },
  space:{
    height: 70,
  },
  tilte2:{
    color:'#ededed',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  relatedItem: {
    width: '48%', // Subtrai um pouco para contar o espaçamento
    marginVertical: 4,
    marginHorizontal: '1%', // Espaço entre os itens
  },
});
