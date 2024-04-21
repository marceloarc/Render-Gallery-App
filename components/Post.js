import React, { useEffect, useState, useContext } from "react";
import { useToast } from "react-native-toast-notifications";
import { View, Image, Text, StyleSheet,TouchableOpacity, } from "react-native";
import { getUsersById } from "../services/UsersService";
import { useNavigation } from '@react-navigation/native';
import { FavContext } from '../context/FavContext';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../ThemeContext';
const { theme, toggleTheme, themeStyles } = useTheme();
export function Post({id, name, user, price, image, description}) {
    const toast = useToast();
    const { getFavItem } = useContext(FavContext);
    const { addItemToFav } = useContext(FavContext);
    let user2 = getUsersById(user);
    const [aspectRatio, setAspectRatio] = useState(1);
    let [icon, setIcon] = useState('heart-outline');
    const navigation = useNavigation();
    useEffect(() => {
        Image.getSize(image, (width, height) => {
            setAspectRatio(width / height);
        });
      
        updateIcon();
        navigation.addListener('focus', () => {
            // Atualiza o ícone quando a tela obtém o foco
            updateIcon();
          
        });

    }, [navigation, id, getFavItem]);

    const updateIcon = () => {
       
        const favItem = getFavItem(id);
        if (favItem) {
            setIcon('heart');
        } else {
            setIcon('heart-outline');
        }
        console.log(favItem);
    };
    function onAddToFav() {
        addItemToFav(id);
        if(!getFavItem(id)){
          toast.show("Arte Favoritada com sucesso!", {
            type: "success",
            placement: "bottom",
            duration: 3000,
            offset: 30,
            animationType: "fade",
            textStyle: { color: 'white' }, 
            backgroundColor: "#FF5722", 
            icon: <Ionicons name="heart-outline" size={24} color="white" />, 
          });
          setIcon('heart');
        }else{
          setIcon('heart-outline');
        }
      }
    return (
        
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Product', {
            ProductId: id,
          })}>
            <Image source={{ uri: image }} style={[styles.image, {aspectRatio}] } />
            <TouchableOpacity onPress={() => onAddToFav() }  style={styles.buttonIconFav}>
                <Ionicons name={icon} size={20} color="black" />
          </TouchableOpacity>
            <View style={styles.footer} >
                <Text style={styles.title} >{name}</Text>
            
            </View>

            <View>
                <Text style={styles.user}><Ionicons style={styles.user} name="person-outline" /> {user2.name}</Text>
                <Text style={styles.title}>{price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
            </View>
            
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
container: {
        flex: 1,
        padding: 5,
    },
        image: {
        borderRadius: 22,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 7,
    },
    price: {
  
        fontSize: 14,
    },
    title: {
 
        fontSize: 14,
    },
    user: {
        color:'#A4AAAD',
        fontSize: 12,
    },
    buttonIconFav:{
        width: 30,
        height: 30,
        borderRadius: 100,

        alignItems: 'center',
        justifyContent: 'center',
        position:'absolute',
        top: 15,
        right: 15,
      },
});


