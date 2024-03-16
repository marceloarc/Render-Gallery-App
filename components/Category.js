import React, {useContext,useEffect,} from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CartContext } from '../context/CartContext';
import { useToast } from "react-native-toast-notifications";

export function Category({id, name, image, onPress}) {


 
  return (
    
    <TouchableOpacity style={styles.card} onPress={onPress}>
      
      <Image
        style={styles.thumb}
        source={image}
      />
      <View style={styles.infoContainer}>
      <TouchableOpacity onPress={onPress} style={styles.name }>
      
      <Text style={styles.nameButton}> {name}</Text>
      </TouchableOpacity>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    
    height:500,
    width: '100%',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  thumb: {
    height: '100%',
    borderRadius: 16,
    width: '100%',
    resizeMode:"cover",

  },
  infoContainer: {
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
    padding: 16,
    color:'white',
    flexDirection:"row",
    position:'absolute',
    width:'100%',
    height:'100%',
    textAlign:'center',
    justifyContent: "center", 
    alignItems: "center", 
  },
  name: {
  backgroundColor:'transparent',
    width: '50%',

    padding:10,
    height:60,
    margin:10,
    textAlign:'center',
    borderWidth: 2,
    borderColor:'white'
  },
  buttonIcon: {
    backgroundColor:'black',
      width: '15%',
      borderRadius:100,
      padding:15,
      textAlign:'center',
      margin:10
    },
  nameButton: {
    fontSize: 22,
    fontWeight: 'bold',
    
    color:'white',
    textAlign:'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color:'white'
  },
});
