import { StyleSheet } from 'react-native';
import { useTheme } from '../../../ThemeContext';

export const useThemedStyles = () => {
    const { themeStyles } = useTheme();

    const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: themeStyles.colors.background,
          paddingTop: 100,
          alignContent: 'center',
          alignItems: 'center',
      },
      title: {
            fontSize: 40,
            fontWeight: 'bold',
            color: themeStyles.colors.textPrimary,
            textAlign: 'center',
            marginBottom: 10,
        },
      input: {
          height: 40,
          margin: 12,
          borderRadius: 10,
          padding: 10,
          backgroundColor: themeStyles.colors.backgroundBarraPerfil,
          color: themeStyles.colors.textPrimary,
          width:'90%',
          height: 67,
          paddingLeft: 20,
          shadowColor: '#000', 
          shadowOffset: { width: 0, height: 10 }, 
          shadowOpacity: 0.1, 
          shadowRadius: 3, 
          elevation: 10, 
      },
      buttonSubmit: {
          backgroundColor: themeStyles.colors.button,
          color: themeStyles.colors.brancoPuro,
          borderRadius: 25,
          padding: 10,
          margin: 12,
          height: 50,
          justifyContent: 'center',
          width: '90%',
          marginTop: 25,
      },
      textButton: {
          color: themeStyles.colors.brancoPuro,
          textAlign: 'center',
          fontSize: 17,
          fontStyle: 'italic',
      },
      textButton2: {
        color: themeStyles.colors.textPrimary,
        textAlign: 'center',
        fontSize: 15,
        fontStyle: 'italic',
        marginTop: 5,
    },
    image: {
      width: 130,
      height: 130,
      borderRadius: 65, 
      backgroundColor: '#eee',
      marginBottom: 15,
    },
    dialogContainerSuccess: {
        backgroundColor: "transparent",
        padding: 20,
        borderRadius: 10,
      },
      dialogStyle: {
        backgroundColor: themeStyles.colors.dialogLogin,
        padding: 20,
        borderRadius: 10,
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
      },
      titleText: {
        color: themeStyles.colors.textPrimary, 
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginRight: 8,
      },
      icon: {
        marginRight: 8,
      },
    });

    return styles;
};
