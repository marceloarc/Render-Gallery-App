import React, { useEffect, useState, useContext } from "react";
import { useToast } from "react-native-toast-notifications";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { getUsersById } from "../../services/UsersService";
import { useNavigation } from '@react-navigation/native';
import { FavContext } from '../../context/FavContext';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import { useThemedStyles } from "./userThemedStyles";


export function Post({ id, name, user, price, path, height, width }) {
    const styles = useThemedStyles(); 

    const toast = useToast();
    const { getFavItem, addItemToFav } = useContext(FavContext);
    const user2 = getUsersById(user);
    const [aspectRatio, setAspectRatio] = useState(1);
    let [icon, setIcon] = useState('heart-outline');
    const navigation = useNavigation();
    const [isReady, setIsReady] = useState(false); 

    useEffect(() => {
        if (!height || !width) {
            //console.log('URI da imagem:', path); 
            Image.getSize(
                path,
                (w, h) => {
                    setAspectRatio(w / h);
                    setTimeout(() => setIsReady(true), 0); 
                },
                (error) => {
                    console.error('Falha ao obter o tamanho da imagem:', error);
                    setAspectRatio(1); 
                }
            );
        }
    }, [path]);

    useEffect(() => {
        const favItem = getFavItem(id);
        setIcon(favItem ? 'heart' : 'heart-outline');
    }, [id, getFavItem]);

    function onAddToFav() {
        addItemToFav(id);
        if (!getFavItem(id)) {
            toast.show("Arte Favoritada com sucesso!", {
                type: "warning",
                placement: "bottom",
                duration: 2000,
                offset: 30,
                animationType: "fade",
                textStyle: { color: 'white' },
                backgroundColor: "#FF5722",
                icon: <Ionicons name="heart-outline" size={24} color="white" />,
            });
            setIcon('heart');
        } else {
            setIcon('heart-outline');
        }
    }

    if (!isReady) {
        return null; 
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Product', { ProductId: id })}>
            <Image source={{ uri: path }} style={[styles.image, { height: height, width: width, aspectRatio: height && width ? undefined : aspectRatio }]} />
            
            <TouchableOpacity onPress={onAddToFav} style={styles.buttonIconFav}>
                <Ionicons name={icon} style={styles.fav} />
            </TouchableOpacity>
            <View style={styles.footer}>
                <Text style={styles.title}>{name}</Text>
            </View>
            {/* <View style={styles.infoContainer}>
                <Text style={styles.user}><Ionicons name="person-outline" style={styles.person} /> {user2.name}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                    <View style={styles.ratingContainer}>
                        <MaterialIcons name="thumb-up" style={styles.like} /> */}
                        {/* <AntDesign name="like1" style={styles.like} />
                        <FontAwesomeIcon icon={faThumbsUp} style={styles.like} /> */}
                        {/* <Text style={styles.rating}>5</Text>
                    </View>
                </View>
            </View> */}
        </TouchableOpacity>
    );
}
