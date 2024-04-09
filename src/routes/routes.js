import React from 'react';

import { Image, View, TouchableOpacity } from 'react-native';

import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
            headerTintColor: '#fff',
            headerStatusBarHeight: 60,
            headerStyle: {
                backgroundColor: '#000',
                borderWidth: 0,
                
                elevation: 0,
                shadowOpacity: 0,
            },

            tabBarShowLabel: false,
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
        }}
      >
        <Tab.Screen name="Home" component={Home} options={{
            headerTitle: () => (
                <Image source={require('../../assets/logo.png')} style={{ width: 120, height: 40 }} />
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
                    source={focused ? require('../../assets/home-active.png') : require('../../assets/home-inactive.png')}
                    style={{ width: 24, height: 24 }}
                />
            )
        }} />
        <Tab.Screen name="Cart" component={Cart} options={{
            tabBarIcon: ({ focused }) => (
                <Image
                    source={focused ? require('../../assets/cart-active.png') : require('../../assets/cart-inactive.png')}
                    style={{ width: 24, height: 24 }}
                />            )
        }}/>
        <Tab.Screen name="Favorites" component={Favorites} options={{
            tabBarIcon: ({ focused }) => (
                <Image
                    source={focused ? require('../../assets/heart-active.png') : require('../../assets/heart-inactive.png')}
                    style={{ width: 24, height: 24 }}
                />            )
        }}/>
        <Tab.Screen name="Profile" component={Profile} options={{
            tabBarIcon: ({ focused }) => (
                <Image
                    source={focused ? require('../../assets/profile-active.png') : require('../../assets/profile-inactive.png')}
                    style={{ width: 24, height: 24 }}
                />            )
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Routes;