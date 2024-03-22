import React, {useEffect, useState} from 'react';
import {
  Text, 
  Image, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Button, 
  StyleSheet,
  TouchableOpacity,
  } from 'react-native';
import { getUsersById } from '../services/UsersService.js';
export function UserDetails({route}) {
  const { userId } = route.params;
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(getUsersById(userId));
  
  });
  
  return (
    <SafeAreaView style={styles.background}> 
      <ScrollView>
        <Image
          style={styles.image}
          source={user.pic}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.price}>{user.email}</Text>
          <Text style={styles.description}>{user.telefone}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background:{
    
    backgroundColor:'black',
    height:'100%'
  },
  card: {
    backgroundColor: 'black',
    
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
  image: {
    marginTop:50,
    height: 300,
    width: '100%'
  },
  infoContainer: {
    
    padding: 16,
  },
  infoContainer2: {
    width:'100%',
    textAlign:'center',
 
  },
  name: {
    color:'#3498DB',
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    color:'#3498DB',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    
    fontSize: 16,
    fontWeight: '400',
    color:'#3498DB',
    marginBottom: 16,
  },
  nameButton:{
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    color:'white',
    textAlign:'center',
  },
  buttonIcon:{
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    textAlign:'center',
    backgroundColor:'#3498DB',
    margin:10,
    height:40
}
});
