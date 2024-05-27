  import React, { useEffect, useState, useContext } from "react";
  import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
  } from "react-native";
  import { useNavigation } from "@react-navigation/native";
  import { CartContext } from "../../../context/CartContext";
  import { AuthContext } from "../../../context/AuthContext";
  import { Ionicons } from "@expo/vector-icons";
  import PaymentMethod from "../../../components/PaymentMethod/PaymentMethod";

  export default function Cart() {
    const { user } = useContext(AuthContext);
    const { items, getItemsCount, getTotalPrice } = useContext(CartContext);
    const navigation = useNavigation();

    function renderItem({ item }) {
      return (
        <TouchableOpacity
          style={styles.cartLine}
          onPress={() => {
            navigation.navigate("Product", {
              ProductId: item.product.id,
            });
          }}
        >
          <Image style={styles.thumb} source={{ uri: item.path }} />
          <View style={styles.infoItem}>
            <Text style={styles.lineLeftArte}>Arte nome</Text>
            <Text style={styles.lineLeft}>Artista</Text>
            <Text style={styles.lineLeftPreco}>
              {item.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>
          </View>
          <View style={styles.quantityContainer}>
            <Ionicons name="ellipsis-horizontal" size={24} color="black" />
            <View style={styles.quantity}>
              <TouchableOpacity
                onPress={() => {
                  // Decrease quantity logic here
                }}
              >
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>5</Text>
              <TouchableOpacity
                onPress={() => {
                  // Increase quantity logic here
                }}
              >
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container2}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.buttonIconBack}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.title}>Checkout</Text>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.buttonFilter}
          >
            <Ionicons name="filter" size={24} color="black" />
          </TouchableOpacity>
        </View>
          <View style={styles.container}>
            <View style={styles.listContainer}>
              <FlatList
                style={styles.itemsList}
                contentContainerStyle={styles.itemsListContainer}
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.idProduto.toString()}
                />
            </View>
            {items.length === 0 && (
              <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
            )}
          </View>            

          <PaymentMethod />

          <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => setDialogVisible(true)}style={styles.buttonIcon}>
                <Text style={styles.nameButton}>
                  Pagar
                </Text>
              </TouchableOpacity>
          </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container2: {
      flex: 1,
      backgroundColor: "#fff",
    },  
    container: {
      height: '50%', // Define a altura para 100% para ocupar todo o espaço disponível na tela
      backgroundColor: "#fff",
      paddingHorizontal: 20, // Adicione um padding horizontal para espaçar o conteúdo da tela
    },
    listContainer: {
      flex: 1, // Garante que o container da FlatList ocupe todo o espaço disponível na tela
      marginTop: 10, // Adiciona um espaçamento superior para separar da parte superior da tela

    },
    cartLine: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1, // Alterando a largura da borda para torná-la mais visível
      borderBottomColor: "#ccc", // Alterando a cor da borda
      paddingVertical: 10,
      height: 100,
    },
    

    lineLeftArte: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333333",
    },
    lineLeft: {
      fontSize: 13,
      color: "#333333",
    },
    lineLeftPreco: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#333333",
      marginTop: 7,
    },
    lineRight: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333333",
      textAlign: "right",
    },
    thumb: {
      width: 70,
      height: 70,
      borderRadius: 14,
      resizeMode: "cover",
    },
    header: {
      marginTop: 70,
      height: 64,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    buttonIconBack: {
      width: 40,
      height: 40,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: "#000000",
      alignItems: "center",
      justifyContent: "center",
      left: 20,
    },
    buttonFilter:{
      width: 40,
      height: 40,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: "#000000",
      alignItems: "center",
      justifyContent: "center",
      right: 20,
    },
    infoItem: {
      flex: 1,
      marginLeft: 10,
    },
    quantityContainer: {
      height: '100%', 
      alignItems: "flex-end",
      justifyContent: "space-between",
      paddingTop: 3,
      paddingBottom: 5,
    },
    quantity: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#eeeeee",
      borderRadius: 8,
      height: 32,
      width: 85,
      justifyContent: "space-between",
      paddingHorizontal: 5,
    },
    quantityText: {
      fontSize: 16,
      paddingHorizontal: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
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
    },
    nameButton:{
      fontSize: 16,
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      textAlign:'center',
      fontWeight: 'bold',
    },
    buttonContainer:{
      alignItems: 'center',
      justifyContent: 'center',
      position:'absolute',
      bottom: 5,
      width: '100%',
    },

    
  });
