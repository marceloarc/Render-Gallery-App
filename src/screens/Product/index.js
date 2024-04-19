import React, { useEffect, useState, useContext } from 'react';
import { Text, Image, View, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import { getProduct } from "../../../services/ProductsService";
import { CartContext } from '../../../context/CartContext';
import { FavContext } from '../../../context/FavContext';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { getUsersById } from "../../../services/UsersService";

export default function Product({ route }) {
  const ProductId = route.params.ProductId ;
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({});
  const [dialogVisible, setDialogVisible] = useState(false);
  const toast = useToast();
  
  const { addItemToCart } = useContext(CartContext);
  const { addItemToFav } = useContext(FavContext);
  const { getFavItem } = useContext(FavContext);
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [icon, setIcon] = useState('heart-outline');
  
  useEffect(() => {
    console.log(ProductId);
    setQuantity(1); // Inicializa a quantidade

    async function fetchProduct() {
      const fetchedProduct = await getProduct(ProductId);
      setProduct(fetchedProduct);
      
      if(getFavItem(fetchedProduct.id)){
        setIcon('heart');
      }else{
        setIcon('heart-outline');
      }
      const fetchedUser = await getUsersById(fetchedProduct.user);
      console.log(fetchedUser );
      setUser(fetchedUser);
    }

    fetchProduct();
  
    
   
  }, [ProductId,product]);
  
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
        placement: "bottom",
        duration: 3000,
        offset: 30,
        animationType: "fade",
        textStyle: { color: 'white' }, 
        backgroundColor: "#FF5722", 
        icon: <Ionicons name="heart-outline" size={24} color="white" />, 
      });
      setIcon('heart');
    }else{
      toast.show("Arte removida com sucesso!", {
        type: "success",
        placement: "bottom",
        duration: 3000,
        offset: 30,
        animationType: "fade",
        textStyle: { color: 'white' }, 
        backgroundColor: "#FF5722", 
        icon: <Ionicons name="heart-outline" size={24} color="white" />, 
      });
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
                <Ionicons name={icon} size={24} color="black" />
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
  }
});
