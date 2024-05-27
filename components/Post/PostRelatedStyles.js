import { StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeContext';

export const useThemedStyles = () => {
    const { themeStyles } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 5,
            marginBottom: 5,
            width:150,
            height:220
        },
        image: {
            borderRadius: 22,
            width:130,
            height:130
        },
        footer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 7,
        },
        infoContainer: {
            flexDirection: "column",
            justifyContent: "space-between",
        },
        priceContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        price: {
            color: themeStyles.colors.textPrimary,
            fontSize: 14,
            fontWeight: 'bold',
        },
        title: {
            color: themeStyles.colors.textPrimary,
            fontSize: 14,
            fontWeight: 'bold',
            left: 5,
        },
        user: {
            color: themeStyles.colors.textSecondary,
            fontSize: 11,
            marginTop: 1,
            marginBottom: 4,
        },
        person:{
            color: themeStyles.colors.textSecundary,
            fontSize: 11,
        },
        ratingContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        rating: {
            color: themeStyles.colors.textPrimary,
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 5,
        },
        like: {
            color: themeStyles.colors.textPrimary,
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 5,
        },
        fav: {
            color: themeStyles.colors.vermelho,
            fontSize: 20,
        },
        buttonIconFav: {
            width: 30,
            height: 30,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            right: 7,
        },
    });

    return styles;
};
