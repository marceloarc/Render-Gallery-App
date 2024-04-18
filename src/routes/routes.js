import React,{useContext} from 'react';
import { Image, TouchableOpacity,Text,View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer,useNavigation, } from '@react-navigation/native';
import { CartContext} from '../../context/CartContext';
import { FavContext} from '../../context/FavContext';
import { ToastProvider } from 'react-native-toast-notifications';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';
import Product from '../screens/Product';
const Tab = createBottomTabNavigator();
const BackButton = ({onPress})=> <TouchableOpacity onPress={onPress} style={{alignItems:"center",flexDirection:"row",justifyContent:"center"}}>
<Ionicons name="chevron-back" size={24} color="white" />

 </TouchableOpacity>
function Routes() {
    const {getItemsCount} = useContext(CartContext);
    const {getFavCount} = useContext(FavContext);
    const {goBack} = useNavigation()
  return (
    <ToastProvider>

            
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerTintColor: '#fff',
                headerStatusBarHeight: 60,
                headerStyle: {
                  backgroundColor: '#000',
                  borderWidth: 0,
                  elevation: 0,
                  shadowOpacity: 0,
                },
                tabBarVisible: route.name !== 'Product',
                
                tabBarShowLabel: true,
                tabBarStyle: {
                  position: 'absolute',
                  backgroundColor: '#141414',
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
                headerRight: () => (
                  <TouchableOpacity onPress={() => console.log('Perfil clicado')}>
                    <Image
                      source={require('../../assets/users/perfil.png')}
                      style={{ width: 40, height: 40, borderRadius: 20, marginRight: 15 }}
                    />
                  </TouchableOpacity>
                ),
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
                            backgroundColor:'red',
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
                          color:"white",
                      
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
                            backgroundColor:'red',
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
                          color:"white",
                      
                        }}
                      >
                        {getFavCount()}
                      </Text>
                      </View>
                    ),
                    tabBarVisible: false,
                    tabBarStyle: { display: 'none' },
                    headerLeft: () => (< BackButton onPress={goBack}/>)
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
                headerTitle: () => null,
                tabBarButton: () => null,
                tabBarVisible: false,
                tabBarStyle: { display: 'none' },
                headerLeft: () => (< BackButton onPress={goBack}/>)
  }} />
            </Tab.Navigator>

   
    </ToastProvider>
  );
}

export default Routes;
