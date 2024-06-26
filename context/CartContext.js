import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { addItemToCartService } from '../services/ProductsService.js'; 
import { getProduct } from '../services/ProductsService.js'; 

export const CartContext = createContext();

export function CartProvider(props) {
  const [items, setItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.carrinho) {
      setItems(user.carrinho);
    }
  }, [user]);

  async function addItemToCart(id, quantity) {
    try {
      await addItemToCartService(user.id, id, quantity);
      
      const product = await getProduct(id);
      const existingItem = items.find(item => item.id === id);
      if (existingItem) {
        setItems(prevItems =>
          prevItems.map(item =>
            item.id === id
              ? {
                  ...item,
                  quantidade: item.quantidade + quantity,
                  totalPrice: item.totalPrice + quantity * product.price,
                }
              : item
          )
        );
      } else {
        setItems(prevItems => [
          ...prevItems,
          {
            id: id,
            nomeProduto: product.nomeProduto,
            path: product.path,
            price: product.price,
            quantidade: quantity,
            totalPrice: quantity * product.price,
          },
        ]);
      }
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
      // Trate o erro conforme necessário
    }
  }

  function getItemsCount() {
    return items.reduce((sum, item) => sum + item.quantidade, 0);
  }

  function getTotalPrice() {
    return items.reduce((sum, item) => sum + item.price * item.quantidade, 0);
  }

  return (
    <CartContext.Provider
      value={{ items, setItems, getItemsCount, addItemToCart, getTotalPrice }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
