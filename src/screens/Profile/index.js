import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemedStyles } from './useThemedStyles';
import { getProductsByUser } from '../../../services/ProductsService';
import { PostRelated } from '../../../components/Post/PostRelated';
import { useState } from 'react';
import { getUsersById } from '../../../services/UsersService';

export default function Profile({route}) {
    let [count, setCount] = useState(0);
    const navigation = useNavigation();
    const styles = useThemedStyles(); 
    const userId = route.params.userId;
    const qtdProducts = getProductsByUser(userId).length;
    let user = getUsersById(userId);
    console.log(userId)
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Image
                    source={{ uri: 'https://r2.easyimg.io/5u66q75r7/sukuna.jpg' }}
                    style={styles.coverImage}
                />
                        <TouchableOpacity onPress={() => navigation.goBack()}  style={styles.buttonIconBack}>
                            <Ionicons  name="chevron-back" size={24} color="black" />
                        </TouchableOpacity>

                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: 'http://192.168.0.13:5000/images/2/fb70e7cbd7b766a9e00a7b1299adf1ad.jpg' }}
                        style={styles.profileImage}
                    />
                </View>

                <View style={styles.postsContainer}>
                    <Text style={styles.profileName}>{user.name}</Text>
                    <Text style={styles.profileDesciption}>{user.desc}</Text>

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
                        {getProductsByUser(userId)
                            .slice(0, 9) 
                            .map((relatedProduct, index) => (
                            <PostRelated key={relatedProduct.id} id={relatedProduct.id} name={relatedProduct.name} image={relatedProduct.image} price={relatedProduct.price} user={relatedProduct.user} style={styles.relatedItem} />
                            
                            ))}
                        </ScrollView>
                </View>
            </ScrollView>
            <View style={styles.space}></View>

        </View>
    );
}

