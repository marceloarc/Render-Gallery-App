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

export default function Cart() {
  const { user } = useContext(AuthContext);
  const { items, getItemsCount, getTotalPrice } = useContext(CartContext);
  const navigation = useNavigation();

  function Totals() {
    let [total, setTotal] = useState(0);
    useEffect(() => {
      setTotal(getTotalPrice());
    });
    return (
      <View style={styles.cartLineTotal}>
        <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
        <Text style={styles.lineRight}>
          {total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
      </View>
    );
  }

  function renderItem({ item }) {
    console.log(item.path);
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
        <Text style={styles.lineLeft}>
          {item.name} x {item.quantity}
        </Text>
        <Text style={styles.lineRight}>
          {item.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
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
      </View>
      <FlatList
        style={styles.itemsList}
        contentContainerStyle={styles.itemsListContainer}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={Totals}
      />
      {items.length === 0 && (
        <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: "#000",
  },
  cartLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cartLineTotal: {
    flexDirection: "row",
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
  },
  lineTotal: {
    fontWeight: "bold",
  },
  lineLeft: {
    fontSize: 20,
    lineHeight: 40,
    color: "#333333",
  },
  lineRight: {
    // flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 40,
    color: "#333333",
    textAlign: "right",
  },
  itemsList: {
    backgroundColor: "#eeeeee",
  },
  itemsListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  thumb: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 5,
    margin: 5,
    width: 50,
    resizeMode: "cover",
  },
  header: {
    marginTop: 54,
    height: 64,
  },
  buttonIconBack: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
  },
});
