import React, {useContext,useEffect,useState} from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CartContext } from '../context/CartContext';
import { FavContext } from '../context/FavContext';
import { useToast } from "react-native-toast-notifications";
import { ConfirmDialog } from 'react-native-simple-dialogs';
export function Product({id, name,nameArtist,price, image, onPress}) {
  const { addItemToCart } = useContext(CartContext);
  const { addItemToFav} = useContext(FavContext);
  const toast = useToast();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogVisible2, setDialogVisible2] = useState(false);
  function onAddToCart(productId) {
    addItemToCart(productId);
    toast.show("Arte adicionada ao carrinho com sucesso!", {
      type: "success",
      placement: "bottom",
      duration: 4000,
      offset: 1000,
      animationType: "slide-in",
    });
    setDialogVisible(false);
  }
  function onAddToFav(productId) {
    addItemToFav(productId);
    toast.show("Arte adicionada aos favoritos com sucesso!", {
      type: "success",
      placement: "bottom",
      duration: 4000,
      offset: 1000,
      animationType: "slide-in",
    });
    setDialogVisible2(false)
  }
  return (
    
    <TouchableOpacity style={styles.card} onPress={onPress}>
            <ConfirmDialog
    title="Adicionar ao carrinho"
    message={"Tem certeza que deseja adicionar "+name+" ao carrinho??"}
    visible={dialogVisible}
    onTouchOutside={() => setDialogVisible(false)}
    positiveButton={{
        title: "Sim",
        onPress: () => onAddToCart(id)
    }}
    negativeButton={{
        title: "Não",
        onPress: () => setDialogVisible(false)
    }}
/>
<ConfirmDialog
    title="Adicionar ao favoritos"
    message={"Tem certeza que deseja adicionar "+name+" aos favoritos?"}
    visible={dialogVisible2}
    onTouchOutside={() => setDialogVisible2(false)}
    positiveButton={{
        title: "Sim",
        onPress: () => onAddToFav(id)
    }}
    negativeButton={{
        title: "Não",
        onPress: () => setDialogVisible2(false)
    }}
/>
      <Image
        style={styles.thumb}
        source={image}
      />
      <View style={styles.infoContainer}>
      <TouchableOpacity style={styles.name }>
      
      <Text style={styles.nameButton}><Icon name="user" size={22} color="#3498DB" /> {nameArtist}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setDialogVisible2(true) }  style={styles.buttonIcon}>
      
      <Text style={styles.nameButton}><Icon name="heart" size={22} color="#3498DB" /></Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setDialogVisible(true) } style={styles.buttonIcon}>
      
      <Text style={styles.nameButton}><Icon name="shopping-cart" size={22} color="#3498DB" /></Text>
      </TouchableOpacity>
      </View>
      <Text style={styles.price}>R$ {price}</Text>
    </TouchableOpacity>
    
  );
}

const styles = StyleSheet.create({
  card: {
    
    height:500,
    width: '100%',
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
  thumb: {
    height: '100%',
    borderRadius: 16,
    width: '100%',
    resizeMode:"cover",
  },
  infoContainer: {
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    padding: 16,
    color:'white',
    flexDirection:"row",
    position:'absolute',
    width:'100%',
    
   top:'80%',
  },
  name: {
  backgroundColor:'black',
    width: '50%',
    borderRadius:16,
    padding:10,
    
    margin:10
  },
  buttonIcon: {
    backgroundColor:'black',
      width: '15%',
      borderRadius:100,
      padding:15,
      textAlign:'center',
      margin:10
    },
  nameButton: {
    fontSize: 22,
    fontWeight: 'bold',
    
    color:'#3498DB',
    textAlign:'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color:'white',
    position:'absolute',
    margin:10
  },
});
