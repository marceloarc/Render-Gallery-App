import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FavContext } from '../../../context/FavContext';
import { Ionicons } from "@expo/vector-icons";
import { getCategory } from '../../../services/CategoryService';
import { addItemToFavService } from '../../../services/ProductsService'; // Renomeado para evitar conflito de nomes

export default function Favorites() {
  const { items, addItemToFav } = useContext(FavContext); // Alterado para usar addItemToFav diretamente do contexto
  const navigation = useNavigation();

  function onAddToFav(id) {
    addItemToFav(id);
  }

  function renderItem({ item }) {
    const categoriaId = item.categoria;
    const categoria = getCategory(categoriaId);
    return (
      <TouchableOpacity
        style={styles.cartLine}
        onPress={() => {
          navigation.navigate("Product", {
            Id: item.id,
            Name: item.name,
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
          <Text style={styles.lineLeftArte}>{item.name}</Text>
          <Text style={styles.lineLeft}>{item.artista ? item.artista.nome : ''}</Text>
          <Text style={styles.lineLeftPreco}>
            {categoria ? categoria.name : ''}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity         
            onPress={() => {
              onAddToFav(item.id);
            }} style={styles.buttonIconFav}>
            <Ionicons name="heart" size={26} color="red" />
          </TouchableOpacity>
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

        <Text style={styles.title}>Favorites</Text>

        <View style={styles.buttonFilter}>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            style={styles.itemsList}
            contentContainerStyle={styles.itemsListContainer}
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
        {items.length === 0 && (
          <Text style={styles.emptyText}>Você não possui Favoritos.</Text>
        )}
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
    height: '100%', // Define a altura para 100% para ocupar todo o espaço disponível na tela
    backgroundColor: "#fff",
    paddingHorizontal: 20, // Adicione um padding horizontal para espaçar o conteúdo da tela
  },
  listContainer: {
    marginTop: 10, // Adiciona um espaçamento superior para separar da parte superior da tela
    maxHeight: 625
  },
  cartLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1, // Alterando a largura da borda para torná-la mais visível
    borderBottomColor: "transparent", // Alterando a cor da borda
    paddingVertical: 10,
    height: 100,
  },
  lineLeftArte: {
    fontSize: 17,
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
  thumb: {
    width: 86,
    height: 86,
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
    justifyContent: "center",
    paddingTop: 3,
    paddingBottom: 5,
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
  separator: {
    height: 5, // Altura do separador
    backgroundColor: 'transparent', // Cor de fundo
  }
});
