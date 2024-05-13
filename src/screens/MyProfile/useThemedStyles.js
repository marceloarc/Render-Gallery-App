import { StyleSheet } from 'react-native';
import { useTheme } from '../../../ThemeContext';

export const useThemedStyles = () => {
    const { themeStyles } = useTheme();

    const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: themeStyles.colors.background,
          paddingTop: 30,
      },
      scrollView: {
          width: '100%',
      },
      coverImage: {
          width: '100%',
          height: 200,
      },
      profileSection: {
          alignItems: 'center',
          marginTop: -50,
      },
      profileImage: {
          width: 100,
          height: 100,
          borderRadius: 50,
      },
      profileName: {
          fontSize: 25,
          fontWeight: 'bold',
          color: themeStyles.colors.textPrimary,
          marginTop: 10,
      },
      postsContainer: {
          marginTop: 10,
          paddingHorizontal: 20,
      },
      sectionTitle: {
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 10,
      },
      buttonIconBack:{
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor:themeStyles.colors.brancoPuro,
        alignItems: 'center',
        justifyContent: 'center',
        position:'absolute',
        top: 20,
        zIndex: 2,
        left: 20,
      },
      buttonIconPoint: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: themeStyles.colors.brancoPuro,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        position: 'absolute',
        right: 20,  // Ajustado para 10 para que fique próximo à borda
        top: 20     // Ajustado para 30 para melhor visualização
      },
      menuContainer: {
        marginTop: 0, // Ajuste conforme necessário para o posicionamento

        },
        menuItem: {
            padding: 10, // Espaço interno para cada item do menu
            backgroundColor: 'white', // Fundo do menu

        },
        menuText: {
            color: 'black', // Cor do texto do menu
            fontSize: 16, // Tamanho do texto
        },
      profileDesciption: {
        marginTop: 5,
        fontSize: 12,
        color: themeStyles.colors.textPrimary
      },
      containerExterno: {
        marginTop: 20,
        width: '100%',
        height: 70,
        backgroundColor: themeStyles.colors.backgroundBarraPerfil,
        flexDirection: 'row',
        flex: 1,
        borderRadius: 10,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10
    },
    containerInterno: {
        flex: 1,
        alignItems: 'center',         
    },
    textInterno1: {
        color: themeStyles.colors.textPrimaryBarraPerfil,
        fontSize: 13,
    },
    textInterno2: {
        color: themeStyles.colors.textSecondaryBarraPerfil,
        fontSize: 14,
        fontWeight: 'bold'
    },
    publiTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: themeStyles.colors.textPrimary,
        marginTop: 10,
        marginLeft: 10
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: themeStyles.colors.textPrimary,
        marginTop: 5,
        marginBottom: 10
    },
    line2: {
        width: '32.5%',
        height: 1,
        backgroundColor: themeStyles.colors.azulPrimary,
        marginLeft: 15,

    },
    space:{
        height: 70,
    },
    });

    return styles;
};
