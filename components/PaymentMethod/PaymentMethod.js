import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from "../../context/CartContext";


export default function PaymentMethod() {
  const { items, getItemsCount, getTotalPrice } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetailsFilled, setCardDetailsFilled] = useState(false);
  let [total, setTotal] = useState(0);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handlePaymentMethod = (method) => {
    if (method === paymentMethod) {
      setPaymentMethod('');
    } else {
      if (cardDetailsFilled) {
        setPaymentMethod(method);
      } else {
        setCardDetailsFilled(true);
        setPaymentMethod(method);
      }
    }
  };

  const renderPaymentMethodText = () => {
    if (paymentMethod === 'card' && cardDetailsFilled) {
        return paymentMethod === 'card' ? 'Cartão de Crédito' : 'Pix';
    } else {
      return cardDetails.cardNumber != (null || "") ? cardDetails.cardNumber : 'Cartão de Crédito';
    }
  };
  async function fetchTotal(){
    let subTotal = items.reduce((sum, item) => sum + item.price * item.quantidade, 0);
    setTotal(subTotal);
  }
  function Totals({ type }) {
   

    useEffect(() => {
      if (type === "sub") {
        fetchTotal();
      } else {
        // Caso contrário, calcula o total normal
        setTotal(getTotalPrice());
      }
    }, [type, getTotalPrice, items]);

    return (
      <View style={styles.cartLineTotal}>
        <Text style={[styles.lineLeft, styles.lineTotal]}>
          {type === "sub" ? "Subtotal" : "Total"}
        </Text>
        <Text style={styles.lineRight}>
          {total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shipping Information</Text>

      <TouchableOpacity
        style={[styles.option, paymentMethod === 'card' && styles.selectedOption]}
        onPress={() => handlePaymentMethod('card')}
      >
        <Text style={styles.optionText}>{renderPaymentMethodText()}</Text>
        <Ionicons
          name={paymentMethod === 'card' ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {paymentMethod === 'card' && (
        <View style={styles.cardForm}>
          <TextInput
            style={styles.input}
            placeholder="Número do Cartão"
            value={cardDetails.cardNumber}
            onChangeText={(text) => setCardDetails({ ...cardDetails, cardNumber: text })}
          />
          <View style={styles.anotherCamp}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Data de Expiração"
              value={cardDetails.expiryDate}
              onChangeText={(text) => setCardDetails({ ...cardDetails, expiryDate: text })}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVV"
              value={cardDetails.cvv}
              onChangeText={(text) => setCardDetails({ ...cardDetails, cvv: text })}
            />
          </View>
        </View>
      )}
        <View style={styles.totalContainer}>
          <Totals />
        </View>
        <View style={styles.subtotalContainer}>
            <Totals type="sub" />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,

    width: '90%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  selectedOption: {
    backgroundColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  cardForm: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  halfInput: {
    flex: 1,
    marginRight: 5,
  },
  anotherCamp: {
    flexDirection: 'row',
  },
  totalContainer: {
    marginTop: 20,
    borderBottomWidth: 1,
  },
  subtotalContainer: {
    marginTop: 20,
  },
  cartLineTotal: {
    flexDirection: "row",
    paddingVertical: 5,
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  lineTotal: {
    fontWeight: "bold",
  },
});
