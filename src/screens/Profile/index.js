import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemedStyles } from './useThemedStyles';
// import { getProductsByUser } from '../../../services/ProductsService';
import { PostRelated } from '../../../components/Post/PostRelated';
import { useState } from 'react';
import { getUsersById } from '../../../services/UsersService';
import { API_BASE_URL } from '../../../env.js';

const urlApi = API_BASE_URL;

export default function Profile({route}) {
    let [count, setCount] = useState(0);
    const navigation = useNavigation();
    const styles = useThemedStyles(); 
    const { userId, name, path, publicacoes } = route.params;
    const qtdProducts = publicacoes.length;
    let user = getUsersById(userId);
    const pic = urlApi + "/";

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Image
                    source={{ uri: 'http://192.168.166.114:5000/images/2/6307a0f69ce861064cc219e7e3900ffd.jpeg' }}
                    style={styles.coverImage}
                />
                        <TouchableOpacity onPress={() => navigation.goBack()}  style={styles.buttonIconBack}>
                            <Ionicons  name="chevron-back" size={24} color="black" />
                        </TouchableOpacity>

                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: pic + path }}
                        style={styles.profileImage}
                    />
                </View>

                <View style={styles.postsContainer}>
                    <Text style={styles.profileName}>{user.name}</Text>

                    <View style={styles.containerExterno}>
                        <View style={styles.containerInterno}>
                            <Text style={styles.textInterno1}>Publicações</Text>
                            <Text style={styles.textInterno2}>{qtdProducts}</Text>
                        </View>
                        <View style={styles.containerInterno}>
                            <Text style={styles.textInterno1}>Likes</Text>
                            <Text style={styles.textInterno2}>50</Text>
                        </View>
                        <View style={styles.containerInterno}>
                            <Text style={styles.textInterno1}>Views</Text>
                            <Text style={styles.textInterno2}>100</Text>
                        </View>
                        <View style={styles.containerInterno}>
                            <Text style={styles.textInterno1}>Vendas</Text>
                            <Text style={styles.textInterno2}>11</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.postsContainer}>
                    <Text style={styles.publiTitle}>Publicações</Text>
                    <View style={styles.line}>
                        <View style={styles.line2}></View>
                    </View>
                    <ScrollView horizontal>
                        {publicacoes.map((relatedProduct, index) => (
                            <PostRelated
                                key={relatedProduct.id}
                                id={relatedProduct.id}
                                name={relatedProduct.name}
                                image={pic + relatedProduct.path}
                                price={relatedProduct.price}
                                user={relatedProduct.user}
                                style={styles.relatedItem}
                            />
                            ))}
                    </ScrollView>
                </View>
            </ScrollView>
            <View style={styles.space}></View>

        </View>
    );
}

