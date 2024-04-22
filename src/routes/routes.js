import React,{useContext} from 'react';
import { Image, TouchableOpacity,Text,View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer ,useNavigation, } from '@react-navigation/native';
import { CartContext} from '../../context/CartContext';
import { FavContext} from '../../context/FavContext';
import { ToastProvider } from 'react-native-toast-notifications';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';
import Product from '../screens/Product';
import { useTheme } from '../../ThemeContext';
import darkMode from '../../assets/System/dark-mode.png';
import lightMode from '../../assets/System/light-mode.png';

const Tab = createBottomTabNavigator();
const BackButton = ({onPress})=> <TouchableOpacity onPress={onPress} style={{alignItems:"center",flexDirection:"row",justifyContent:"center"}}>
<Ionicons name="chevron-back" size={24} color="white" />

 </TouchableOpacity>
function Routes() {
    const {getItemsCount} = useContext(CartContext);
    const {getFavCount} = useContext(FavContext);
    const {goBack} = useNavigation();
    const { theme, toggleTheme, themeStyles } = useTheme();
    let imageSource = '';
    if(theme == 'dark'){
       imageSource = darkMode;
    }else{
      imageSource = lightMode;
    }
  return (
    <ToastProvider>
            <Tab.Navigator
            
              screenOptions={({ route }) => ({
                headerTintColor: themeStyles.colors.textPrimary,
                headerStatusBarHeight: 30,
                headerStyle: {
                  backgroundColor: themeStyles.colors.background,
                  borderWidth: 0,
                  elevation: 0,
                  shadowOpacity: 0,
                },
                animationEnabled: true, // Ativa animações
                animationTypeForReplace: 'fade', // Define o tipo de animação (por exemplo, 'push', 'pop', 'fade', etc.)
                animationIn: 'slideInDown', // Define a animação de entrada
                animationOut: 'slideOutUp', // Define a animação de saída
                tabBarVisible: route.name !== 'Product',
              
                tabBarShowLabel: true,
                tabBarStyle: {
                  position: 'absolute',
                  backgroundColor: themeStyles.colors.preto,
                  borderTopWidth: 0,
                  bottom: 14,
                  left: 14,
                  right: 14,
                  elevation: 0,
                  borderRadius: 40,
                  height: 60,
                },
              })}
            >

              <Tab.Screen name="Home" component={Home} initialParams={{ CategoryId: 0, name: '' }} options={{
                headerTitle: () => (
                  <Image source={require('../../assets/System/logo.png')} style={{ width: 120, height: 40 }} />
                ),
                headerRight: () => {
                  return (
                    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
                      <Image source={imageSource} style={{width: 60, height: 35}} />
                    </TouchableOpacity>
                  );
                },
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={focused ? require('../../assets/System/home-active.png') : require('../../assets/System/home-inactive.png')}
                    style={{ width: 40, height: 40 }}
                  />
                ),
                tabBarLabel: ({ focused }) => null
              }} />
              <Tab.Screen name="Carrinho" component={Cart} options={{
                tabBarIcon: ({ focused }) => (
                    
                  <Image
                    source={focused ? require('../../assets/System/cart-active.png') : require('../../assets/System/cart-inactive.png')}
                    style={{ width: 40, height: 40 }}
                  />
                 
                ),
                tabBarLabel: ({ focused }) => 
                     (
                        <View style={{
                            width:12,
                            height:12,
                            top:30,
                            left:30,
                            backgroundColor: themeStyles.colors.vermelho,
                            borderRadius:50,
                          position:'absolute',

                 
                        }}>
                      <Text
                        style={{
                            textAlign:'center',
                            marginRight:1,
                            top:-1,
                            fontSize:10,
                          fontWeight:"500",
                          color: themeStyles.colors.brancoPuro,
                      
                        }}
                      >
                        {getItemsCount()}
                      </Text>
                      </View>
                    )
                  ,
                tabBarVisible: false,
                tabBarStyle: { display: 'none' },
                headerLeft: () => (< BackButton onPress={goBack}/>)
              }} />
              <Tab.Screen name="Favoritos" component={Favorites} options={{
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={focused ? require('../../assets/System/heart-active.png') : require('../../assets/System/heart-inactive.png')}
                    style={{ width: 40, height: 40 }}
                  />
                ),
                tabBarLabel: ({ focused }) => 
                     (
                        <View style={{
                            width:12,
                            height:12,
                            top:30,
                            left:30,
                            backgroundColor: themeStyles.colors.vermelho,
                            borderRadius:50,
                          position:'absolute',

                 
                        }}>
                      <Text
                        style={{
                            textAlign:'center',
                            marginRight:1,
                            top:-1,
                            fontSize:10,
                          fontWeight:"500",
                          color: themeStyles.colors.brancoPuro,
                        }}
                      >
                        {getFavCount()}
                      </Text>
                      </View>
                    )
              }} />
              <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={focused ? require('../../assets/System/profile-active.png') : require('../../assets/System/profile-inactive.png')}
                    style={{ width: 40, height: 40 }}
                  />
                ),
                tabBarLabel: ({ focused }) => null
              }} />
              <Tab.Screen name="Product" component={Product} options={{
                tabBarButton: () => null,
                tabBarVisible: false,
                tabBarStyle: { display: 'none' },
                header: () => null,
                unmountOnBlur: true
  }} />
            </Tab.Navigator>

   
    </ToastProvider>
  );
}

export default Routes;
