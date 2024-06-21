import React, { useState } from 'react';
import { View, Text, StyleSheet,Image, Button,TouchableOpacity, TextInput } from 'react-native';
import { NftProps } from '../../type';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';


const NFTDetailList: React.FC<NftProps> = ({ nft, isLoading, id, isTransfer, isList, price, onPress }) => {
    const navigation = useNavigation();

    let approved = false;

    const [inputValue, setInputValue] = useState('')

    const handlePlaceBid = () => {
        console.log('Place Bid Now button pressed');
      };

      const handleFavorite = () => {
        console.log('Favorite button pressed');
      };
      const handleShare = () => {
        console.log('Share button pressed');
      };
      const handleAdd = () => {
        console.log('Add button pressed'); 
      };    

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <HeaderBackButton onPress={() => navigation.goBack()} />
        </View>
        <View style ={styles.content}>
            {/* <Text style={styles.title}>NFT Details</Text> */}
            {/* <Text>ID: {id}</Text>
            <Text>Price: {price}</Text> */}
            {/* <Image source={{ uri: nft.image ?? undefined }} style={styles.image}/> */}
            <Image source={require('../../assets/images/item.png')} style={styles.image}/>
            <Image source={require('../../assets/images/medal_gold.png')} style = {styles.overlayImage}/>

            <View style={styles.containerPrice}>
                <TextInput style={styles.text} 
                        numberOfLines={1}
                        placeholder='Price'
                        keyboardType="numeric"
                        value={inputValue}
                        onChangeText={setInputValue}
                        maxLength={10}/>             
                <Text style={styles.unitText}>FLP</Text>
            </View>

            <Text style={styles.title}>   The Unkown </Text>

        </View>

       {/* Group icons */}         
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={handleFavorite} style={styles.iconButton}>
          <Image source={require('../../assets/icons/favorite.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
          <Image source={require('../../assets/icons/share.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAdd} style={styles.iconButton}>
          <Image source={require('../../assets/icons/more.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

        {/* Button Place Bid Now */}
        <View >
        <TouchableOpacity style={styles.button} onPress={handlePlaceBid}>
          <Text style={styles.buttonText}>Sell Now</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  image: {
    width: 373,
    height: 453,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  footer:{
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#11C0CB', //cyan
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  overlayImage: {
    position: 'absolute',
    marginTop: 200,
    marginLeft: 175,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  iconRow: {
    position: 'absolute',
    marginTop: 415,
    marginLeft: 110,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconButton: {
    padding: 15,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  containerPrice: {
    backgroundColor: '#808080',  
    borderRadius: 30, 
    paddingVertical: 8,
    padding: 12,
    marginLeft: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'black', 
    textAlign: 'center',
    fontSize: 14,
    flex: 1,
  },
  unitText: {
    color: 'Black',
    fontSize: 14,
    marginLeft: 5,
  },

});

export default NFTDetailList;