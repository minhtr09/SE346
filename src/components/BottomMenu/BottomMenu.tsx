import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { styles } from './styles';

const BottomMenu = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const handleSwapPress = () => {
    navigation.navigate('Swap');
  }
  const handleStorePress = () => {
    navigation.navigate('Store');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleStorePress}>
        <Image source={require('../../assets/icons/store.png')}  style = {styles.icon}></Image>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSwapPress}>
        <Image source={require('../../assets/icons/swap.png')}  style = {styles.icon}></Image>
      </TouchableOpacity>
    </View>
  );
};

export default BottomMenu;