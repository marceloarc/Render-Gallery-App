import { StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeContext';

export const useThemedStyles = () => {
    const { themeStyles } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 5,
            marginBottom: 5,
            
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
            color: themeStyles.colors.brancoPuro,
            fontSize: 20,
        },
        buttonIconFav: {
            width: 30,
            height: 30,
            borderRadius: 100,
            // backgroundColor: themeStyles.colors.brancoPuro,
            alignItems: 'center',
            justifyContent: 'center',
            // position: 'absolute',
            // top: 15,
            // right: 15,
        },
    });

    return styles;
};
