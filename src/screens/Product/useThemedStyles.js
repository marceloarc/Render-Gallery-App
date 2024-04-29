import { StyleSheet } from 'react-native';
import { useTheme } from '../../../ThemeContext';

export const useThemedStyles = () => {
    const { themeStyles } = useTheme();

    const styles = StyleSheet.create({
        background:{ 
            backgroundColor:themeStyles.colors.background,
            height:'100%',
            width:'100%',
            justifyContent: 'center',
            alignItems: 'center',
          },
          image: {
            marginTop:20,
            width: '95%', 
            borderRadius: 24,
            height: 400,
          },
          scrollDesc: {

            maxHeight : 150, // Define a altura fixa do ScrollView
          },
          fundo:{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 40,
          },
          infoContainer: {
            
            padding: 16,
          },
          infoContainer2: {
            width:'100%',
            textAlign:'center',
            alignItems: 'center',
          },
          nameContainer:{
            width:'100%',
            marginTop: 0,
            flexDirection: 'row',
            backgroundColor:themeStyles.colors.background,
            alignItems: 'center',
          },
          containerTitle:{
            flexDirection: 'row',
            justifyContent: 'left',
            alignItems: 'left',
            width: "60%",
        
          },
          containerIconPlus:{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: "40%",
          },
          name: {
            color:themeStyles.colors.textPrimary,
            fontSize: 24,
            fontWeight: 'bold',
          },
          quantidade:{
            color:themeStyles.colors.textPrimary,
            fontSize: 16,
            fontWeight: 'bold',
            margin: 15,
          },
          description: {
            
            fontSize: 16,
            fontWeight: '300',
            color:themeStyles.colors.textPrimary,
            marginBottom: 5,
          },
          user: {   
            fontSize: 14,
            fontWeight: '400',
            color:themeStyles.colors.textSecondary,
            marginBottom: 10,
          },
          nameButton:{
            fontSize: 16,
            alignItems: 'center',
            justifyContent: 'center',
            color:themeStyles.colors.brancoPuro,
            textAlign:'center',
            fontWeight: 'bold',
          },
          buttonIcon:{
            alignItems: 'center',
            justifyContent: 'center',
            width:327,
            textAlign:'center',
            backgroundColor:themeStyles.colors.button,
            margin:10,
            height:60,
            borderRadius: 40,
            flexDirection: 'row',
            position:'absolute',
            bottom: 5,
          },
          buttonIconFav:{
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor:themeStyles.colors.brancoPuro,
            alignItems: 'center',
            justifyContent: 'center',
            position:'absolute',
            top: 35,
            right: 20,
          },
          buttonIconBack:{
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor:themeStyles.colors.brancoPuro,
            alignItems: 'center',
            justifyContent: 'center',
            position:'absolute',
            top: 75,
            zIndex: 2,
            left: 20,
          },
          buttonIconPlus:{
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor:themeStyles.colors.background,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: themeStyles.colors.textPrimary,
          },
          IconPlus:{
           color:themeStyles.colors.textPrimary
          },
          line:{
            width:'100%',
            height:1,
            backgroundColor:'#ededed',
            marginTop: 20,
          },
          space:{
            height: 70,
          },
          tilte2:{
            color:themeStyles.colors.textPrimary,
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 20,
            marginBottom: 20,
          },
          centered: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          },
          relatedItem: {
            width: '48%', // Subtrai um pouco para contar o espaçamento
            marginVertical: 4,
            marginHorizontal: '1%', // Espaço entre os itens
          },
          infoArt: {
            flexDirection: 'row',
            flex: 1,
          },
          
          infoArt2: {
            flex: 1, // Faz com que cada infoArt2 ocupe igualmente o espaço disponível
            marginTop: 15,
            alignItems: 'center',
            alignContent: 'center',
            textAlign: 'center',
            justifyContent: 'center'
          },

          infoArt3: {
            flex: 1, // Faz com que cada infoArt2 ocupe igualmente o espaço disponível
            marginTop: 5,
            alignItems: 'center',
            alignContent: 'center',
            textAlign: 'center',
            justifyContent: 'center'
          },
          
          titleInfo: {
            color:themeStyles.colors.textPrimary,
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',

          },
          conteudoInfo: {
            color: themeStyles.colors.textPrimary,
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            marginTop: 8
          },
          like: {
            color: themeStyles.colors.textPrimary,
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 8
          },
          rating: {
            color: themeStyles.colors.textPrimary,
            fontSize: 16,
            marginLeft: 5,
            marginTop: 8
          },
          ratingContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
         },
         category: {
          backgroundColor: themeStyles.colors.backgroundCategorySelected,
          color: themeStyles.colors.textCategorySelected,
          borderColor: themeStyles.colors.textCategory,
          borderRadius: 8,
          marginTop: 3,
          padding: 5,
          marginRight: 10,
          borderWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          alignContent:  'center',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
      },
      CSelected: {
        textAlign: 'center',
        color: themeStyles.colors.textCategorySelected
      }
    });

    return styles;
};
