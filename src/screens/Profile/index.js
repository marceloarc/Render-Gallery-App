import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemedStyles } from './useThemedStyles';


export default function Profile() {

    const navigation = useNavigation();
    const styles = useThemedStyles(); 
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
                    <Text style={styles.profileName}>John Doe</Text>
                    <Text style={styles.profileDesciption}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using</Text>

                    <View style={styles.containerExterno}>
                        <View style={styles.containerInterno}>
                            <Text style={styles.textInterno1}>Publicações</Text>
                            <Text style={styles.textInterno2}>30</Text>
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
                        <View style={styles.line2}>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

