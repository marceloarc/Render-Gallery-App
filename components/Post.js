import React, { useEffect, useState } from "react";

import { View, Image, Text, StyleSheet,TouchableOpacity, } from "react-native";
import { Feather } from '@expo/vector-icons';
import { getUsersById } from "../services/UsersService";
import { useNavigation } from '@react-navigation/native';
export function Post({id, name, user, price, image, description}) {
    let user2 = getUsersById(user);
    const [aspectRatio, setAspectRatio] = useState(1);
    const navigation = useNavigation();
    useEffect(() => {
        Image.getSize(image, (width, height) => {
            setAspectRatio(width / height);
        });
    }, []);

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Product', {
            ProductId: id,
          })}>
            <Image source={{ uri: image }} style={[styles.image, {aspectRatio}] } />

            <View style={styles.footer} >
                <Text style={styles.title} >{name}</Text>
                <Feather name="heart" size={24} color="white" />
            </View>

            <View>
                <Text style={styles.title}>{user2.name}</Text>
                <Text style={styles.title}>${price}</Text>
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
        color: 'white',
        fontSize: 14,
    },
    title: {
        color: 'white',
        fontSize: 14,
    },
});


