import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProductsList } from './screens/ProductsList.js';
import { CategoriesList } from './screens/CategoriesList.js';
import { ProductDetails } from './screens/ProductDetails.js';
import { UserDetails } from './screens/UsersDetails.js';
import { Cart } from './screens/Cart.js';
import { Favorites} from './screens/Favorites.js';
import { CartIcon } from './components/CartIcon.js';
import { FavIcon } from './components/FavIcon.js';
import { Footer } from './components/Footer.js';
import { CartProvider } from './context/CartContext.js';
import { FavProvider } from './context/FavContext.js';
import { ToastProvider } from 'react-native-toast-notifications';
import { View } from 'react-native-web';
import { SafeAreaView, TouchableOpacity  } from 'react-native';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <ToastProvider>
    <CartProvider>
    <FavProvider>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name='Categories' component={CategoriesList} 
          options={({ navigation }) => ({
            title: 'Categorias',
            headerTitleStyle: styles.headerTitle,
            headerStyle: {
              backgroundColor: 'black',
            },
            headerRight: () => <TouchableOpacity style={styles.icons}><CartIcon navigation={navigation}/><FavIcon navigation={navigation}/></TouchableOpacity> 
            
          })}/>
          <Stack.Screen name='ProductsList' component={ProductsList} 
          options={({ navigation }) => ({
            title: 'Galeria',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: '#3498DB',
            headerTitleStyle: styles.headerTitle,
            headerRight: () => <SafeAreaView style={styles.icons}><CartIcon navigation={navigation}/><FavIcon navigation={navigation}/></SafeAreaView>
          })}/>
          <Stack.Screen name='ProductDetails' component={ProductDetails} 
          options={({ navigation }) => ({
            title: 'Detalhes da arte',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: styles.headerTitle,
            headerTintColor: '#3498DB',
            headerRight: () => <TouchableOpacity style={styles.icons}><CartIcon navigation={navigation}/><FavIcon navigation={navigation}/></TouchableOpacity >
          })} />
          <Stack.Screen name='Cart' component={Cart} 
          options={({ navigation }) => ({
            title: 'Carrinho',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: '#3498DB',
            headerTitleStyle: styles.headerTitle,
            headerRight: () => <SafeAreaView style={styles.icons}><CartIcon navigation={navigation}/><FavIcon navigation={navigation}/></SafeAreaView>
          })} />
          <Stack.Screen name='Favorites' component={Favorites} 
          options={({ navigation }) => ({
            title: 'Favoritos',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: '#3498DB',
            headerTitleStyle: styles.headerTitle,
            headerRight: () => <SafeAreaView style={styles.icons}><CartIcon navigation={navigation}/><FavIcon navigation={navigation}/></SafeAreaView>
          })} />

          <Stack.Screen name='User' component={UserDetails} 
          options={({ navigation }) => ({
            title: 'User',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: '#3498DB',
            headerTitleStyle: styles.headerTitle,
            headerRight: () => <SafeAreaView style={styles.icons}><CartIcon navigation={navigation}/><FavIcon navigation={navigation}/></SafeAreaView>
          })} />
          
        </Stack.Navigator>

        
      </NavigationContainer>
      </FavProvider>
    </CartProvider>
    <Footer 
        ></Footer>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    color:'#3498DB'
  },
  icons:{
    flexDirection:"row",
    margin:'0',
    padding:'0'
  }
});

export default App;
