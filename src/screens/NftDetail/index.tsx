import React, { useState } from 'react';
import { View, Text, StyleSheet,Image, Button,TouchableOpacity } from 'react-native';
import { NftProps } from '../../type';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';


const NFTDetail: React.FC<NftProps> = ({ nft, isLoading, id, isTransfer, isList, price, onPress }) => {
    const navigation = useNavigation();

    const [textWidth, setTextWidth] = useState(0);
    const handleTextLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setTextWidth(width); //Get the width of the text and update it to the state 
      };

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
            <Text style={styles.title}>   The Unkown </Text>
            <View style={[styles.containerPrice, {width: textWidth + 50}]}>
                <Text style={styles.text} 
                        onLayout={handleTextLayout} 
                        numberOfLines={1}
                        ellipsizeMode="tail">
                            2.50000 FLP
                </Text>
            </View>
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
        <View style = {styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handlePlaceBid}>
          <Text style={styles.buttonText}>Buy Now</Text>
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
    marginBottom: 16,
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
    backgroundColor: '#612FB1',  //light purple
    borderRadius: 30, 
    paddingVertical: 8,
    padding: 12,
    marginTop: 16,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white', 
    textAlign: 'center',
    fontSize: 14,
  },

});

export default NFTDetail;