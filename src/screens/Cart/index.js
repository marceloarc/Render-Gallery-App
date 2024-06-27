import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../../../context/CartContext";
import { AuthContext } from "../../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import PaymentMethod from "../../../components/PaymentMethod/PaymentMethod";
import { Modalize } from 'react-native-modalize'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getCategory } from "../../../services/CategoryService";
import { removeItemToCartService } from "../../../services/ProductsService";
import { UpdateItemService } from "../../../services/ProductsService";
import { useThemedStyles } from "./useThemedStyles";
import { useTheme } from "../../../ThemeContext";
import { Dialog } from "react-native-simple-dialogs";

export default function Cart() {
  const { user } = useContext(AuthContext);
  const { items, getItemsCount, getTotalPrice } = useContext(CartContext);
  const navigation = useNavigation();
  const { removeItemFromCart } = useContext(CartContext);
  const modalizeref = useRef(null);
  const styles = useThemedStyles(); 
  const { themeStyles } = useTheme();
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleRemoveProduct = (Id) => {
    removeItemFromCart(Id);
  };
  function onOpen(event) {
    if (event) {
      event.persist();
      modalizeref.current?.open();
    }
  }

  function Item({ item, index }) {
    const categoriaId = item.categoria;
    const categoria = getCategory(categoriaId);
    const itemid = item.idProduto;
    const [quantity, setQuantity] = useState(item.quantidade);

    return (
      <TouchableOpacity
        style={styles.cartLine}
        onPress={() => {
          navigation.navigate("Product", {
            Id: itemid,
            Name: item.nomeProduto,
            Price: item.price,
            Path: item.path,
            CategoriaId: categoria.id,
            UserId: item.artista.id,
            quantity: item.quantidade,
          });
        }}
      >
        <Image style={styles.thumb} source={{ uri: item.path }} />
        <View style={styles.infoItem}>
          <Text style={styles.lineLeftArte}>{item.nomeProduto}</Text>
          <Text style={styles.lineLeft}>{item.artista.nome}</Text>
          <Text style={styles.lineLeftPreco}>
            {item.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </View>
        <View style={styles.quantityContainer} >
        <TouchableOpacity onPress={() => handleRemoveProduct(itemid)} style={styles.buttonIconPoint}>
            <Ionicons name="trash-outline" size={20} color="red" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.quantity} >
          <TouchableOpacity
            onPress={() => {
              if (quantity > 1) {
                var quantity2 = quantity - 1;
                if (quantity2 < 1) {
                  handleRemoveProduct(itemid);
                }
                setQuantity(quantity2);
                try {
                  console.log(user.id, itemid, quantity);
                  UpdateItemService(user.id, itemid, quantity - 1);
                } catch (error) {
                  console.error('Erro ao adicionar item ao carrinho:', error);
                }
              }
            }}
            disabled={quantity === 1} 
          >
              <Text style={[styles.quantityText, quantity === 1 ? { color: 'transparent' } : null]}>-</Text>
          </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => {
                var quantity2 = quantity + 1;
                try {
                  UpdateItemService(user.id, itemid, quantity+1) 
                  .then(result => {
                    console.log("resultado de somar", result.message);
                    if(result.message == "Produto atualizado com sucesso"){
                      setQuantity(quantity2);
                    } else {
                      setDialogVisible(true);
                      //console.log("Erro ao adicionar item ao carrinho:", result.message);
                    }
                  })   
                } catch (error) {
                  console.error('Erro ao adicionar item ao carrinho:', error);
                  // Trate o erro conforme necessário
                }
              }}
            >
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Dialog
          visible={dialogVisible}
          title={
            <View style={styles.titleContainer}>
              <Ionicons name="alert-circle-outline" size={24} color={themeStyles.colors.vermelho} style={styles.icon} />
              <Text style={styles.titleText}>Erro</Text>
            </View>
          }
          onTouchOutside={() => setDialogVisible(false)} 
          style={styles.dialogContainer}
          dialogStyle={styles.dialogStyle}
          titleStyle={{color: themeStyles.colors.textPrimary, fontWeight: "bold", fontSize: 20, textAlign: "center"}}
          >
          <View style={{ alignItems: 'center'}}>
            <Text style={{ color: themeStyles.colors.textPrimary, textAlign: "center", marginBottom: 20 }}>Desculpe, só temos uma unidade disponível no estoque.</Text>
            <TouchableOpacity style={{ backgroundColor: themeStyles.colors.background, width: '80%', height: 30, justifyContent: 'center', borderRadius: 5}} onPress={() => setDialogVisible(false) }>
              <Text style={{textAlign: 'center', color: themeStyles.colors.textPrimary}}>OK</Text>
            </TouchableOpacity>
          </View>
        </Dialog>
        <View style={styles.container2}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.buttonIconBack}
            >
              <Ionicons name="chevron-back" size={24} color={themeStyles.colors.textPrimary} />
            </TouchableOpacity>

            <Text style={styles.title}>Carrinho</Text>

            {/* <TouchableOpacity
              onPress={() => navigation.navigate('Chat')}
              style={styles.buttonFilter}
            >
              <Ionicons name="filter" size={24} color={themeStyles.colors.textPrimary} />
            </TouchableOpacity> */}
            <View style={styles.buttonFilter}>
            </View> 
          </View>
          <View style={styles.container}>
            <View style={styles.listContainer}>
              <FlatList
                style={styles.itemsList}
                persistentScrollbar={true}
                contentContainerStyle={styles.itemsListContainer}
                data={items}
                renderItem={({item, index, separators}) => <Item item={item}/> }
                keyExtractor={(item) => item.idProduto.toString()}
              />
            </View>
            {items.length === 0 && (
              <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
            )}
          </View>


          <Modalize ref={modalizeref} snapPoint={500} adjustToContentHeight={true} openAnimationConfig={{ timing: { duration: 500 } }} >
            <View style={{justifyContent: "center", alignItems: "center"}}>
            <PaymentMethod />
            <TouchableOpacity
              onPress={(event) => onOpen(event)}
              style={styles.buttonIcon}
            >
              <Text style={styles.nameButton}>Pagar</Text>
            </TouchableOpacity>
            </View>
          </Modalize>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={(event) => onOpen(event)}
              style={styles.buttonIcon}
            >
              <Text style={styles.nameButton}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </GestureHandlerRootView>
  );
}
