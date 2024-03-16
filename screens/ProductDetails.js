import React, {useEffect, useState, useContext} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Text, 
  Image, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Button, 
  StyleSheet,
  TouchableOpacity,
  } from 'react-native';
import { useToast } from "react-native-toast-notifications";
import { getProduct } from '../services/ProductsService.js';
import { CartContext } from '../context/CartContext';
import { FavContext } from '../context/FavContext';
import { ConfirmDialog } from 'react-native-simple-dialogs';
export function ProductDetails({route}) {
  const { productId } = route.params;
  const [product, setProduct] = useState({});
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogVisible2, setDialogVisible2] = useState(false);
  const toast = useToast();
  const { addItemToCart } = useContext(CartContext);
  const { addItemToFav} = useContext(FavContext);
  useEffect(() => {
    setProduct(getProduct(productId));
  
  });
  
  function onAddToCart() {
    addItemToCart(product.id);
    toast.show("Arte adicionada ao carrinho com sucesso!", {
      type: "success",
      placement: "bottom",
      duration: 4000,
      offset: 1000,
      animationType: "slide-in",
    });
    setDialogVisible(false);
  }
  function onAddToFav() {
    addItemToFav(product.id);
    toast.show("Arte Favoritada com sucesso!", {
      type: "success",
      placement: "bottom",
      duration: 4000,
      offset: 1000,
      animationType: "slide-in",
    });
    setDialogVisible2(false);
  }
  return (
    <SafeAreaView style={styles.background}> 
      <ScrollView>
        <Image
          style={styles.image}
          source={product.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>R$ {product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.infoContainer2}>

          <TouchableOpacity onPress={() => setDialogVisible(true)}style={styles.buttonIcon}>
      
      <Text style={styles.nameButton}>Adicionar ao carrinho <Icon name="shopping-cart" size={16} color="white" /></Text>
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
<ConfirmDialog
    title="Adicionar ao favoritos"
    message={"Tem certeza que deseja adicionar "+product.name+" aos favoritos?"}
    visible={dialogVisible2}
    onTouchOutside={() => setDialogVisible2(false)}
    positiveButton={{
        title: "Sim",
        onPress: () => onAddToFav()
    }}
    negativeButton={{
        title: "Não",
        onPress: () => setDialogVisible2(false)
    }}
/>
      </TouchableOpacity>
        <TouchableOpacity onPress={() => setDialogVisible2(true) }  style={styles.buttonIcon}>
      
    <Text style={styles.nameButton}>Favoritar <Icon name="heart" size={16} color="white" /></Text>
      </TouchableOpacity>


          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background:{
    
    backgroundColor:'black',
    height:'100%'
  },
  card: {
    backgroundColor: 'black',
    
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    marginTop:50,
    height: 300,
    width: '100%'
  },
  infoContainer: {
    
    padding: 16,
  },
  infoContainer2: {
    width:'100%',
    textAlign:'center',
 
  },
  name: {
    color:'#3498DB',
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    color:'#3498DB',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    
    fontSize: 16,
    fontWeight: '400',
    color:'#3498DB',
    marginBottom: 16,
  },
  nameButton:{
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    color:'white',
    textAlign:'center',
  },
  buttonIcon:{
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    textAlign:'center',
    backgroundColor:'#3498DB',
    margin:10,
    height:40
}
});
