import React, { useEffect, useState, useContext } from 'react';
import { Text, Image, View, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import { getProduct } from "../../../services/ProductsService";
import { CartContext } from '../../../context/CartContext';
import { FavContext } from '../../../context/FavContext';
import { ConfirmDialog } from 'react-native-simple-dialogs';

export default function Product({ route }) {
  const { ProductId } = route.params;
  const [product, setProduct] = useState({});
  const [aspectRatio, setAspectRatio] = useState(1);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogVisible2, setDialogVisible2] = useState(false);
  const toast = useToast();
  const { addItemToCart } = useContext(CartContext);
  const { addItemToFav } = useContext(FavContext);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchProduct() {
      const fetchedProduct = await getProduct(ProductId);
      setProduct(fetchedProduct);
      Image.getSize(fetchedProduct.image, (width, height) => { 
        setAspectRatio(width / height);
      });
    }
    fetchProduct();
  }, [ProductId]);
  
  function onAddToCart() {
    addItemToCart(product.id);
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
    setDialogVisible2(false);
  }
  
  return (
    <SafeAreaView style={styles.background}> 
      <ScrollView>
        <View style={styles.fundo}>
          <Image
            style={[styles.image, {aspectRatio}]} 
            source={{ uri: product.image }}
          />
          <TouchableOpacity onPress={() => onAddToFav() }  style={styles.buttonIconFav}>
                <Ionicons name="heart-outline" size={24} color="black" />
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
                <TouchableOpacity onPress={() => onAddToFav() }  style={styles.buttonIconPlus}>
                  <Ionicons name="remove-outline" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.quantidade}>1</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home') }  style={styles.buttonIconPlus}>
                      <Ionicons name="add-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.description}>{product.description}</Text>
            <View style={styles.infoContainer2}>
              <ConfirmDialog
                      title="Adicionar ao carrinho"
                      message={"Tem certeza que deseja adicionar "+product.name+" ao carrinho??"}
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
        <Ionicons name="cart-outline" size={24} color="black" />
        <Text style={styles.nameButton}>Adicionar ao carrinho | R$ {product.price} </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background:{ 
    backgroundColor:'black',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop:20,
    width: '100%', 
    borderRadius: 24,
    maxHeight: 550,
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
    width: "50%",
  },
  containerIconPlus:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: "50%",
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
    color:'#D0D0D0',
    marginBottom: 16,
  },
  nameButton:{
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    color:'#292526',
    textAlign:'center',
    fontWeight: 'bold',
  },
  buttonIcon:{
    alignItems: 'center',
    justifyContent: 'center',
    width:327,
    textAlign:'center',
    backgroundColor:'#FFFFFF',
    margin:10,
    height:60,
    borderRadius: 40,
    flexDirection: 'row',
    position:'absolute',
    bottom: 10,
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
