import React, { useEffect, useState, useContext } from 'react';
import {
  Text, Image, View, ScrollView, SafeAreaView,
  TouchableOpacity, StyleSheet, ActivityIndicator
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import { getProduct, getProductsByUser, getProductsByCategory, getProducts } from "../../../services/ProductsService";
import { CartContext } from '../../../context/CartContext';
import { FavContext } from '../../../context/FavContext';
import { ConfirmDialog, ProgressDialog, Dialog } from 'react-native-simple-dialogs';
import { getUsersById } from "../../../services/UsersService";
import { PostRelated } from '../../../components/Post/PostRelated.js';
import { useTheme } from '../../../ThemeContext';
import { useThemedStyles } from "./useThemedStyles";
import { getCategory } from '../../../services/CategoryService';
import { AuthContext } from '../../../context/AuthContext';
import { API_BASE_URL } from '../../../env.js';
import * as Progress from 'react-native-progress';

const urlApi = API_BASE_URL + "/";

const CustomProgressDialog = ({ dialogVisibleError, setDialogVisibleError }) => {
  const [progress, setProgress] = useState(0);
  const styles = useThemedStyles();
  const { themeStyles } = useTheme();

  useEffect(() => {
    if (dialogVisibleError) {
      setProgress(0);
      let progressInterval = setInterval(() => {
        setProgress((prev) => prev + 0.01);
      }, 30);

      let timeout = setTimeout(() => {
        clearInterval(progressInterval);
        setDialogVisibleError(false);
      }, 3000);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(timeout);
      };
    }
  }, [dialogVisibleError]);

  return (
    <Dialog
      visible={dialogVisibleError}
      onTouchOutside={() => setDialogVisibleError(false)}
      style={styles.dialogContainer}
      dialogStyle={styles.dialogStyle}
      titleStyle={{ color: themeStyles.colors.textPrimary, fontWeight: "bold", fontSize: 20, textAlign: "center" }}
      title={
        <View style={styles.titleContainer}>
          <Ionicons name="alert-circle-outline" size={24} color={themeStyles.colors.vermelho} style={styles.icon} />
          <Text style={styles.titleText}>Erro</Text>
        </View>
      }
    >
      <View style={styles.progressContainer}>
        <Text style={{ color: themeStyles.colors.textPrimary, textAlign: "center", marginBottom: 20 }}>
        Produto fora de estoque!
        </Text>
        <Progress.Bar progress={progress} width={200} color={themeStyles.colors.textPrimary} borderRadius={2} />
      </View>
    </Dialog>
  );
};

export default function Product({ route }) {
  const { themeStyles } = useTheme();
  const { Id, Name, Price, Path, CategoriaId, UserId, quantity, returnScreen } = route.params;
  const [user2, setUser] = useState({});
  const [product, setProduct] = useState({});
  const { user } = useContext(AuthContext);
  const isCurrentUser = user.id === UserId;
  const [isLoading, setIsLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogVisibleError, setDialogVisibleError] = useState(false);
  const [dialogVisibleSuccess, setDialogVisibleSuccess] = useState(false);
  const toast = useToast();
  const { addItemToCart } = useContext(CartContext);
  const { addItemToFav, getFavItem } = useContext(FavContext);
  const navigation = useNavigation();
  const [quantity2, setQuantity] = useState(1);
  const [icon, setIcon] = useState('heart-outline');
  const styles = useThemedStyles(); 
  const categoria = getCategory(CategoriaId);
  const categoriaName = categoria.name;
  const categoriaId = getCategory(CategoriaId).id;
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUsersById(UserId);
        setUser(userData);
        const isFavorite = getFavItem(Id);
        setIcon(isFavorite ? 'heart' : 'heart-outline');
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    setQuantity(1); 
    setIsLoading(true); 
    fetchData();
  }, [UserId]);

  const navigateToProfile = () => {
    if (isCurrentUser) {
      navigation.navigate('MyProfile');
    } else {
      navigation.navigate('Profile', {
        userId: user2.id,
        name: user2.name,
        path: user2.path,
        dataCriacao: user2.dataCriacao,
        publicacoes: user2.publicacoes,
        publicacaoId: Id,
        publicacaoName: Name,
        publicacaoPrice: Price,
        publicacaoPath: Path,
        publicacaoCategoriaId: CategoriaId,
        publicacaoUserId: UserId,
        publicacaoQuantity: quantity,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (categoriaId) {
          const relatedProducts = await getProducts(categoriaId);
          if (Array.isArray(relatedProducts)) {
            setRelatedProducts(relatedProducts.slice(0, 9));
          } else {
            console.error("A função getProducts não retornou um array de produtos.");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar os produtos relacionados:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    setQuantity(1); 
    setIsLoading(true); 
    fetchData();
  }, [categoriaId]);
  

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={themeStyles.colors.background} />
      </View>
    );
  }

  function onAddToCart() {
    if (quantity < 1) {
      toast.show("Produto fora de estoque!", {
        type: "warning",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "fade",
        textStyle: { color: 'white' },
        backgroundColor: "#FF5722",
      });
    } else {
      addItemToCart(Id, quantity2);
      setDialogVisibleSuccess(true);
      setTimeout(() => {
        setDialogVisibleSuccess(false);
      }, 3000);
    }
    setDialogVisible(false);
  }  
    
  function onAddToFav() {
    addItemToFav(Id);
    if(!getFavItem(Id)){
      setIcon('heart');
    } else {
      setIcon('heart-outline');
    }
  }

  function Back() {
    if(route.params?.returnScreen == 'MyProfile'){
      navigation.navigate('MyProfile');
    } else {
        navigation.goBack();
    }
  }

  const decreaseQuantity = () => {
    if (quantity2 > 1) {
      setQuantity(quantity2 - 1);
    }
  }
  const IncreaseQuantity = () => {
    if (quantity2 < quantity) {
      setQuantity(quantity2 + 1);
    }
  }

  return (
    <SafeAreaView style={styles.background}> 
        <TouchableOpacity onPress={() => Back()}  style={styles.buttonIconBack}>
            <Ionicons  name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      <ScrollView nestedScrollEnabled = {true}>
        <View style={styles.fundo}>
          <Image
            style={[styles.image]} 
            source={{ uri: Path }}
          />
          {isCurrentUser ? null : (
            <>
            <TouchableOpacity onPress={() => onAddToFav() }  style={styles.buttonIconFav}>
                  <Ionicons name={icon} size={24} color="#F13658" />
            </TouchableOpacity>
            </>
          )}
        </View>
        
        <View style={styles.infoContainer}>
            <View style={styles.nameContainer} >
              <View style={styles.containerTitle}>
                <Text style={styles.name}>{Name}</Text>
              </View>
              <View style={styles.containerIconPlus}>
                <TouchableOpacity onPress={() => {decreaseQuantity()} }  style={styles.buttonIconPlus}>
                  <Ionicons style={styles.IconPlus} name="remove-outline" size={24}  />
                </TouchableOpacity>
                <Text style={styles.quantidade}>{quantity2}</Text>
                <TouchableOpacity onPress={() => {IncreaseQuantity()} }  style={styles.buttonIconPlus}>
                      <Ionicons style={styles.IconPlus}  name="add-outline" size={24} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.infoArt}>
              <View style={styles.infoArt2}>
                <Text style={styles.titleInfo}>Artista</Text>
              </View>
              <View style={styles.infoArt2}>
                <Text style={styles.titleInfo}>Likes</Text>
              </View>
              <View style={styles.infoArt2}>
                <Text style={styles.titleInfo}>Categorias</Text>
              </View>
            </View>

            <View style={styles.infoArt}>
              <View style={styles.infoArt3}>
              <TouchableOpacity onPress={navigateToProfile}>
                    <Text style={styles.conteudoInfo}>{user2.name}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.infoArt3}>
                <View style={styles.ratingContainer}>
                        <MaterialIcons name="thumb-up" style={styles.like} />
                        {/* <AntDesign name="like1" style={styles.like} />
                        <FontAwesomeIcon icon={faThumbsUp} style={styles.like} /> */}
                        <Text style={styles.rating}>5</Text>
                  </View>
              </View>
              <View style={styles.infoArt3}>
                <View style={styles.category}>
                  <Text style={styles.CSelected}>{categoriaName}</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoContainer2}>
              <ConfirmDialog
                title="Adicionar ao carrinho"
                message={`Tem certeza que deseja adicionar ${quantity2} ${Name}(s) ao carrinho?`}
                visible={dialogVisible}
                onTouchOutside={() => setDialogVisible(false)}
                positiveButton={{
                  title: "Sim",
                  onPress: () => onAddToCart(),
                  titleStyle: { color: 'green', fontWeight: 'bold' }, // Exemplo de estilo para o texto do botão
                  style: { backgroundColor: '#e6ffe6', borderRadius: 5, width: '50%', alignItems: 'center' } // Exemplo de estilo para o botão
                }}
                negativeButton={{
                  title: "Não",
                  onPress: () => setDialogVisible(false),
                  titleStyle: { color: 'red' }, // Alinha o texto no centro do botão
                  style: { backgroundColor: '#ffcccc', borderRadius: 5, width: '50%', alignItems: 'center' } // Exemplo de estilo para o botão
                }}
                dialogStyle={styles.dialogContainer}
                titleStyle={styles.dialogTitle}
                messageStyle={styles.dialogMessage}
                buttonStyle={styles.dialogButton}

                />

              <CustomProgressDialog
                dialogVisibleError={dialogVisibleError}
                setDialogVisibleError={setDialogVisibleError}
              />
                
            </View>
            <View style={styles.line}></View>
            <Text style={styles.tilte2}>Artes Relacionadas</Text>
            <ScrollView horizontal>
              {relatedProducts.map((relatedProduct, index) => (
                <PostRelated
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  name={relatedProduct.name}
                  path={relatedProduct.path}
                  price={relatedProduct.price}
                  userId={relatedProduct.userId}
                  categoriaId={relatedProduct.categoriaId}
                  style={styles.relatedItem}
                />
              ))}
            </ScrollView>
            <View style={styles.space}></View>
        </View>

      </ScrollView>

        {isCurrentUser ? null : (
          <>
            <TouchableOpacity onPress={() => {quantity < 1 ? setDialogVisibleError(true) : setDialogVisible(true)}} style={styles.buttonIcon}>
              <Ionicons name={quantity > 0 ? 'cart-outline' : ''} size={24} color="white" />
              <Text style={styles.nameButton}>
                {quantity < 1 ? 'Fora de Estoque' : `Adicionar ao carrinho | ${Price ? Price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Preço não disponível'}`}  
              </Text>
            </TouchableOpacity>
          </>
        )}

        {dialogVisibleSuccess && (
          <View style={[styles.dialogContainerSuccess, { position: 'absolute', top: 35, left: 10, width: '95%', zIndex: 999, borderRadius: 50 }]}>
            <View style={[styles.dialogStyle, { marginTop: 20, alignSelf: 'flex-start' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Ionicons name="checkmark-circle-outline" size={24} color='green' style={styles.icon} />
                <Text style={[styles.titleText, { fontWeight: 'bold', fontSize: 20, textAlign: 'center' }]}>Sucesso</Text>
              </View>
              <Text style={{ color: themeStyles.colors.textPrimary, textAlign: 'center', marginTop: 10 }}>
                Produto adicionado ao carrinho com sucesso!
              </Text>
            </View>
          </View>
        )}


    </SafeAreaView>
  );
}


